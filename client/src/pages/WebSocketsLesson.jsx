import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { AdvancedFlow, AdvancedLesson } from "../components/common/AdvancedLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

function WebSocketsLesson() {
  const learn = <Stack spacing={2}><SectionCard title="HTTP and WebSocket connections"><Typography color="text.secondary">HTTP usually follows client request then server response. A WebSocket is a persistent bidirectional connection where both client and server can send messages. It fits chat, notifications, live dashboards, and collaboration.</Typography></SectionCard><SectionCard title="Not a REST replacement"><Typography color="text.secondary">WebSockets and REST solve different communication needs. WebSockets differ from HTTP polling because the persistent connection can carry server-initiated messages. A server implementation still needs protocol, security, and lifecycle design.</Typography></SectionCard></Stack>;
  const code = <Stack spacing={2}><SectionCard title="Browser WebSocket API"><CodeBlock filename="client.js">{"const socket = new WebSocket(\"ws://localhost:5000\");\n\nsocket.addEventListener(\"message\", (event) => {\n  console.log(event.data);\n});"}</CodeBlock><Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>This is browser client code. A Node.js server needs a separate WebSocket implementation.</Typography></SectionCard></Stack>;
  return <AdvancedLesson lesson="30" title="WebSockets & Real-Time" subtitle="Learn how persistent bidirectional connections support real-time communication." learn={learn} code={code} tryIt={<RealtimeSimulator />} flow={<AdvancedFlow title="Real-time flow" steps={["Client", "WebSocket connection", "Server", "Event or data source", "Client"]} />} />;
}

function RealtimeSimulator() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const send = () => connected && setMessages((current) => [...current, "Client sends: Hello", "Server event: Message received", "Client receives: Acknowledged"]);
  return <SectionCard title="Conceptual Real-Time Message Simulator" subtitle="Frontend simulation only; no WebSocket server is connected."><Stack direction={{ xs: "column", sm: "row" }} spacing={1}><Button variant="contained" onClick={() => setConnected(true)} disabled={connected}>Connect</Button><Button variant="outlined" onClick={send} disabled={!connected}>Send Message</Button><Button variant="outlined" onClick={() => { setConnected(false); setMessages([]); }} disabled={!connected}>Disconnect</Button></Stack><Box sx={{ mt: 2, p: 2, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><StatusBadge label={connected ? "Connected" : "Disconnected"} status={connected ? "success" : "neutral"} />{messages.map((message, index) => <Typography key={`${message}-${index}`} variant="body2" sx={{ mt: 0.75 }}>{message}</Typography>)}</Box></SectionCard>;
}

export default WebSocketsLesson;