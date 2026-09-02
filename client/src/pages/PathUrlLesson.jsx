import { Box, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { ConceptExplorer, CoreLesson, FlowCards } from "../components/common/CoreLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

const examples = { path: { label: "Path", title: "uploads/images/logo.png", steps: ["path.join combines path segments", "basename returns logo.png", "extname returns .png", "dirname returns uploads/images"] }, url: { label: "URL", title: "https://example.com/products?page=2&sort=name", steps: ["URL parses the address", "Host: example.com", "Pathname: /products", "Query parameters: page=2, sort=name"] } };

function PathUrlLesson() {
  const learn = <Stack spacing={2}><SectionCard title="Paths across platforms"><Typography color="text.secondary">The built-in <Box component="code">node:path</Box> module helps safely build and inspect paths across operating systems. <Box component="code">path.join</Box>, <Box component="code">path.resolve</Box>, <Box component="code">basename</Box>, <Box component="code">dirname</Box>, and <Box component="code">extname</Box> avoid fragile manual string concatenation.</Typography></SectionCard><SectionCard title="URLs and query parameters"><Typography color="text.secondary">The standard <Box component="code">URL</Box> class parses addresses into parts such as host and pathname. <Box component="code">URLSearchParams</Box>, exposed through <Box component="code">url.searchParams</Box>, reads query parameters.</Typography></SectionCard></Stack>;
  const code = <Stack spacing={2}><SectionCard title="Path utilities"><CodeBlock filename="paths.js">{"import path from \"node:path\";\n\nconst filePath = path.join(\"uploads\", \"images\", \"logo.png\");"}</CodeBlock></SectionCard><SectionCard title="URL parsing"><CodeBlock filename="url.js">{"const url = new URL(\n  \"https://example.com/products?page=2&sort=name\"\n);\n\nurl.pathname;\nurl.searchParams.get(\"page\");"}</CodeBlock></SectionCard></Stack>;
  return <CoreLesson lesson="09" title="Path & URL" subtitle="Learn how Node.js normalizes file paths and parses URLs." learn={learn} code={code} tryIt={<ConceptExplorer title="Path & URL Explorer" subtitle="Choose a predefined example to inspect its conceptual result." options={examples} />} flow={<FlowCards flows={[{ title: "Path and URL flow", steps: ["Input", "path or URL API", "Parsed or normalized result"] }]} />} />;
}

export default PathUrlLesson;