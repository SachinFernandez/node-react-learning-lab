import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import NodeIntroduction from "../pages/NodeIntroduction.jsx";
import NodeRuntime from "../pages/NodeRuntime.jsx";

function AppRoutes() {
  return <Routes><Route element={<MainLayout />}><Route index element={<Dashboard />} /><Route path="learn/node-introduction" element={<NodeIntroduction />} /><Route path="learn/node-runtime" element={<NodeRuntime />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}

export default AppRoutes;