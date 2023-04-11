import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KeyboardEvent, useState } from "react";
import { postTask } from "../../fetchTasks";

const AddTask = () => {
  const queryClient = useQueryClient();
  const [newTaskName, setNewTaskName] = useState("");

  const postTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const submitTask = (e: KeyboardEvent) => {
    if (e.code == "Enter") {
      if (!newTaskName.replace(/\s+/g, "").length) {
        return;
      }
      postTaskMutation.mutate({ task: newTaskName });
      setNewTaskName("");
    }
  };

  return (
    <div className="text-black">
      <input
        className="outline-none"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyDown={(e) => submitTask(e)}
      ></input>
      <button
        className="w-12 border border-slate-600 bg-slate-300"
        onClick={() => {
          postTaskMutation.mutate({ task: newTaskName });
          setNewTaskName("");
        }}
      >
        add
      </button>
    </div>
  );
};

export default AddTask;
