import { Card, CardContent, Stack, Typography } from "@mui/material";

function SectionCard({ title, subtitle, action, children, sx }) {
  return <Card sx={sx}><CardContent sx={{ p: { xs: 2.5, sm: 3 }, "&:last-child": { pb: { xs: 2.5, sm: 3 } } }}>{(title || subtitle || action) && <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between" alignItems={{ sm: "flex-start" }} sx={{ mb: children ? 2.5 : 0 }}><div>{title && <Typography component="h2" variant="h2">{title}</Typography>}{subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}</div>{action}</Stack>}{children}</CardContent></Card>;
}

export default SectionCard;