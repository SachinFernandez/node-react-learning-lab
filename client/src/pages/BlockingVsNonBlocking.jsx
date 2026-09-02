import { useState } from "react";
import { PauseCircleOutlineRounded, PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];
const blockingCode = `console.log("Start");

const start = Date.now();

while (Date.now() - start < 3000) {
  // Simulate CPU-heavy blocking work
}

console.log("Finished");`;
const nonBlockingCode = `console.log("Start");

setTimeout(() => {
  console.log("Async operation finished");
}, 3000);

console.log("Continue working");`;
const blockingSteps = ["Task starts", "Main thread becomes busy", "Other JavaScript work must wait", "Blocking task finishes", "Waiting work can continue"];
const nonBlockingSteps = ["Task starts", "Async operation is scheduled", "Main thread continues", "Other work executes", "Async callback becomes ready", "Callback executes later"];

function LearnTab() {
  return <Stack spacing={2}><SectionCard title="What is blocking?"><Typography color="text.secondary">Blocking code prevents the main JavaScript thread from continuing until the current operation finishes. A long synchronous loop, synchronous file read, or heavy CPU calculation can make other work wait.</Typography><Stack spacing={0} sx={{ mt: 2 }}><FlowLabel label="Request A starts" connector /><FlowLabel label="Long blocking work" connector /><FlowLabel label="Request B waits" connector /><FlowLabel label="Request C waits" /></Stack><Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>For a server, one slow operation can delay unrelated work, which is usually undesirable.</Typography></SectionCard><SectionCard title="What is non-blocking?"><Typography color="text.secondary">Non-blocking operations let Node.js begin work and continue handling other tasks while the operation completes through runtime, operating-system, or other mechanisms. Network requests, asynchronous file operations, and timers are common examples.</Typography></SectionCard><SectionCard title="Node.js and I/O"><Typography color="text.secondary">Node.js works well for many I/O-heavy applications such as APIs, database calls, network services, and real-time communication. While waiting for I/O, the main JavaScript thread can continue processing other available work.</Typography></SectionCard><SectionCard title="CPU-heavy work"><Typography color="text.secondary">Asynchronous APIs do not make CPU-heavy JavaScript code non-blocking. A very large synchronous loop still occupies the main JavaScript thread. Worker Threads can help in appropriate cases and will be covered later.</Typography></SectionCard></Stack>;
}

