import { Grid, Stack, Typography } from "@mui/material";
import { ProductionExplorer, ProductionFlow, ProductionLesson } from "../components/common/ProductionLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const strategies = { unit: { label: "Unit", title: "Unit testing", steps: ["Arrange a focused unit", "Act by invoking behavior", "Assert the expected result"], result: "Useful for isolated logic" }, integration: { label: "Integration", title: "Integration testing", steps: ["Arrange connected modules", "Act across their boundary", "Assert collaboration works"], result: "Useful for module boundaries" }, api: { label: "API", title: "API testing", steps: ["Arrange server state", "Act with an HTTP request", "Assert status and response body"], result: "Useful for routes and controllers" }, frontend: { label: "Frontend", title: "Frontend/component testing", steps: ["Arrange rendered UI", "Act with user interaction", "Assert visible behavior"], result: "Useful for component behavior" } };

function TestingLesson() {
  const learn = <Stack spacing={2}><SectionCard title="Testing layers"><Grid container spacing={2}><TestType title="Unit" text="Tests a small unit of logic." /><TestType title="Integration" text="Tests modules working together." /><TestType title="API" text="Tests HTTP behavior and responses." /><TestType title="Frontend" text="Tests rendered components and interaction." /></Grid></SectionCard><SectionCard title="Tools and confidence"><Typography color="text.secondary">Vitest or Jest, Supertest, and React Testing Library are common tools. Mocking can isolate dependencies. Tests increase confidence but do not prove the absence of bugs.</Typography></SectionCard><SectionCard title="Arrange, Act, Assert"><Typography color="text.secondary">Arrange the preconditions, act by running behavior, then assert the expected outcome. Repeat after fixing a failure.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Test intent"><Typography color="text.secondary">A useful test describes observable behavior. Keep tests focused on the responsibility being checked rather than implementation details that may change.</Typography></SectionCard>;
  return <ProductionLesson lesson="34" title="Testing" subtitle="Learn how focused tests build confidence across Node.js APIs and React UI." learn={learn} code={code} tryIt={<ProductionExplorer title="Testing Strategy Explorer" subtitle="Choose a testing layer to inspect its role." options={strategies} />} flow={<ProductionFlow title="Testing loop" steps={["Code", "Test", "Pass or fail", "Fix", "Repeat"]} />} />;
}

function TestType({ title, text }) {
  return <Grid size={{ xs: 12, sm: 6 }}><Typography variant="h3">{title}</Typography><Typography color="text.secondary">{text}</Typography></Grid>;
}

export default TestingLesson;