import { useState, FC } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getTasksFetch,
  deleteTaskFetch,
  patchTaskFetch,
} from "../../fetchTasks";
import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import TaskAdd from "./TaskAdd";

interface TasksProps {
  title: string;
}

const Tasks: FC<TasksProps> = (props) => {
  const { taskIdParam } = useParams();
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState<TaskType>({} as TaskType);
  const taskIsSelected = !!Object.keys(selectedTask).length;

  const { data, isLoading, isError, error } = useQuery<{ tasks: TaskType[] }>(
    ["tasks"],
    getTasksFetch
  );

  const patchTaskMutation = useMutation({
    mutationFn: patchTaskFetch,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskFetch,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const patchTask = (task: TaskType, newTaskName: string) => {
    task.task = newTaskName;
    patchTaskMutation.mutate(task);
  };

  const deleteTask = (task: TaskType) => {
    setSelectedTask({} as TaskType);
    deleteTaskMutation.mutate(task);
  };

  if (isLoading) {
    return <p className="p-10">Loading...</p>;
  }
  if (isError) {
    return <p className="p-10">{`An error occurred: ${error}`}</p>;
  }

  if (taskIdParam && !taskIsSelected) {
    const task = data.tasks.find((task) => task._id === taskIdParam);
    if (task) {
      setSelectedTask(task);
    }
  }

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 p-10">
        <h1 className="pb-8">{props.title}</h1>
        <TaskAdd />
        <TaskList tasks={data.tasks} setSelectedTask={setSelectedTask} />
      </div>
      {taskIdParam && taskIsSelected && (
        <TaskDetails
          selectedTask={selectedTask}
          patchTask={patchTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
};

export default Tasks;
