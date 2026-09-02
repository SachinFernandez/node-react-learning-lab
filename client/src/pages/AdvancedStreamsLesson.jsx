import { Box, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { AdvancedExplorer, AdvancedFlow, AdvancedLesson } from "../components/common/AdvancedLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function AdvancedStreamsLesson() {
  const learn = <Stack spacing={2}><SectionCard title="Stream types"><Typography color="text.secondary">Readable streams provide data, writable streams receive it, duplex streams do both, and transform streams change data while it passes through. Streams move chunks incrementally.</Typography></SectionCard><SectionCard title="pipeline and backpressure"><Typography color="text.secondary"><Box component="code">pipe()</Box> connects streams. <Box component="code">pipeline()</Box> coordinates completion and errors across a chain. Backpressure occurs when a consumer is slower than a producer; <Box component="code">highWaterMark</Box> is a buffering threshold concept, not a performance guarantee.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Pipeline with error coordination"><CodeBlock filename="copy.js">{"import { createReadStream, createWriteStream } from \"node:fs\";\nimport { pipeline } from \"node:stream/promises\";\n\nawait pipeline(\n  createReadStream(\"./input.txt\"),\n  createWriteStream(\"./output.txt\")\n);"}</CodeBlock></SectionCard>;
  return <AdvancedLesson lesson="29" title="Advanced Streams" subtitle="Learn how pipelines coordinate chunked data, completion, and errors." learn={learn} code={code} tryIt={<AdvancedExplorer title="Stream Pipeline Visualizer" subtitle="Conceptual chunks only; no files are accessed." options={{ pipeline: { label: "Pipeline", title: "Chunked flow", steps: ["Source produces chunk 1", "Transform processes chunk 1", "Destination receives chunk 1", "Chunks 2 and 3 follow"], result: "Fast producer → backpressure → slower consumer" } }} />} flow={<AdvancedFlow title="Stream pipeline" steps={["Readable", "Buffer or chunks", "Transform", "Writable"]} />} />;
}

export default AdvancedStreamsLesson;