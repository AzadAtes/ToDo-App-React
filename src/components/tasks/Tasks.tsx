import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getTasks, deleteTask, patchTask } from "../../fetchTasks";
import TaskList from "./TaskList";
import TaskAdd from "./TaskAdd";

const Tasks = ({ title }: { title: string }): JSX.Element => {
  const { taskIdParam } = useParams();
  const [selectedTask, setSelectedTask] = useState<TaskType>({} as TaskType);
  const [taskName, setTaskName] = useState<string>(selectedTask.task);

  useEffect(() => {
    // not a good solution
    queryClient.invalidateQueries(["tasks"]);
  }, []);

  useEffect(() => {
    setTaskName(selectedTask.task);
  }, [selectedTask]);

  const taskIsSelected = Object.keys(selectedTask).length;

  const { data, isLoading, isError, error } = useQuery<{ tasks: TaskType[] }>(
    ["tasks"],
    getTasks,
    {
      onSuccess: (data) => {
        if (taskIdParam && !taskIsSelected) {
          const task = data.tasks.find((task) => task._id === taskIdParam);
          if (task) {
            setSelectedTask(task);
          }
        }
      },
    }
  );

  const queryClient = useQueryClient();

  const patchTaskMutation = useMutation({
    mutationFn: patchTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const updateTask = (task: TaskType, newTaskName: string) => {
    task.task = newTaskName;
    patchTaskMutation.mutate(task);
  };

  if (isLoading || data == undefined) return <p className="p-10">Loading...</p>;
  if (isError) return <p className="p-10">{`An error occurred.\n${error}`}</p>;

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 p-10">
        <h1 className="pb-8">{title}</h1>
        <TaskAdd />
        <TaskList tasks={data.tasks} setSelectedTask={setSelectedTask} />
      </div>
      {taskIdParam && taskIsSelected && (
        <div className="w-96 border-x border-gray-400 p-10 transition-all duration-1000 ease-in-out">
          <p>({selectedTask._id})</p>
          <textarea
            className="text-black"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onBlur={() => updateTask(selectedTask, taskName)}
          />
          <Link
            to={`/tasks`}
            className="border"
            onClick={() => {
              setSelectedTask({} as TaskType);
              deleteTaskMutation.mutate(selectedTask);
            }}
          >
            Delete
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tasks;
