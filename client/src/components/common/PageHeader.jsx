import { Box, Stack, Typography } from "@mui/material";

function PageHeader({ eyebrow, title, subtitle, action }) {
  return <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2}><Box>{eyebrow && <Typography variant="overline" color="primary.main">{eyebrow}</Typography>}<Typography component="h1" variant="h1" sx={{ mt: eyebrow ? 0.5 : 0 }}>{title}</Typography>{subtitle && <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>{subtitle}</Typography>}</Box>{action}</Stack>;
}

export default PageHeader;