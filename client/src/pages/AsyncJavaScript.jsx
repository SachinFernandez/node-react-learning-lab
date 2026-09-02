import { useState } from "react";
import { PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];
const callbackCode = `function getData(callback) {
  setTimeout(() => callback("Data loaded"), 1000);
}

getData((result) => {
  console.log(result);
});`;
const promiseCode = `function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
}

getData().then(console.log);`;
const asyncAwaitCode = `async function loadData() {
  const result = await getData();
  console.log(result);
}

loadData();`;
const rejectionCode = `try {
  const result = await getData();
  console.log(result);
} catch (error) {
  console.error("Unable to load data");
}`;
const executionModels = {
  callback: { label: "Callback", steps: ["getData() starts", "Async operation is scheduled", "Other JavaScript can continue", "Operation completes", "Callback is invoked with the result", "Result displayed: Data loaded"] },
  promise: { label: "Promise", steps: ["getData() returns a pending Promise", "Async operation is scheduled", "Other JavaScript can continue", "Promise becomes fulfilled", ".then() receives the result", "Result displayed: Data loaded"] },
  asyncAwait: { label: "Async/Await", steps: ["loadData() starts", "getData() returns a Promise", "await pauses continuation of that async function", "Other JavaScript can continue", "Promise resolves", "async function continues", "Result displayed: Data loaded"] },
};

function LearnTab() {
  return <Stack spacing={2}><SectionCard title="Why asynchronous programming?"><Typography color="text.secondary">Some operations take time, such as network requests, timers, and file work. Asynchronous programming lets JavaScript schedule that work and continue with other available tasks instead of synchronously waiting for every operation.</Typography></SectionCard><SectionCard title="Callbacks"><Typography color="text.secondary">A callback is a function passed to another function so it can be called later when asynchronous work completes. Nested callbacks can become hard to read and maintain, often called callback hell.</Typography></SectionCard><SectionCard title="Promises"><Typography color="text.secondary">A Promise represents a future result. It can be <strong>pending</strong>, <strong>fulfilled</strong> with a value, or <strong>rejected</strong> with an error. Use <Box component="code">.then()</Box> for fulfilled values and <Box component="code">.catch()</Box> for rejected values.</Typography></SectionCard><SectionCard title="async and await"><Typography color="text.secondary">An <Box component="code">async</Box> function can use <Box component="code">await</Box> with a Promise. Await suspends continuation of that async function while other JavaScript can proceed. async/await is syntax built on Promises; it does not make asynchronous work synchronous.</Typography><Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 2, flexWrap: "wrap" }}><ProgressionLabel label="Callback" /><Typography color="primary.main">↓</Typography><ProgressionLabel label="Promise" /><Typography color="primary.main">↓</Typography><ProgressionLabel label="Async/Await" /></Stack></SectionCard><SectionCard title="Handling async errors"><Typography color="text.secondary">With async/await, use <Box component="code">try/catch</Box> to handle a rejected Promise. This keeps successful and failure paths close together.</Typography></SectionCard></Stack>;
}

function ProgressionLabel({ label }) {
  return <Box sx={{ p: 1.25, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="body2" fontWeight={700}>{label}</Typography></Box>;
}

function CodeTab() {
  return <Stack spacing={2}><ExampleCard title="Callback" code={callbackCode} filename="callback-example.js" /><ExampleCard title="Promise" code={promiseCode} filename="promise-example.js" /><ExampleCard title="Async/Await" code={asyncAwaitCode} filename="async-await-example.js" /><SectionCard title="Promise rejection with try/catch"><CodeBlock filename="error-handling.js">{rejectionCode}</CodeBlock><Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>A rejected Promise transfers control to the <Box component="code">catch</Box> block when awaited inside <Box component="code">try/catch</Box>.</Typography></SectionCard></Stack>;
}

function ExampleCard({ title, code, filename }) {
  return <SectionCard title={title}><CodeBlock filename={filename}>{code}</CodeBlock></SectionCard>;
}

function TryItTab({ selected, steps, running, onSelect, onRun, onReset }) {
  const hasRun = steps.length > 0;
  return <Stack spacing={2}><SectionCard title="Async Execution Explorer" subtitle="Choose an asynchronous style, then run its conceptual execution sequence."><ToggleButtonGroup exclusive value={selected} onChange={(event, next) => next && !running && onSelect(next)} aria-label="Asynchronous JavaScript style" sx={{ flexWrap: "wrap" }}><ToggleButton value="callback">Callback</ToggleButton><ToggleButton value="promise">Promise</ToggleButton><ToggleButton value="asyncAwait">Async/Await</ToggleButton></ToggleButtonGroup><Stack direction="row" spacing={1} sx={{ mt: 2 }}><Button variant="contained" startIcon={<PlayArrowRounded />} onClick={onRun} disabled={running}>{running ? "Running..." : "Run Example"}</Button><Button variant="outlined" startIcon={<RestartAltRounded />} onClick={onReset} disabled={!hasRun || running}>Reset</Button></Stack><Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ display: "block", mt: 2 }}>CONCEPTUAL EXECUTION VISUALIZATION</Typography>{hasRun ? <Stack spacing={1.25} sx={{ mt: 1 }}>{steps.map((step, index) => <Stack key={step} direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 27, height: 27, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", color: "primary.main", backgroundColor: "primary.light", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2">{step}</Typography></Stack>)}</Stack> : <Typography color="text.secondary" sx={{ mt: 1 }}>No example has run yet. This illustrates control flow and does not execute user-provided code.</Typography>}</SectionCard></Stack>;
}

function FlowTab() {
  return <Stack spacing={2}><Grid container spacing={2}><Grid size={{ xs: 12, md: 4 }}><SectionCard title="Callback"><FlowList items={["Async Operation", "Callback", "Result"]} /></SectionCard></Grid><Grid size={{ xs: 12, md: 4 }}><SectionCard title="Promise"><FlowList items={["Async Operation", "Promise", "Resolve / Reject", "then / catch"]} /></SectionCard></Grid><Grid size={{ xs: 12, md: 4 }}><SectionCard title="Async/Await"><FlowList items={["async function", "await Promise", "fulfilled / rejected", "continue / catch"]} /></SectionCard></Grid></Grid><SectionCard title="The relationship"><Stack alignItems="center" spacing={0.5}><ProgressionLabel label="async/await" /><Typography color="primary.main">↓</Typography><Typography variant="body2" color="text.secondary">uses</Typography><Typography color="primary.main">↓</Typography><ProgressionLabel label="Promises" /></Stack></SectionCard></Stack>;
}

function FlowList({ items }) {
  return <Stack spacing={0}>{items.map((item, index) => <Box key={item}><Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 26, height: 26, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2" fontWeight={600}>{item}</Typography></Stack>{index < items.length - 1 && <Box sx={{ height: 14, ml: "12px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack>;
}

function AsyncJavaScript() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState("callback");
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const runExample = async () => {
    if (running) return;
    setRunning(true);
    setSteps([]);
    for (const step of executionModels[selected].steps) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSteps((currentSteps) => [...currentSteps, step]);
    }
    setRunning(false);
  };
  const selectModel = (model) => {
    setSelected(model);
    setSteps([]);
  };
  const content = [<LearnTab key="learn" />, <CodeTab key="code" />, <TryItTab key="try" selected={selected} steps={steps} running={running} onSelect={selectModel} onRun={runExample} onReset={() => setSteps([])} />, <FlowTab key="flow" />];
  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 06" title="Async JavaScript" subtitle="Learn how callbacks, Promises, and async/await handle asynchronous operations." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Async JavaScript lesson content" variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export default AsyncJavaScript;