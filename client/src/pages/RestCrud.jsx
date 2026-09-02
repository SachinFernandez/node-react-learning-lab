import { useEffect, useState } from "react";
import { DeleteOutlineRounded, RefreshRounded } from "@mui/icons-material";
import { Box, Button, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { createTask, deleteTask, getTasks, patchTask, updateTask } from "../api/taskApi.js";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ExpressFlow, ExpressLesson } from "../components/common/ExpressLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function RestCrud() {
  const learn = <Stack spacing={2}><SectionCard title="REST operations"><Typography color="text.secondary">GET reads resources, POST creates, PUT replaces a complete resource, PATCH updates selected fields, and DELETE removes. Common responses are 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, and 500 Server Error.</Typography><Box component="pre" sx={{ mt: 2, mb: 0, p: 1.5, borderRadius: 2, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>{"GET    /api/tasks\nGET    /api/tasks/:id\nPOST   /api/tasks\nPUT    /api/tasks/:id\nPATCH  /api/tasks/:id\nDELETE /api/tasks/:id"}</Box></SectionCard><SectionCard title="Temporary in-memory demo data"><Typography color="text.secondary">This lesson’s task API stores <Box component="code">id</Box>, <Box component="code">title</Box>, and <Box component="code">completed</Box> in memory only. Data resets when the server restarts and is not persistent storage.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="A CRUD route"><CodeBlock filename="taskRoutes.js">{"router.get(\"/\", getTasks);\nrouter.post(\"/\", createTask);\nrouter.patch(\"/:id\", patchTask);\nrouter.delete(\"/:id\", deleteTask);"}</CodeBlock></SectionCard>;
  return <ExpressLesson lesson="17" title="REST CRUD" subtitle="Learn REST resource operations through a temporary in-memory task API." learn={learn} code={code} tryIt={<TaskPlayground />} flow={<ExpressFlow title="REST request flow" steps={["React", "taskApi", "Axios", "Express Router", "Controller", "In-memory data", "JSON", "React"]} />} />;
}

function TaskPlayground() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState("GET /api/tasks");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const run = async (label, action) => {
    setActivity(label);
    setError(null);
    try { const result = await action(); setResponse(result); } catch (requestError) { setError(requestError.response?.data?.message ?? "Unable to complete the request"); }
  };
  const load = () => run("GET /api/tasks", async () => { const result = await getTasks(); setTasks(result.data); return result; });
  useEffect(() => { load(); }, []);
  const add = () => run("POST /api/tasks", async () => { const result = await createTask({ title, completed: false }); setTitle(""); await load(); return result; });
  const toggle = (task) => run(`PATCH /api/tasks/${task.id}`, async () => { const result = await patchTask(task.id, { completed: !task.completed }); await load(); return result; });
  const saveTitle = (task) => run(`PUT /api/tasks/${task.id}`, async () => { const result = await updateTask(task.id, { ...task, title: editingTask.title }); setEditingTask(null); await load(); return result; });
  const remove = (task) => run(`DELETE /api/tasks/${task.id}`, async () => { const status = await deleteTask(task.id); await load(); return { status }; });
  return <SectionCard title="REST Playground" subtitle="A small client for the temporary in-memory task API."><Stack direction={{ xs: "column", sm: "row" }} spacing={1}><TextField size="small" label="Task title" value={title} onChange={(event) => setTitle(event.target.value)} fullWidth /><Button variant="contained" onClick={add}>Create task</Button><Button variant="outlined" startIcon={<RefreshRounded />} onClick={load}>List tasks</Button></Stack><Stack spacing={0.75} sx={{ mt: 2 }}>{tasks.map((task) => <Stack key={task.id} direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" sx={{ p: 1, border: "1px solid #e2e8f0", borderRadius: 2 }}><Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}><Checkbox checked={task.completed} onChange={() => toggle(task)} inputProps={{ "aria-label": `Toggle ${task.title}` }} />{editingTask?.id === task.id ? <TextField size="small" value={editingTask.title} onChange={(event) => setEditingTask({ ...editingTask, title: event.target.value })} /> : <Typography sx={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</Typography>}</Stack><Stack direction="row" spacing={0.5}><Button size="small" onClick={() => editingTask?.id === task.id ? saveTitle(task) : setEditingTask(task)}>{editingTask?.id === task.id ? "Save" : "Edit"}</Button><Button aria-label={`Delete ${task.title}`} color="error" size="small" onClick={() => remove(task)}><DeleteOutlineRounded /></Button></Stack></Stack>)}</Stack><Box sx={{ mt: 2, p: 1.5, borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="caption" color="text.secondary" fontWeight={700}>HTTP ACTIVITY</Typography><Typography variant="body2">{activity}</Typography>{response && <Typography component="pre" variant="caption" sx={{ whiteSpace: "pre-wrap", mb: 0 }}>{JSON.stringify(response, null, 2)}</Typography>}{error && <Typography variant="body2" color="error.main">{error}</Typography>}</Box></SectionCard>;
}

export default RestCrud;