import { Box, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ConceptExplorer } from "../components/common/CoreLesson.jsx";
import { ExpressFlow, ExpressLesson } from "../components/common/ExpressLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function ExpressFundamentals() {
  const learn = <Stack spacing={2}><SectionCard title="What is Express?"><Typography color="text.secondary">Express is a Node.js web framework built on Node HTTP. It simplifies routing, middleware, request parsing, and responses; it does not replace Node.js itself.</Typography></SectionCard><SectionCard title="An Express application"><Typography color="text.secondary"><Box component="code">express()</Box> creates an app. <Box component="code">app.use()</Box> registers middleware, <Box component="code">app.get()</Box> handles a route, and <Box component="code">app.listen()</Box> starts listening. Handlers receive <Box component="code">req</Box> and <Box component="code">res</Box> and can return JSON.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="A simple route"><CodeBlock filename="app.js">{"import express from \"express\";\n\nconst app = express();\n\napp.use(express.json());\n\napp.get(\"/api/hello\", (req, res) => {\n  res.json({ message: \"Hello Express\" });\n});\n\napp.listen(5000);"}</CodeBlock></SectionCard>;
  return <ExpressLesson lesson="14" title="Express Fundamentals" subtitle="Learn how Express simplifies HTTP application development in Node.js." learn={learn} code={code} tryIt={<ConceptExplorer title="Conceptual Express Request Explorer" subtitle="Follow a predefined GET /api/hello request." options={{ request: { label: "GET /api/hello", title: "JSON response", steps: ["Request reaches the Express app", "Route matches GET /api/hello", "Handler receives req and res", "res.json sends { message: Hello Express }"] } }} />} flow={<ExpressFlow title="Express request flow" steps={["Client", "Node HTTP", "Express", "Route handler", "Response"]} />} />;
}

export default ExpressFundamentals;