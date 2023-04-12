import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KeyboardEvent, useState } from "react";
import { postTaskFetch } from "../../fetchTasks";

const AddTask = () => {
  const queryClient = useQueryClient();
  const [newTaskName, setNewTaskName] = useState("");

  const postTaskMutation = useMutation({
    mutationFn: postTaskFetch,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const postTask = () => {
    postTaskMutation.mutate({
      task: newTaskName,
      important: true,
      myDay: true,
    });
    setNewTaskName("");
  };

  const submitTask = (e: KeyboardEvent) => {
    e.preventDefault;
    if (e.code == "Enter") {
      if (!newTaskName.replace(/\s+/g, "").length) {
        return;
      }
      postTask();
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
          postTask();
        }}
      >
        add
      </button>
    </div>
  );
};

export default AddTask;
