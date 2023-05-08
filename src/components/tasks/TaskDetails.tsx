import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TaskDetailsProps {
  selectedTask: TaskType;
  patchTask: (task: TaskType, taskName: string) => void;
  deleteTask: (task: TaskType) => void;
}

const TaskDetails: FC<TaskDetailsProps> = (props) => {
  const [taskName, setTaskName] = useState<string>(props.selectedTask.task);

  useEffect(() => {
    setTaskName(props.selectedTask.task);
  }, [props.selectedTask]);

  return (
    <div className="w-96 border-x border-gray-400 p-10 transition-all duration-1000 ease-in-out">
      <p>({props.selectedTask._id})</p>
      <textarea
        className="text-black"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={() => props.patchTask(props.selectedTask, taskName)}
      />
      <Link
        to={`/tasks`}
        className="border"
        onClick={() => {
          props.deleteTask(props.selectedTask);
        }}
      >
        Delete
      </Link>
      <div className="flex flex-col">
        {props.selectedTask.important && <p>Important</p>}
        {props.selectedTask.myDay && <p>My Day</p>}
        {props.selectedTask.planned && <p>Planned</p>}
      </div>
    </div>
  );
};

export default TaskDetails;
