let nextTaskId = 3;
let tasks = [
  { id: 1, title: "Explore Express routes", completed: true },
  { id: 2, title: "Build a REST endpoint", completed: false },
];

const findTask = (id) => tasks.find((task) => task.id === Number(id));
const requireTitle = (title, res) => {
  if (!title?.trim()) {
    res.status(400).json({ success: false, message: "Title is required" });
    return false;
  }
  return true;
};

export const getTasks = (req, res) => res.status(200).json({ success: true, data: tasks });

export const getTask = (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  return res.status(200).json({ success: true, data: task });
};

export const createTask = (req, res) => {
  if (!requireTitle(req.body.title, res)) return;
  const task = { id: nextTaskId++, title: req.body.title.trim(), completed: Boolean(req.body.completed) };
  tasks.push(task);
  return res.status(201).json({ success: true, data: task });
};

export const updateTask = (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  if (!requireTitle(req.body.title, res)) return;
  task.title = req.body.title.trim();
  task.completed = Boolean(req.body.completed);
  return res.status(200).json({ success: true, data: task });
};

export const patchTask = (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  if (req.body.title !== undefined && !requireTitle(req.body.title, res)) return;
  if (req.body.title !== undefined) task.title = req.body.title.trim();
  if (req.body.completed !== undefined) task.completed = Boolean(req.body.completed);
  return res.status(200).json({ success: true, data: task });
};

export const deleteTask = (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
  return res.status(204).send();
};