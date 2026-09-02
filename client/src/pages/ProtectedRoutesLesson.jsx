import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AuthFlow, AuthLesson } from "../components/common/AuthLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

function ProtectedRoutesLesson() {
  const learn = <Stack spacing={2}><SectionCard title="Two different protections"><Typography color="text.secondary">Frontend route protection improves user experience by guiding navigation. It is not a security boundary. The backend must enforce protected API access through authentication and authorization checks.</Typography></SectionCard><SectionCard title="401 versus 403"><Typography color="text.secondary"><strong>401</strong> means authentication is missing or invalid. <strong>403</strong> means the user is authenticated but not permitted to perform an action.</Typography></SectionCard><SectionCard title="Secure request habits"><Typography color="text.secondary">Use HTTPS in production, validate input, avoid sensitive JWT payloads, and return safe errors. CORS controls browser origin access; it does not authenticate API callers.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Protected request concept"><Box component="pre" sx={{ m: 0, p: 2, borderRadius: 2, color: "#e2e8f0", backgroundColor: "#0f172a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{"React\n  → token\n  → Authorization header\n  → Express auth middleware\n  → protected controller"}</Box></SectionCard>;
  return <AuthLesson lesson="26" title="Protected React & APIs" subtitle="Learn how frontend route UX and backend API security work together." learn={learn} code={code} tryIt={<ProtectedExplorer />} flow={<AuthFlow title="Protected API flow" steps={["React", "Token", "Authorization header", "Express auth middleware", "Protected controller", "Response"]} />} />;
}

function ProtectedExplorer() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [result, setResult] = useState(null);
  const request = () => setResult(loggedIn ? { text: "Protected data returned", status: "success" } : { text: "401 Authentication required", status: "error" });
  return <SectionCard title="Conceptual Login and Protected Request" subtitle="No credentials or real tokens are stored."><Stack direction={{ xs: "column", sm: "row" }} spacing={1}><Button variant="contained" onClick={() => { setLoggedIn(true); setResult({ text: "Example token received", status: "success" }); }}>Login</Button><Button variant="outlined" onClick={() => { setLoggedIn(false); setResult({ text: "Logged out", status: "neutral" }); }}>Logout</Button><Button variant="outlined" onClick={request}>Protected Request</Button></Stack><Box sx={{ mt: 2, p: 2, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="body2">{loggedIn ? "Conceptual token available for a protected request." : "No conceptual token is available."}</Typography>{result && <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}><StatusBadge label={result.text} status={result.status} /></Stack>}</Box></SectionCard>;
}

export default ProtectedRoutesLesson;