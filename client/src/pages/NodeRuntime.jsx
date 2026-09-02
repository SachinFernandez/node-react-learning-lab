import { useState } from "react";
import { PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];
const callStackCode = `function greet(name) {
  return createMessage(name);
}

function createMessage(name) {
  return \`Hello, \${name}\`;
}

const message = greet("Node.js");

console.log(message);`;

const executionSteps = [
  "Global execution starts",
  'greet("Node.js") called',
  'createMessage("Node.js") called',
  'createMessage returns "Hello, Node.js"',
  "greet returns result",
  "console.log outputs the result",
];

const codeSteps = [
  "Global script starts.",
  "greet() enters the call stack.",
  "createMessage() enters the stack.",
  "createMessage() returns.",
  "greet() returns.",
  "console.log() executes.",
];

function LearnTab() {
  return <Stack spacing={2}><SectionCard title="JavaScript needs a runtime"><Typography color="text.secondary">JavaScript is a language, not the runtime itself. It needs an engine to execute code. Chrome and Node.js use the V8 engine, while other browsers may use different engines.</Typography></SectionCard><SectionCard title="V8"><Typography color="text.secondary">V8 is the JavaScript engine used by Node.js. Its job is to execute JavaScript code and enable machine execution.</Typography><Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 2, flexWrap: "wrap" }}><ArchitectureLabel label="JavaScript Code" /><Typography color="primary.main">↓</Typography><ArchitectureLabel label="V8 Engine" /><Typography color="primary.main">↓</Typography><ArchitectureLabel label="Machine Execution" /></Stack></SectionCard><SectionCard title="Node.js is more than V8"><Typography color="text.secondary">V8 alone does not provide file system access, networking, HTTP servers, timers, or operating-system access. Node.js combines V8 with runtime APIs and supporting infrastructure.</Typography><Grid container spacing={1.25} sx={{ mt: 1 }}><Grid size={{ xs: 6, sm: 3 }}><ArchitectureLabel label="V8" /></Grid><Grid size={{ xs: 6, sm: 3 }}><ArchitectureLabel label="Node APIs" /></Grid><Grid size={{ xs: 6, sm: 3 }}><ArchitectureLabel label="Event Loop" /></Grid><Grid size={{ xs: 6, sm: 3 }}><ArchitectureLabel label="Native/System capabilities" /></Grid></Grid></SectionCard><SectionCard title="Main JavaScript thread"><Typography color="text.secondary">JavaScript execution in a normal Node.js process primarily runs on one main JavaScript thread. Node.js can use background and system mechanisms for certain work, and Worker Threads exist for other use cases, but they are a separate topic.</Typography></SectionCard><SectionCard title="Call stack"><Typography color="text.secondary">When JavaScript calls functions, execution frames are placed onto the call stack. Completed functions are removed from the stack, returning execution to the frame beneath them.</Typography><CodeBlock filename="stack-example.js">{`function first() {
  second();
}

function second() {
  console.log("Hello");
}

first();`}</CodeBlock><Box sx={{ mt: 2, maxWidth: 280 }}><ArchitectureLabel label="second()" /><ArchitectureLabel label="first()" sx={{ mt: 0.75 }} /><ArchitectureLabel label="global" sx={{ mt: 0.75 }} /></Box></SectionCard><Box><Typography component="h2" variant="h2" sx={{ mb: 2 }}>Browser vs Node runtime</Typography><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Browser Runtime"><RuntimeList items={["JavaScript Engine", "DOM", "window", "Browser APIs", "Event Loop"]} /></SectionCard></Grid><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Node.js Runtime"><RuntimeList items={["V8", "Node APIs", "File System", "Network / HTTP", "process", "Event Loop"]} /></SectionCard></Grid></Grid></Box></Stack>;
}

