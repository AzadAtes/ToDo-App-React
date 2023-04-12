import { Key } from "react";
import { Link } from "react-router-dom";

const TaskList = (props: {
  tasks: TaskType[];
  setSelectedTask: (value: React.SetStateAction<TaskType>) => void;
}) => {
  return (
    <div>
      {props.tasks.map((task: TaskType) => {
        return (
          <div key={task._id as Key}>
            <Link
              to={`/tasks/${task._id}`}
              onClick={() => {
                props.setSelectedTask(task);
              }}
            >
              {task.task}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
