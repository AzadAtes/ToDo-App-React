const tasksRoute = "https://todo-app-backend-service.onrender.com/api/v1/tasks";

const getTasks = async () => {
  const apiRes = await fetch(tasksRoute);

  if (!apiRes.ok) {
    throw new Error(`/tasks fetch not ok`);
  }
  return apiRes.json();
};

const getTask = async ({ queryKey }: { queryKey: unknown[] }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`${tasksRoute}/${id}`);

  if (!apiRes.ok) {
    throw new Error(`GET:/tasks/${id}\nfetch not ok`);
  }
  return apiRes.json();
};

const postTask = async (task: TaskType) => {
  const apiRes = await fetch(`${tasksRoute}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!apiRes.ok) {
    throw new Error(`POST:${task.task}\nfetch not ok`);
  }
  return apiRes.json;
};

const patchTask = async (task: TaskType) => {
  const apiRes = await fetch(`${tasksRoute}/${task._id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!apiRes.ok) {
    throw new Error(`PATCH:${task.task}\nfetch not ok`);
  }
  return apiRes.json;
};

const deleteTask = async (task: TaskType) => {
  const apiRes = await fetch(`${tasksRoute}/${task._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!apiRes.ok) {
    throw new Error(`DELETE:${task.task}\nfetch not ok`);
  }
  return apiRes.json;
};

export { getTasks, getTask, postTask, patchTask, deleteTask };
