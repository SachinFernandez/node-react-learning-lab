import { useState } from "react";
import { AccountTreeRounded, MenuRounded, SpaceDashboardRounded, TerminalRounded } from "@mui/icons-material";
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 264;
const navigation = [{ label: "OVERVIEW", items: [{ label: "Dashboard", to: "/", icon: <SpaceDashboardRounded /> }] }, { label: "FOUNDATIONS", items: [{ label: "Node.js Introduction", to: "/learn/node-introduction", icon: <TerminalRounded /> }, { label: "Node.js Runtime", to: "/learn/node-runtime", icon: <AccountTreeRounded /> }] }];

function Navigation({ onNavigate }) {
  return <Box sx={{ px: 1.5, py: 2.5 }}><Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 1, pb: 4 }}><Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 2.5, color: "primary.main", backgroundColor: "primary.light" }}><TerminalRounded fontSize="small" /></Box><Box><Typography fontWeight={750} fontSize="0.9rem">Node.js</Typography><Typography fontWeight={600} fontSize="0.78rem" color="text.secondary">Learning Lab</Typography></Box></Stack>{navigation.map((section) => <Box key={section.label} sx={{ mb: 3 }}><Typography variant="overline" color="text.secondary" sx={{ display: "block", px: 1.25, mb: 0.75 }}>{section.label}</Typography><List disablePadding>{section.items.map((item) => <ListItemButton key={item.to} component={NavLink} to={item.to} end={item.to === "/"} onClick={onNavigate} sx={{ mb: 0.5, borderRadius: 2.25, color: "text.secondary", "& .MuiListItemIcon-root": { color: "inherit", minWidth: 38 }, "&.active": { color: "primary.main", backgroundColor: "primary.light", fontWeight: 700 }, "&:hover": { backgroundColor: "#f1f5f9", color: "text.primary" } }}><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.label} primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: "inherit" }} /></ListItemButton>)}</List></Box>)}</Box>;
}

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const context = location.pathname === "/" ? "Learning Workspace" : "Foundations";
  return <Box sx={{ minHeight: "100vh", display: "flex" }}><Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="Learning navigation"><Drawer variant="permanent" open sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, borderRight: "1px solid #e2e8f0", boxSizing: "border-box", backgroundColor: "#fff" } }}><Navigation /></Drawer><Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}><Navigation onNavigate={() => setMobileOpen(false)} /></Drawer></Box><Box sx={{ flexGrow: 1, minWidth: 0 }}><Box component="header" sx={{ height: 70, display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0", backgroundColor: "rgba(255,255,255,0.88)", px: { xs: 2, sm: 3, lg: 4 } }}><IconButton aria-label="Open navigation" onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, mr: 1 }}><MenuRounded /></IconButton><Typography variant="body2" fontWeight={700}>{context}</Typography><Box sx={{ flexGrow: 1 }} /><Box sx={{ px: 1.1, py: 0.45, border: "1px solid #e2e8f0", borderRadius: 1.5, backgroundColor: "#fff" }}><Typography variant="caption" color="text.secondary" fontWeight={700}>Phase 1</Typography></Box></Box><Box component="main" sx={{ maxWidth: 1240, mx: "auto", p: { xs: 2, sm: 3, lg: 4 } }}><Outlet /></Box></Box></Box>;
}

export default MainLayout;