import { Grid, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { DatabaseExplorer, DatabaseFlow, DatabaseLesson } from "../components/common/DatabaseLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const responsibilities = { controller: { label: "Controller", title: "HTTP concerns", steps: ["Reads req params, query, and body", "Calls the service", "Maps results to HTTP status and response"] }, service: { label: "Service", title: "Business logic", steps: ["Validates business rules", "Coordinates repository calls", "Decides when not-found is an error"] }, repository: { label: "Repository", title: "SQL and data access", steps: ["Executes parameterized SQL", "Maps rows to data", "Does not validate HTTP requests"] } };

function ServiceLayer() {
  const learn = <Stack spacing={2}><SectionCard title="Separate responsibilities"><Grid container spacing={2}><Grid size={{ xs: 12, md: 4 }}><Typography variant="h3">Controller</Typography><Typography color="text.secondary">HTTP request and response concerns.</Typography></Grid><Grid size={{ xs: 12, md: 4 }}><Typography variant="h3">Service</Typography><Typography color="text.secondary">Validation, business rules, and coordination.</Typography></Grid><Grid size={{ xs: 12, md: 4 }}><Typography variant="h3">Repository</Typography><Typography color="text.secondary">SQL and data access.</Typography></Grid></Grid></SectionCard><SectionCard title="A useful boundary"><Typography color="text.secondary">A service layer is not mandatory in every application. It becomes useful when business rules would otherwise be mixed into controllers or repeated across routes.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Conceptual TaskService"><CodeBlock filename="services/taskService.js">{"async function getTask(id) {\n  const task = await taskRepository.findById(id);\n\n  if (!task) {\n    throw new Error(\"Task not found\");\n  }\n\n  return task;\n}"}</CodeBlock></SectionCard>;
  return <DatabaseLesson lesson="21" title="Service Layer" subtitle="Learn how controllers, services, and repositories separate responsibilities." learn={learn} code={code} tryIt={<DatabaseExplorer title="Architecture Responsibility Explorer" subtitle="Select a layer to inspect its responsibilities." options={responsibilities} />} flow={<DatabaseFlow title="Persistent application flow" steps={["React", "Route", "Controller", "Service", "Repository", "MySQL", "Response"]} />} />;
}

export default ServiceLayer;