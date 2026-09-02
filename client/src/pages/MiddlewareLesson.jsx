import { useState } from "react";
import { Box, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ExpressFlow, ExpressLesson } from "../components/common/ExpressLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function MiddlewareLesson() {
  const learn = <Stack spacing={2}><SectionCard title="What is middleware?"><Typography color="text.secondary">Middleware is a function that runs between a request and its final handler. It receives <Box component="code">req</Box>, <Box component="code">res</Box>, and <Box component="code">next</Box>. Global middleware uses <Box component="code">app.use</Box>; route middleware applies to a specific route.</Typography></SectionCard><SectionCard title="Execution order"><Typography color="text.secondary">Middleware runs in registration order. Logging, authentication, and validation are common examples. Middleware must call <Box component="code">next()</Box> when appropriate, or finish the response itself.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="A logging middleware"><CodeBlock filename="logger.js">{"function logger(req, res, next) {\n  console.log(req.method, req.url);\n  next();\n}\n\napp.use(logger);"}</CodeBlock></SectionCard>;
  return <ExpressLesson lesson="16" title="Middleware" subtitle="Learn how Express processes requests through ordered middleware functions." learn={learn} code={code} tryIt={<PipelineExplorer />} flow={<ExpressFlow title="Middleware chain" steps={["Request", "Logger", "Validation", "Controller", "Response"]} />} />;
}

function PipelineExplorer() {
  const [selected, setSelected] = useState(["logging", "validation"]);
  const [failed, setFailed] = useState(false);
  const steps = ["Request", ...selected.map((item) => item[0].toUpperCase() + item.slice(1)), failed ? "Validation fails → error response" : "Controller", failed ? null : "Response"].filter(Boolean);
  return <SectionCard title="Middleware Pipeline Explorer" subtitle="Conceptual frontend simulation only."><ToggleButtonGroup value={selected} onChange={(event, next) => setSelected(next)} aria-label="Middleware selection"><ToggleButton value="logging">Logging</ToggleButton><ToggleButton value="authentication">Authentication</ToggleButton><ToggleButton value="validation">Validation</ToggleButton></ToggleButtonGroup><ToggleButtonGroup exclusive value={failed ? "fail" : "pass"} onChange={(event, next) => next && setFailed(next === "fail")} aria-label="Validation result" sx={{ mt: 1, display: "flex" }}><ToggleButton value="pass">Validation passes</ToggleButton><ToggleButton value="fail">Validation fails</ToggleButton></ToggleButtonGroup><Box sx={{ mt: 2 }}><ExpressFlow title="Pipeline order" steps={steps} /></Box></SectionCard>;
}

export default MiddlewareLesson;