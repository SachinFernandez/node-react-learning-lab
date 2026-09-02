import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: { primary: { main: "#4f46e5", dark: "#3730a3", light: "#eef2ff" }, success: { main: "#15803d" }, warning: { main: "#b45309" }, error: { main: "#b91c1c" }, background: { default: "#f8fafc", paper: "#ffffff" }, text: { primary: "#0f172a", secondary: "#64748b" }, divider: "#e2e8f0" },
  typography: { fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', h1: { fontSize: "2rem", lineHeight: 1.2, fontWeight: 700 }, h2: { fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 700 }, h3: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 700 }, subtitle1: { fontSize: "1rem", lineHeight: 1.6 }, body2: { fontSize: "0.875rem", lineHeight: 1.6 }, overline: { fontSize: "0.6875rem", lineHeight: 1.4, fontWeight: 700, letterSpacing: "0.08em" } },
  shape: { borderRadius: 15 },
  components: { MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 10, fontWeight: 650, textTransform: "none", padding: "9px 16px" } } }, MuiCard: { styleOverrides: { root: { border: "1px solid #e2e8f0", boxShadow: "none", borderRadius: 15 } } }, MuiPaper: { styleOverrides: { outlined: { borderColor: "#e2e8f0" } } }, MuiTabs: { styleOverrides: { indicator: { height: 3, borderRadius: 3 } } } },
});

export default theme;