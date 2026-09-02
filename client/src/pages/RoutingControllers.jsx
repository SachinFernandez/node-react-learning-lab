import { Box, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ConceptExplorer } from "../components/common/CoreLesson.jsx";
import { ExpressFlow, ExpressLesson } from "../components/common/ExpressLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function RoutingControllers() {
  const learn = <Stack spacing={2}><SectionCard title="Routes and controllers"><Typography color="text.secondary"><Box component="code">express.Router()</Box> groups related routes. Routes decide which controller handles a request; controllers handle request input and build responses. This project follows <Box component="code">app.js → routes → controllers</Box>.</Typography></SectionCard><SectionCard title="Request input"><Typography color="text.secondary"><Box component="code">req.params</Box> holds path values such as an ID, <Box component="code">req.query</Box> holds URL query values, and <Box component="code">req.body</Box> holds parsed request data such as a POST payload.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Route parameters"><CodeBlock filename="userRoutes.js">{"router.get(\"/users/:id\", getUser);\n\nexport function getUser(req, res) {\n  const { id } = req.params;\n  res.json({ id });\n}"}</CodeBlock></SectionCard>;
  return <ExpressLesson lesson="15" title="Routing & Controllers" subtitle="Learn how Express separates route matching from request-handling logic." learn={learn} code={code} tryIt={<ConceptExplorer title="Request Input Explorer" subtitle="Choose a request shape to see where Express exposes its values." options={{ params: { label: "GET /users/10", title: "Route parameter", steps: ["Router matches /users/:id", "req.params.id is 10", "Controller returns the ID"] }, query: { label: "GET /users?page=2", title: "Query parameter", steps: ["Router matches /users", "req.query.page is 2", "Controller can filter results"] }, body: { label: "POST /users", title: "Request body", steps: ["express.json parses JSON", "req.body contains submitted fields", "Controller validates and responds"] } }} />} flow={<ExpressFlow title="Routing flow" steps={["Request", "Router", "Controller", "Response"]} />} />;
}

export default RoutingControllers;