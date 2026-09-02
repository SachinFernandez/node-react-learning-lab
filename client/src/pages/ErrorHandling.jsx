import { useState } from "react";
import { PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];
const scenarios = {
  success: { label: "Success", result: "Result handled successfully", status: "success", steps: ["Operation starts", "Operation returns a result", "Success path handles the result"] },
  sync: { label: "Synchronous Error", result: "Cannot divide by zero", status: "error", steps: ["divide() detects zero", "throw creates an Error", "try/catch handles error.message"] },
  promise: { label: "Promise Rejection", result: "Failed to load data", status: "error", steps: ["Promise is created", "Promise rejects with an Error", ".catch() handles the rejection"] },
  async: { label: "Async/Await Error", result: "Failed to load data", status: "error", steps: ["async function starts", "Promise is awaited", "Promise rejects", "Execution moves to catch", "Error message is handled", "finally runs"] },
};

function ErrorHandling() {
  const [tab, setTab] = useState(0);
  const [scenario, setScenario] = useState("success");
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const run = async () => {
    if (running) return;
    setRunning(true);
    setSteps([]);
    for (const step of scenarios[scenario].steps) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      setSteps((current) => [...current, step]);
    }
    setRunning(false);
  };
  const learn = <Stack spacing={2}><SectionCard title="Why error handling matters"><Typography color="text.secondary">Failures are part of normal software operation. Handle expected errors deliberately, return useful safe messages, and avoid silently swallowing errors after logging them.</Typography></SectionCard><SectionCard title="Synchronous and asynchronous errors"><Typography color="text.secondary"><Box component="code">throw new Error(...)</Box> creates a synchronous error that nearby <Box component="code">try/catch</Box> can handle. Promise rejections use <Box component="code">.catch()</Box>, or can be handled by <Box component="code">try/catch</Box> when the Promise is awaited.</Typography></SectionCard><SectionCard title="finally and error types"><Typography color="text.secondary"><Box component="code">finally</Box> runs after success or failure for cleanup. Expected errors, such as invalid input or a missing resource, should be handled intentionally. Unexpected failures need safe responses and investigation.</Typography></SectionCard></Stack>;
  const code = <Stack spacing={2}><SectionCard title="Synchronous error"><CodeBlock filename="divide.js">{"function divide(a, b) {\n  if (b === 0) {\n    throw new Error(\"Cannot divide by zero\");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 0));\n} catch (error) {\n  console.error(error.message);\n}"}</CodeBlock></SectionCard><SectionCard title="Promise rejection"><CodeBlock filename="promise.js">{"function loadData() {\n  return Promise.reject(new Error(\"Failed to load data\"));\n}\n\nloadData()\n  .then(console.log)\n  .catch((error) => console.error(error.message));"}</CodeBlock></SectionCard><SectionCard title="Async/Await"><CodeBlock filename="async.js">{"async function run() {\n  try {\n    const result = await loadData();\n    console.log(result);\n  } catch (error) {\n    console.error(error.message);\n  } finally {\n    console.log(\"Finished\");\n  }\n}"}</CodeBlock></SectionCard></Stack>;
  const current = scenarios[scenario];
  const tryIt = <SectionCard title="Error Handling Explorer" subtitle="Conceptual visualization only."><ToggleButtonGroup exclusive value={scenario} onChange={(event, next) => next && !running && (setScenario(next), setSteps([]))} aria-label="Error scenario" sx={{ flexWrap: "wrap" }}>{Object.entries(scenarios).map(([key, item]) => <ToggleButton key={key} value={key}>{item.label}</ToggleButton>)}</ToggleButtonGroup><Stack direction="row" spacing={1} sx={{ mt: 2 }}><Button variant="contained" startIcon={<PlayArrowRounded />} onClick={run} disabled={running}>{running ? "Running..." : "Run Example"}</Button><Button variant="outlined" startIcon={<RestartAltRounded />} onClick={() => setSteps([])} disabled={!steps.length || running}>Reset</Button></Stack>{steps.length > 0 && <Stack spacing={1} sx={{ mt: 2 }}>{steps.map((step, index) => <Stack key={step} direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 26, height: 26, display: "grid", placeItems: "center", borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2">{step}</Typography></Stack>)}{!running && <StatusBadge label={current.result} status={current.status} />}</Stack>}</SectionCard>;
  const flow = <Grid container spacing={2}><Grid size={{ xs: 12, md: 4 }}><FlowCard title="Synchronous" steps={["Code", "throw", "catch", "Handled"]} /></Grid><Grid size={{ xs: 12, md: 4 }}><FlowCard title="Promise" steps={["Promise", "Resolve or reject", "then or catch"]} /></Grid><Grid size={{ xs: 12, md: 4 }}><FlowCard title="Async/Await" steps={["try", "await", "Success or rejection", "catch", "finally"]} /></Grid><Grid size={{ xs: 12 }}><Typography variant="body2" color="text.secondary">Unhandled errors can terminate or destabilize server processes depending on context; applications should handle failures intentionally.</Typography></Grid></Grid>;
  const content = [learn, code, tryIt, flow];
  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 07" title="Error Handling" subtitle="Learn how Node.js and JavaScript handle synchronous errors, Promise rejections, and async/await failures." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Error Handling lesson content" variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

function FlowCard({ title, steps }) {
  return <SectionCard title={title}><Stack spacing={0}>{steps.map((step, index) => <Box key={step}><Typography variant="body2" fontWeight={600}>{step}</Typography>{index < steps.length - 1 && <Typography color="primary.main">↓</Typography>}</Box>)}</Stack></SectionCard>;
}

export default ErrorHandling;