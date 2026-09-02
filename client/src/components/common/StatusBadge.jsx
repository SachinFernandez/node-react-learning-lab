import { Box, Typography } from "@mui/material";

const statusStyles = { success: { backgroundColor: "#dcfce7", color: "#166534" }, warning: { backgroundColor: "#fef3c7", color: "#92400e" }, error: { backgroundColor: "#fee2e2", color: "#991b1b" }, neutral: { backgroundColor: "#eef2f7", color: "#475569" } };

function StatusBadge({ label, status = "neutral" }) {
  const style = statusStyles[status] ?? statusStyles.neutral;
  return <Box component="span" sx={{ ...style, display: "inline-flex", alignItems: "center", px: 1.1, py: 0.45, borderRadius: 1.5 }}><Typography component="span" variant="caption" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{label}</Typography></Box>;
}

export default StatusBadge;