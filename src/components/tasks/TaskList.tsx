import { FC, Key } from "react";
import { Link } from "react-router-dom";

interface TaskListProps {
  tasks: TaskType[];
  setSelectedTask: (value: React.SetStateAction<TaskType>) => void;
}

const TaskList: FC<TaskListProps> = (props) => {
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
