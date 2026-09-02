import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import BlockingVsNonBlocking from "../pages/BlockingVsNonBlocking.jsx";
import AsyncJavaScript from "../pages/AsyncJavaScript.jsx";
import EventLoop from "../pages/EventLoop.jsx";
import EventsLesson from "../pages/EventsLesson.jsx";
import ExpressFundamentals from "../pages/ExpressFundamentals.jsx";
import FileSystemLesson from "../pages/FileSystemLesson.jsx";
import HttpModuleLesson from "../pages/HttpModuleLesson.jsx";
import MiddlewareLesson from "../pages/MiddlewareLesson.jsx";
import MySqlConnection from "../pages/MySqlConnection.jsx";
import MySqlCrud from "../pages/MySqlCrud.jsx";
import MySqlQueries from "../pages/MySqlQueries.jsx";
import ModulesAndNpm from "../pages/ModulesAndNpm.jsx";
import NodeIntroduction from "../pages/NodeIntroduction.jsx";
import NodeRuntime from "../pages/NodeRuntime.jsx";
import OsProcessLesson from "../pages/OsProcessLesson.jsx";
import PathUrlLesson from "../pages/PathUrlLesson.jsx";
import RestCrud from "../pages/RestCrud.jsx";
import StreamsBuffersLesson from "../pages/StreamsBuffersLesson.jsx";
import RoutingControllers from "../pages/RoutingControllers.jsx";
import ServiceLayer from "../pages/ServiceLayer.jsx";
import ValidationErrors from "../pages/ValidationErrors.jsx";

function AppRoutes() {
  return <Routes><Route element={<MainLayout />}><Route index element={<Dashboard />} /><Route path="learn/node-introduction" element={<NodeIntroduction />} /><Route path="learn/node-runtime" element={<NodeRuntime />} /><Route path="learn/event-loop" element={<EventLoop />} /><Route path="learn/blocking-vs-non-blocking" element={<BlockingVsNonBlocking />} /><Route path="learn/modules-npm" element={<ModulesAndNpm />} /><Route path="learn/async-javascript" element={<AsyncJavaScript />} /><Route path="learn/file-system" element={<FileSystemLesson />} /><Route path="learn/path-url" element={<PathUrlLesson />} /><Route path="learn/os-process" element={<OsProcessLesson />} /><Route path="learn/events" element={<EventsLesson />} /><Route path="learn/streams-buffers" element={<StreamsBuffersLesson />} /><Route path="learn/http-module" element={<HttpModuleLesson />} /><Route path="learn/express-fundamentals" element={<ExpressFundamentals />} /><Route path="learn/routing-controllers" element={<RoutingControllers />} /><Route path="learn/middleware" element={<MiddlewareLesson />} /><Route path="learn/rest-crud" element={<RestCrud />} /><Route path="learn/validation-errors" element={<ValidationErrors />} /><Route path="learn/mysql-connection" element={<MySqlConnection />} /><Route path="learn/mysql-queries" element={<MySqlQueries />} /><Route path="learn/service-layer" element={<ServiceLayer />} /><Route path="learn/mysql-crud" element={<MySqlCrud />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}

export default AppRoutes;