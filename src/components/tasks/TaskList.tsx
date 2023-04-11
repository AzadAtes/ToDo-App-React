import { Key } from "react";
import { Link } from "react-router-dom";

const TaskList = ({
  tasks,
  setSelectedTask,
}: {
  tasks: TaskType[];
  setSelectedTask: (value: React.SetStateAction<TaskType>) => void;
}) => {
  return (
    <div>
      {tasks.map((task: TaskType) => {
        return (
          <div key={task._id as Key}>
            <Link
              to={`/tasks/${task._id}`}
              onClick={() => {
                setSelectedTask(task);
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