function ArchitectureLabel({ label, sx }) {
  return <Box sx={{ ...sx, p: 1.25, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc", textAlign: "center" }}><Typography variant="body2" fontWeight={700}>{label}</Typography></Box>;
}

function RuntimeList({ items }) {
  return <Stack component="ul" spacing={0.75} sx={{ my: 0, pl: 2.5, color: "text.secondary" }}>{items.map((item) => <li key={item}>{item}</li>)}</Stack>;
}

function CodeTab() {
  return <Stack spacing={2}><SectionCard title="Synchronous function calls" subtitle="Each nested function enters the call stack and returns before the next operation continues."><CodeBlock filename="call-stack-example.js">{callStackCode}</CodeBlock></SectionCard><Grid container spacing={2}><Grid size={{ xs: 12, md: 7 }}><SectionCard title="Execution order"><Box component="ol" sx={{ my: 0, pl: 2.5, color: "text.secondary" }}>{codeSteps.map((step) => <li key={step}>{step}</li>)}</Box></SectionCard></Grid><Grid size={{ xs: 12, md: 5 }}><SectionCard title="Conceptual stack"><Stack spacing={0.75}><ArchitectureLabel label="createMessage()" /><ArchitectureLabel label="greet()" /><ArchitectureLabel label="global" /></Stack></SectionCard></Grid></Grid></Stack>;
}

function TryItTab({ executed, onRun, onReset }) {
  return <SectionCard title="Conceptual execution visualization" subtitle="This illustrates ordinary synchronous JavaScript function execution. It does not read the real V8 call stack." action={<Stack direction="row" spacing={1}><Button variant="outlined" startIcon={<RestartAltRounded />} onClick={onReset} disabled={!executed}>Reset</Button><Button variant="contained" startIcon={<PlayArrowRounded />} onClick={onRun}>Run Call Stack Example</Button></Stack>}>{executed ? <Stack spacing={1.25}>{executionSteps.map((step, index) => <Stack key={step} direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 27, height: 27, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", color: "primary.main", backgroundColor: "primary.light", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2">{step}</Typography></Stack>)}<Box sx={{ mt: 1, p: 1.75, borderRadius: 2, border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4" }}><Typography variant="caption" color="success.main" fontWeight={700}>OUTPUT</Typography><Typography fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontWeight={700} sx={{ mt: 0.5 }}>Hello, Node.js</Typography></Box></Stack> : <Typography color="text.secondary">Run the example to see the order in which synchronous function calls enter and leave the conceptual call stack.</Typography>}</SectionCard>;
}

function FlowTab() {
  const steps = [["JavaScript Source", "Your application code"], ["V8 Engine", "Executes JavaScript"], ["Main JavaScript Thread", "Runs normal JavaScript execution"], ["Call Stack", "Tracks active function calls"], ["Node.js Runtime APIs", "Provides server-side capabilities"], ["Operating System / External Resources", "Native and system work"]];
  return <Stack spacing={2}><SectionCard title="Runtime architecture" subtitle="A conceptual view of the path from source code to system capabilities."><Stack spacing={0}>{steps.map(([title, description], index) => <Box key={title}><Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 32, height: 32, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Box sx={{ py: 1.25 }}><Typography variant="h3">{title}</Typography><Typography variant="body2" color="text.secondary">{description}</Typography></Box></Stack>{index < steps.length - 1 && <Box sx={{ height: 18, ml: "15px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack></SectionCard><SectionCard title="Event Loop"><Typography color="text.secondary">Part of the Node.js runtime coordination model. Detailed event-loop behavior is covered in the next lesson.</Typography></SectionCard></Stack>;
}

function NodeRuntime() {
  const [tab, setTab] = useState(0);
  const [executed, setExecuted] = useState(false);
  const content = [<LearnTab key="learn" />, <CodeTab key="code" />, <TryItTab key="try" executed={executed} onRun={() => setExecuted(true)} onReset={() => setExecuted(false)} />, <FlowTab key="flow" />];

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 02" title="Node.js Runtime Architecture" subtitle="Understand how JavaScript executes inside Node.js and how the runtime provides capabilities beyond the JavaScript language." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Node.js runtime lesson content" variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export default NodeRuntime;