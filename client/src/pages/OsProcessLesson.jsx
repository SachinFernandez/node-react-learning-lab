import { Box, Grid, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ConceptExplorer, CoreLesson, FlowCards } from "../components/common/CoreLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const inspectors = { process: { label: "process", title: "Current Node.js process", steps: ["version identifies Node.js", "pid identifies this process", "cwd is the working directory", "argv contains arguments", "uptime measures process runtime"] }, os: { label: "node:os", title: "Machine and system information", steps: ["platform and arch describe the system", "hostname identifies the machine", "cpus, totalmem, freemem, and uptime expose system information"] } };

function OsProcessLesson() {
  const learn = <Stack spacing={2}><SectionCard title="os versus process"><Grid container spacing={2}><Grid size={{ xs: 12, md: 6 }}><Typography variant="h3">node:os</Typography><Typography color="text.secondary">Machine and system information: platform, architecture, hostname, CPUs, memory, and uptime.</Typography></Grid><Grid size={{ xs: 12, md: 6 }}><Typography variant="h3">process</Typography><Typography color="text.secondary">Information about the current Node.js process: version, PID, current directory, arguments, environment concept, and uptime.</Typography></Grid></Grid></SectionCard><SectionCard title="Use system details thoughtfully"><Typography color="text.secondary">Runtime information helps diagnostics and teaching. Treat <Box component="code">process.env</Box> as configuration input and do not expose secrets in application responses.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="System and process APIs"><CodeBlock filename="runtime.js">{"import os from \"node:os\";\n\nconsole.log(os.platform());\nconsole.log(os.arch());\nconsole.log(process.pid);\nconsole.log(process.cwd());"}</CodeBlock></SectionCard>;
  return <CoreLesson lesson="10" title="OS & Process" subtitle="Understand machine information and the current Node.js process." learn={learn} code={code} tryIt={<ConceptExplorer title="Runtime/System Inspector" subtitle="A conceptual view of the APIs; the existing runtime lesson already uses live process data." options={inspectors} />} flow={<FlowCards flows={[{ title: "Current process", steps: ["Node process", "process API", "Current process information"] }, { title: "Operating system", steps: ["Operating system", "node:os module", "System information"] }]} />} />;
}

export default OsProcessLesson;