function FlowLabel({ label, connector = false }) {
  return <Box><Box sx={{ p: 1.25, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="body2" fontWeight={700}>{label}</Typography></Box>{connector && <Box sx={{ height: 14, ml: "15px", borderLeft: "1px solid #cbd5e1" }} />}</Box>;
}

function CodeTab() {
  return <Stack spacing={2}><SectionCard title="Blocking synchronous work" subtitle="During the loop, the JavaScript main thread cannot process other JavaScript work."><CodeBlock filename="blocking-example.js">{blockingCode}</CodeBlock></SectionCard><SectionCard title="Non-blocking scheduling" subtitle="The main thread is not synchronously waiting inside timer callback scheduling."><CodeBlock filename="non-blocking-example.js">{nonBlockingCode}</CodeBlock><Box component="pre" sx={{ mt: 2, mb: 0, p: 1.75, borderRadius: 2, color: "#e2e8f0", backgroundColor: "#0f172a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{`Start
Continue working
Async operation finished`}</Box></SectionCard></Stack>;
}

function DemoCard({ title, description, steps, type, activeSteps, running, onRun }) {
  const isBlocking = type === "blocking";
  const complete = activeSteps.length === steps.length;
  return <SectionCard title={title} subtitle={description} action={<Button size="small" variant={isBlocking ? "outlined" : "contained"} startIcon={isBlocking ? <PauseCircleOutlineRounded /> : <PlayArrowRounded />} onClick={onRun} disabled={running}>{running ? "Running..." : isBlocking ? "Run Blocking Example" : "Run Non-Blocking Example"}</Button>}><Typography variant="caption" color="text.secondary" fontWeight={700}>CONCEPTUAL SIMULATION</Typography>{activeSteps.length > 0 ? <Stack spacing={1} sx={{ mt: 1.5 }}>{activeSteps.map((step, index) => <Stack key={step} direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 25, height: 25, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: isBlocking ? "#fef3c7" : "#dcfce7", color: isBlocking ? "#92400e" : "#166534", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2">{step}</Typography></Stack>)}</Stack> : <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Run the simulation to see the conceptual execution sequence.</Typography>}{complete && !running && !isBlocking && <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}><Typography variant="caption" color="success.main" fontWeight={700}>CONCEPTUAL OUTPUT</Typography><Typography component="pre" sx={{ m: "0.4rem 0 0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.8125rem" }}>{`Start
Continue working
Async operation finished`}</Typography></Box>}</SectionCard>;
}

function TryItTab({ blockingState, nonBlockingState, blockingRunning, nonBlockingRunning, onRunBlocking, onRunNonBlocking, onReset }) {
  const hasRun = blockingState.length > 0 || nonBlockingState.length > 0;
  return <Stack spacing={2}><Stack direction="row" justifyContent="flex-end"><Button variant="outlined" startIcon={<RestartAltRounded />} onClick={onReset} disabled={!hasRun || blockingRunning || nonBlockingRunning}>Reset</Button></Stack><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><DemoCard title="Blocking Example" description="Simulate synchronous work that occupies the JavaScript thread." steps={blockingSteps} type="blocking" activeSteps={blockingState} running={blockingRunning} onRun={onRunBlocking} /></Grid><Grid size={{ xs: 12, md: 6 }}><DemoCard title="Non-Blocking Example" description="Simulate asynchronous work that allows other tasks to continue." steps={nonBlockingSteps} type="non-blocking" activeSteps={nonBlockingState} running={nonBlockingRunning} onRun={onRunNonBlocking} /></Grid></Grid>{hasRun && <SectionCard title="Comparison"><Grid container spacing={1.5}><Grid size={{ xs: 12, sm: 6 }}><Box sx={{ p: 1.75, borderRadius: 2, border: "1px solid #fde68a", backgroundColor: "#fffbeb" }}><Typography variant="h3">Blocking</Typography><Typography variant="body2" sx={{ mt: 0.75 }}>Main thread: <strong>Busy</strong></Typography><Typography variant="body2">Other work: <strong>Waiting</strong></Typography><StatusBadge label="Thread occupied" status="warning" /></Box></Grid><Grid size={{ xs: 12, sm: 6 }}><Box sx={{ p: 1.75, borderRadius: 2, border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4" }}><Typography variant="h3">Non-Blocking</Typography><Typography variant="body2" sx={{ mt: 0.75 }}>Main thread: <strong>Available for other work</strong></Typography><Typography variant="body2">Other work: <strong>Can continue</strong></Typography><StatusBadge label="Work can continue" status="success" /></Box></Grid></Grid></SectionCard>}</Stack>;
}

function FlowTab() {
  const blocking = ["Request", "JavaScript Main Thread", "Blocking Operation", "Main Thread Busy", "Other Work Waits", "Operation Completes", "Next Work Continues"];
  const nonBlocking = ["Request", "JavaScript Main Thread", "Async Operation Scheduled", "Runtime / External Resource", "Main Thread Processes Other Work", "Operation Ready", "Callback Queue", "Event Loop Coordination", "Callback Executes"];
  return <Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Blocking flow"><FlowList items={blocking} tone="warning" /></SectionCard></Grid><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Non-blocking flow"><FlowList items={nonBlocking} tone="success" /><Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>The Event Loop explanation remains high-level here: it coordinates when queued callbacks can run after the stack is available.</Typography></SectionCard></Grid></Grid>;
}

function FlowList({ items, tone }) {
  const palette = tone === "warning" ? { background: "#fef3c7", color: "#92400e" } : { background: "#dcfce7", color: "#166534" };
  return <Stack spacing={0}>{items.map((item, index) => <Box key={item}><Stack direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 28, height: 28, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: palette.background, color: palette.color, fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2" fontWeight={600}>{item}</Typography></Stack>{index < items.length - 1 && <Box sx={{ height: 14, ml: "13px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack>;
}

function BlockingVsNonBlocking() {
  const [tab, setTab] = useState(0);
  const [blockingState, setBlockingState] = useState([]);
  const [nonBlockingState, setNonBlockingState] = useState([]);
  const [blockingRunning, setBlockingRunning] = useState(false);
  const [nonBlockingRunning, setNonBlockingRunning] = useState(false);

  const runSimulation = async (steps, setSteps, setRunning) => {
    setRunning(true);
    setSteps([]);
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSteps((currentSteps) => [...currentSteps, step]);
    }
    setRunning(false);
  };

  const content = [<LearnTab key="learn" />, <CodeTab key="code" />, <TryItTab key="try" blockingState={blockingState} nonBlockingState={nonBlockingState} blockingRunning={blockingRunning} nonBlockingRunning={nonBlockingRunning} onRunBlocking={() => !blockingRunning && runSimulation(blockingSteps, setBlockingState, setBlockingRunning)} onRunNonBlocking={() => !nonBlockingRunning && runSimulation(nonBlockingSteps, setNonBlockingState, setNonBlockingRunning)} onReset={() => { setBlockingState([]); setNonBlockingState([]); }} />, <FlowTab key="flow" />];

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 04" title="Blocking vs Non-Blocking" subtitle="Understand how synchronous work can block the main thread and how asynchronous operations allow Node.js to stay responsive." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Blocking versus non-blocking lesson content" variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export default BlockingVsNonBlocking;