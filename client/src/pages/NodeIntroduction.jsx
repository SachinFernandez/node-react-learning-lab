import { useState } from "react";
import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const tabLabels = ["Learn", "Code", "Try It", "Flow"];

function NodeIntroduction() {
  const [tab, setTab] = useState(0);

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="FOUNDATIONS • LESSON 01" title="Node.js Introduction" subtitle="Understand what Node.js is and how server-side JavaScript works." /><Box sx={{ borderBottom: 1, borderColor: "divider" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label="Node.js lesson content">{tabLabels.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{tab === 0 ? <Stack spacing={2}><SectionCard title="What is Node.js?"><Typography color="text.secondary">Node.js is a JavaScript runtime that allows JavaScript to execute outside the web browser.</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>It is commonly used to build:</Typography><Box component="ul" sx={{ my: 0, pl: 2.5, color: "text.secondary" }}><li>Web APIs</li><li>Backend services</li><li>Command-line tools</li><li>Real-time applications</li><li>Automation tools</li></Box></SectionCard><Box><Typography component="h2" variant="h2" sx={{ mb: 2 }}>Browser vs Node.js</Typography><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Browser JavaScript"><Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5, color: "text.secondary" }}><li>DOM</li><li>window</li><li>UI interactions</li><li>Browser APIs</li></Stack></SectionCard></Grid><Grid size={{ xs: 12, md: 6 }}><SectionCard title="Node.js"><Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5, color: "text.secondary" }}><li>File system</li><li>HTTP servers</li><li>Operating system APIs</li><li>Backend services</li></Stack></SectionCard></Grid></Grid></Box></Stack> : <SectionCard title={tabLabels[tab]}><Typography color="text.secondary">Interactive {tabLabels[tab].toLowerCase()} content will be added in an upcoming phase.</Typography></SectionCard>}</Stack>;
}

export default NodeIntroduction;