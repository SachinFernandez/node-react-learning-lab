import { useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import SectionCard from "./SectionCard.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];

export function ExpressLesson({ lesson, title, subtitle, learn, code, tryIt, flow }) {
  const [tab, setTab] = useState(0);
  const content = [learn, code, tryIt, flow];
  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow={`EXPRESS & REST • LESSON ${lesson}`} title={title} subtitle={subtitle} /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label={`${title} lesson content`} variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export function ExpressFlow({ title, steps }) {
  return <SectionCard title={title}><Stack spacing={0}>{steps.map((step, index) => <Box key={step}><Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 27, height: 27, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2" fontWeight={600}>{step}</Typography></Stack>{index < steps.length - 1 && <Box sx={{ height: 14, ml: "13px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack></SectionCard>;
}