import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../fetchTasks";
import TaskList from "../tasks/TaskList";
import Tasks from "../tasks/Tasks";

const TasksView = () => {
  const {
    data,
    isLoading,
  }: { data: { tasks: TaskType[] } | undefined; isLoading: boolean } = useQuery(
    ["tasks"],
    getTasks,
    {}
  );

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (data === undefined) return <p className="p-10">Loading...</p>;

  return (
    <div>
      <Tasks title={"tasks"} />
    </div>
  );
};

export default TasksView;
