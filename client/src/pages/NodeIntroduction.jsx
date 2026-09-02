import { useState } from "react";
import { PlayArrowRounded, RefreshRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { getNodeInfo } from "../api/nodeApi.js";
import CodeBlock from "../components/common/CodeBlock.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

const tabLabels = ["Learn", "Code", "Try It", "Flow"];
const runtimeCode = `const runtimeInfo = {
  runtime: "Node.js",
  version: process.version,
  platform: process.platform,
  architecture: process.arch,
  processId: process.pid,
  uptime: process.uptime()
};`;

const processDetails = [["process.version", "Current Node.js version."], ["process.platform", "Operating system platform."], ["process.arch", "CPU architecture."], ["process.pid", "Current process ID."], ["process.uptime()", "Number of seconds the Node.js process has been running."]];
const flowSteps = [["React UI", "User clicks Run Example"], ["API Layer", "getNodeInfo()"], ["HTTP Request", "GET /api/node/info"], ["Express Router", "nodeRoutes.js"], ["Controller", "nodeController.js"], ["Node Runtime", "process.version, process.platform, and more"], ["JSON Response", "Returned to React state"]];

function LearnTab() {
  return <Stack spacing={2}><SectionCard title="What is Node.js?"><Typography color="text.secondary">Node.js is a JavaScript runtime that allows JavaScript to execute outside the web browser. JavaScript originally runs in browsers, while Node.js makes it useful for backend and server-side work.</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>It is commonly used to build:</Typography><Box component="ul" sx={{ my: 0, pl: 2.5, color: "text.secondary" }}><li>Web APIs</li><li>Backend services</li><li>Command-line tools</li><li>Real-time applications</li><li>Automation tools</li></Box></SectionCard><Box><Typography component="h2" variant="h2" sx={{ mb: 2 }}>Browser vs Node.js</Typography><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Browser JavaScript"><Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5, color: "text.secondary" }}><li>DOM</li><li>window</li><li>UI interactions</li><li>Browser APIs</li></Stack></SectionCard></Grid><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Node.js"><Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5, color: "text.secondary" }}><li>File system</li><li>HTTP servers</li><li>Operating system APIs</li><li>Backend services</li></Stack></SectionCard></Grid></Grid></Box></Stack>;
}

function CodeTab() {
  return <Stack spacing={2}><SectionCard title="Inspect the runtime"><Typography color="text.secondary" sx={{ mb: 2 }}>The global <Box component="code" sx={{ px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: "#f1f5f9", color: "text.primary" }}>process</Box> object provides information about the currently running Node.js process.</Typography><CodeBlock filename="nodeController.js">{runtimeCode}</CodeBlock></SectionCard><SectionCard title="Process properties"><Grid container spacing={1.5}>{processDetails.map(([property, description]) => <Grid key={property} size={{ xs: 12, sm: 6 }}><Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}><Typography fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="0.8125rem" fontWeight={700} color="primary.main">{property}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography></Box></Grid>)}</Grid></SectionCard></Stack>;
}

function TryItTab({ runtimeData, loading, error, onRun }) {
  const details = runtimeData ? [["Runtime", runtimeData.runtime], ["Node Version", runtimeData.version], ["Platform", runtimeData.platform], ["Architecture", runtimeData.architecture], ["Process ID", runtimeData.processId], ["Uptime", `${runtimeData.uptime.toFixed(2)} seconds`]] : [];
  return <Stack spacing={2}><SectionCard title="Node Runtime Inspector" subtitle="Run the example to retrieve information from the actual Node.js process running the backend." action={<Button variant="contained" onClick={onRun} disabled={loading} startIcon={loading ? <CircularProgress size={16} color="inherit" /> : error ? <RefreshRounded /> : <PlayArrowRounded />}>{loading ? "Running..." : error ? "Try Again" : "Run Example"}</Button>}>{error ? <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #fecaca", backgroundColor: "#fef2f2" }}><Stack direction="row" justifyContent="space-between" spacing={2}><Box><Typography fontWeight={700} color="error.main">Unable to retrieve Node runtime information.</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Make sure the Node.js backend is running on port 5000.</Typography></Box><StatusBadge label="Disconnected" status="error" /></Stack></Box> : runtimeData ? <Grid container spacing={1.5}>{details.map(([label, value]) => <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}><Box sx={{ p: 1.75, borderRadius: 2, border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}><Typography variant="caption" color="text.secondary" fontWeight={700}>{label}</Typography><Typography fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="0.9rem" fontWeight={700} sx={{ mt: 0.5, overflowWrap: "anywhere" }}>{value}</Typography></Box></Grid>)}</Grid> : <Typography color="text.secondary">No runtime values are displayed until you run the example.</Typography>}</SectionCard>{runtimeData && <SectionCard title="What just happened?"><Box component="ol" sx={{ my: 0, pl: 2.5, color: "text.secondary" }}><li>React handled the button click.</li><li><Box component="code">nodeApi.js</Box> sent an HTTP GET request through Axios.</li><li>Express matched <Box component="code">/api/node/info</Box> and the router forwarded it to the controller.</li><li>The controller read values from the Node.js <Box component="code">process</Box> object and returned JSON.</li><li>React stored the response in state and updated this UI.</li></Box></SectionCard>}</Stack>;
}

function FlowTab() {
  return <SectionCard title="Request lifecycle" subtitle="Follow the example from a user interaction to a live Node.js response."><Stack spacing={0}>{flowSteps.map(([title, description], index) => <Box key={title}><Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 32, height: 32, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Box sx={{ py: 1.25 }}><Typography variant="h3">{title}</Typography><Typography variant="body2" color="text.secondary">{description}</Typography></Box></Stack>{index < flowSteps.length - 1 && <Box sx={{ height: 18, ml: "15px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack></SectionCard>;
}

function NodeIntroduction() {
  const [tab, setTab] = useState(0);
  const [runtimeData, setRuntimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunExample = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getNodeInfo();
      setRuntimeData(response.data);
    } catch {
      setRuntimeData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const tabContent = [<LearnTab key="learn" />, <CodeTab key="code" />, <TryItTab key="try" runtimeData={runtimeData} loading={loading} error={error} onRun={handleRunExample} />, <FlowTab key="flow" />];

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 01" title="Node.js Introduction" subtitle="Understand what Node.js is and how server-side JavaScript works." /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Node.js lesson content" variant="scrollable" allowScrollButtonsMobile>{tabLabels.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{tabContent[tab]}</Stack>;
}

export default NodeIntroduction;