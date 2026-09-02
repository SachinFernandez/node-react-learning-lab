import { useState } from "react";
import { PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];
const exampleCode = `console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");`;

const explanationSteps = [
  'console.log("1") runs synchronously.',
  "setTimeout schedules a timer callback.",
  "Promise.then schedules a microtask.",
  'console.log("4") runs synchronously.',
  "Synchronous execution finishes.",
  "The Promise microtask runs.",
  "The timer callback runs.",
];

const executionSteps = [
  { area: "Call Stack", action: 'console.log("1")', output: "1" },
  { area: "Timer Scheduled", action: "setTimeout callback registered" },
  { area: "Microtask Scheduled", action: "Promise.then callback queued" },
  { area: "Call Stack", action: 'console.log("4")', output: "4" },
  { area: "Call Stack Empty", action: "Synchronous execution complete" },
  { area: "Microtask Queue", action: "Promise callback executes", output: "3" },
  { area: "Timer Queue", action: "setTimeout callback executes", output: "2" },
];

function LearnTab() {
  return <Stack spacing={2}><SectionCard title="Synchronous code"><Typography color="text.secondary">JavaScript starts by executing synchronous code on the call stack, in order. For <Box component="code">console.log("A"); console.log("B");</Box>, the output is A followed by B.</Typography></SectionCard><SectionCard title="Asynchronous work"><Typography color="text.secondary">Some operations are scheduled and complete later, including timers, network operations, file operations, and Promise callbacks. They do not all use the same internal mechanisms.</Typography></SectionCard><SectionCard title="Event Loop"><Typography color="text.secondary">The Event Loop coordinates when queued callbacks can be placed into execution. A callback can run only after current synchronous work has finished and the call stack is available.</Typography></SectionCard><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Microtasks"><Typography color="text.secondary">Promise <Box component="code">.then()</Box> callbacks are queued as microtasks. After current synchronous code completes, queued microtasks are processed before timer callbacks.</Typography></SectionCard></Grid><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Timer callbacks"><Typography color="text.secondary"><Box component="code">setTimeout(..., 0)</Box> does not run immediately. Its callback becomes eligible after the minimum delay and still waits for the Event Loop to schedule it.</Typography></SectionCard></Grid></Grid></Stack>;
}

function CodeTab() {
  return <Stack spacing={2}><SectionCard title="Scheduling work" subtitle="This example combines synchronous logs, a timer callback, and a Promise microtask."><CodeBlock filename="event-loop-example.js">{exampleCode}</CodeBlock></SectionCard><Grid container spacing={2}><Grid size={{ xs: 12, md: 7 }}><SectionCard title="Why this order?"><Box component="ol" sx={{ my: 0, pl: 2.5, color: "text.secondary" }}>{explanationSteps.map((step) => <li key={step}>{step}</li>)}</Box></SectionCard></Grid><Grid size={{ xs: 12, md: 5 }}><SectionCard title="Expected output"><Box component="pre" sx={{ m: 0, p: 1.75, borderRadius: 2, color: "#e2e8f0", backgroundColor: "#0f172a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{`1
4
3
2`}</Box></SectionCard></Grid></Grid></Stack>;
}

function TryItTab({ steps, running, onRun, onReset }) {
  const hasRun = steps.length > 0;
  const output = steps.filter((step) => step.output).map((step) => step.output).join("\n");

  return <SectionCard title="Conceptual Event Loop Visualization" subtitle="Run the example to see how synchronous code, microtasks, and timers execute." action={<Stack direction="row" spacing={1}><Button variant="outlined" startIcon={<RestartAltRounded />} onClick={onReset} disabled={!hasRun || running}>Reset</Button><Button variant="contained" startIcon={<PlayArrowRounded />} onClick={onRun} disabled={running}>{running ? "Running..." : "Run Example"}</Button></Stack>}>{hasRun ? <Stack spacing={1.25}>{steps.map((step, index) => <Box key={`${step.area}-${index}`} sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 26, height: 26, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Box><Typography variant="caption" color="primary.main" fontWeight={700}>{step.area}</Typography><Typography variant="body2">{step.action}</Typography>{step.output && <Typography variant="body2" color="success.main" fontWeight={700}>Output: {step.output}</Typography>}</Box></Stack></Box>)}{!running && steps.length === executionSteps.length && <Box sx={{ p: 1.75, border: "1px solid #bbf7d0", borderRadius: 2, backgroundColor: "#f0fdf4" }}><Typography variant="caption" color="success.main" fontWeight={700}>FINAL OUTPUT</Typography><Box component="pre" sx={{ m: "0.5rem 0 0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 700 }}>{output}</Box></Box>}</Stack> : <Typography color="text.secondary">No execution has run yet. This is a conceptual visualization, not an inspection of the live Node.js Event Loop.</Typography>}</SectionCard>;
}

function FlowTab() {
  const mainSteps = [["JavaScript Source", "The example starts with ordinary JavaScript"], ["Call Stack", "Synchronous code runs first"], ["Synchronous Code", 'console.log("1") and console.log("4") produce output']];
  return <Stack spacing={2}><SectionCard title="How work is coordinated"><Stack spacing={0}>{mainSteps.map(([title, description], index) => <FlowStep key={title} number={index + 1} title={title} description={description} connector />)}<Grid container spacing={1.5} sx={{ py: 1.5 }}><Grid size={{ xs: 12, sm: 6 }}><Box sx={{ p: 2, border: "1px solid #ddd6fe", borderRadius: 2, backgroundColor: "#f5f3ff" }}><Typography variant="h3" color="primary.main">Promise.then</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Moves conceptually to the Microtask Queue.</Typography></Box></Grid><Grid size={{ xs: 12, sm: 6 }}><Box sx={{ p: 2, border: "1px solid #fde68a", borderRadius: 2, backgroundColor: "#fffbeb" }}><Typography variant="h3" color="warning.main">setTimeout</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Moves conceptually to the Timer Queue.</Typography></Box></Grid></Grid><FlowStep number={4} title="Call Stack Empty" description="The Event Loop can coordinate queued work." connector /><FlowStep number={5} title="Microtasks" description="Queued Promise callbacks are processed before timer callbacks." connector /><FlowStep number={6} title="Timer Callbacks" description="Eligible timer callbacks can then be scheduled." connector={false} /></Stack></SectionCard></Stack>;
}

function FlowStep({ number, title, description, connector }) {
  return <Box><Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 32, height: 32, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{number}</Box><Box sx={{ py: 1.25 }}><Typography variant="h3">{title}</Typography><Typography variant="body2" color="text.secondary">{description}</Typography></Box></Stack>{connector && <Box sx={{ height: 18, ml: "15px", borderLeft: "1px solid #cbd5e1" }} />}</Box>;
}

function EventLoop() {
  const [tab, setTab] = useState(0);
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);

  const runExample = async () => {
    if (running) return;
    setRunning(true);
    setSteps([]);

    for (const step of executionSteps) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setSteps((currentSteps) => [...currentSteps, step]);
    }

    setRunning(false);
  };

  const content = [<LearnTab key="learn" />, <CodeTab key="code" />, <TryItTab key="try" steps={steps} running={running} onRun={runExample} onReset={() => setSteps([])} />, <FlowTab key="flow" />];

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 03" title="Node.js Event Loop" subtitle="Understand how Node.js coordinates synchronous code, microtasks, and asynchronous callbacks." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Node.js Event Loop lesson content" variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export default EventLoop;