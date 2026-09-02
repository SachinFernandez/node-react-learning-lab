import { Box, Typography } from "@mui/material";

function CodeBlock({ filename, children }) {
  return (
    <Box sx={{ overflow: "hidden", border: "1px solid #1e293b", borderRadius: 2.5, backgroundColor: "#0f172a" }}>
      {filename && <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #1e293b", backgroundColor: "#172033" }}><Typography color="#cbd5e1" variant="caption" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{filename}</Typography></Box>}
      <Box component="pre" sx={{ m: 0, p: { xs: 2, sm: 2.5 }, overflowX: "auto", color: "#e2e8f0", fontSize: "0.8125rem", lineHeight: 1.7, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{children}</Box>
    </Box>
  );
}

export default CodeBlock;