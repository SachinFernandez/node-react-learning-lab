import { Box, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ConceptExplorer, CoreLesson, FlowCards } from "../components/common/CoreLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const lifecycle = { get: { label: "GET /hello", title: "HTTP Request Lifecycle", steps: ["Client sends GET /hello", "Node http.createServer receives the request", "Request object exposes method and URL", "Response object receives status, headers, and body", "Client receives the JSON response"], result: "200 application/json response." } };

function HttpModuleLesson() {
  const learn = <Stack spacing={2}><SectionCard title="The node:http module"><Typography color="text.secondary">Node.js includes the built-in <Box component="code">node:http</Box> module for creating HTTP servers without Express. A request handler receives request and response objects with method, URL, status code, headers, and body controls.</Typography></SectionCard><SectionCard title="Why Express exists"><Typography color="text.secondary">Express simplifies routing, middleware, request parsing, and other common tasks. It builds on the Node HTTP infrastructure rather than replacing it completely.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="A lower-level HTTP server"><CodeBlock filename="server.js">{"import http from \"node:http\";\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader(\"Content-Type\", \"application/json\");\n\n  res.end(\n    JSON.stringify({\n      message: \"Hello from Node HTTP\"\n    })\n  );\n});\n\nserver.listen(3000);"}</CodeBlock></SectionCard>;
  return <CoreLesson lesson="13" title="HTTP Module" subtitle="Learn how Node.js creates HTTP servers underneath frameworks such as Express." learn={learn} code={code} tryIt={<ConceptExplorer title="HTTP Request Lifecycle Explorer" subtitle="Conceptual only; this lesson does not create another server or port." options={lifecycle} />} flow={<FlowCards flows={[{ title: "HTTP request flow", steps: ["Browser or client", "TCP/HTTP request concept", "Node http.createServer", "Request handler", "Response", "Client"] }]} />} />;
}

export default HttpModuleLesson;