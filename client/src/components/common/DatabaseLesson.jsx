import { useState } from "react";
import { Box, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import SectionCard from "./SectionCard.jsx";

const tabs = ["Learn", "Code", "Try It", "Flow"];

export function DatabaseLesson({ lesson, title, subtitle, learn, code, tryIt, flow }) {
  const [tab, setTab] = useState(0);
  const content = [learn, code, tryIt, flow];
  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow={`DATABASE • LESSON ${lesson}`} title={title} subtitle={subtitle} /><Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}><Tabs value={tab} onChange={(event, nextTab) => setTab(nextTab)} aria-label={`${title} lesson content`} variant="scrollable" allowScrollButtonsMobile>{tabs.map((label) => <Tab key={label} label={label} />)}</Tabs></Box>{content[tab]}</Stack>;
}

export function DatabaseExplorer({ title, subtitle, options }) {
  const [selected, setSelected] = useState(Object.keys(options)[0]);
  const current = options[selected];
  return <SectionCard title={title} subtitle={subtitle}><ToggleButtonGroup exclusive value={selected} onChange={(event, next) => next && setSelected(next)} aria-label={title} sx={{ flexWrap: "wrap" }}>{Object.entries(options).map(([key, option]) => <ToggleButton key={key} value={key}>{option.label}</ToggleButton>)}</ToggleButtonGroup><Box sx={{ mt: 2, p: 2, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="h3">{current.title}</Typography><Stack spacing={0.75} sx={{ mt: 1.5 }}>{current.steps.map((step, index) => <Stack key={step} direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 26, height: 26, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2">{step}</Typography></Stack>)}</Stack>{current.result && <Typography component="pre" variant="body2" sx={{ mt: 1.5, mb: 0, p: 1.25, borderRadius: 2, backgroundColor: "#0f172a", color: "#e2e8f0", whiteSpace: "pre-wrap" }}>{current.result}</Typography>}</Box></SectionCard>;
}

export function DatabaseFlow({ title, steps }) {
  return <SectionCard title={title}><Stack spacing={0}>{steps.map((step, index) => <Box key={step}><Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 27, height: 27, display: "grid", placeItems: "center", flexShrink: 0, borderRadius: "50%", backgroundColor: "primary.light", color: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>{index + 1}</Box><Typography variant="body2" fontWeight={600}>{step}</Typography></Stack>{index < steps.length - 1 && <Box sx={{ height: 14, ml: "13px", borderLeft: "1px solid #cbd5e1" }} />}</Box>)}</Stack></SectionCard>;
}