import { useState } from "react";
import { AddRounded, PlayArrowRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import CodeBlock from "../components/common/CodeBlock.jsx";
import { CoreLesson, FlowCards } from "../components/common/CoreLesson.jsx";
import SectionCard from "../components/common/SectionCard.jsx";

function EventsLesson() {
  const learn = <Stack spacing={2}><SectionCard title="Event-driven architecture"><Typography color="text.secondary">Event-driven code reacts when something happens. Node.js uses the built-in <Box component="code">EventEmitter</Box> for in-process event handling: a producer emits a named event and registered listeners handle it.</Typography></SectionCard><SectionCard title="Listeners and events"><Typography color="text.secondary">Use <Box component="code">on</Box> to register a listener and <Box component="code">emit</Box> to trigger an event. <Box component="code">once</Box> handles a single occurrence. <Box component="code">off</Box> or <Box component="code">removeListener</Box> removes a listener. Several listeners can receive the same event.</Typography></SectionCard><SectionCard title="Scope"><Typography color="text.secondary">EventEmitter is in-process event handling, not a distributed message broker. It helps decouple local producers from local handlers.</Typography></SectionCard></Stack>;
  const code = <SectionCard title="Register and emit an event"><CodeBlock filename="events.js">{"import { EventEmitter } from \"node:events\";\n\nconst emitter = new EventEmitter();\n\nemitter.on(\"orderCreated\", (orderId) => {\n  console.log(`Order created: ${orderId}`);\n});\n\nemitter.emit(\"orderCreated\", 101);"}</CodeBlock></SectionCard>;
  return <CoreLesson lesson="11" title="Events / EventEmitter" subtitle="Learn how Node.js uses in-process events and listeners." learn={learn} code={code} tryIt={<EventExplorer />} flow={<FlowCards flows={[{ title: "Event flow", steps: ["Producer", "emit(event)", "EventEmitter", "Registered listener(s)", "Handler executes"] }]} />} />;
}

function EventExplorer() {
  const [listener, setListener] = useState(false);
  const [once, setOnce] = useState(false);
  const [events, setEvents] = useState([]);
  const emit = (kind) => {
    if ((kind === "standard" && listener) || (kind === "once" && once)) setEvents((current) => [...current, kind === "once" ? "Once listener executed" : "Listener executed for orderCreated"]);
    if (kind === "once") setOnce(false);
  };
  return <SectionCard title="EventEmitter Explorer" subtitle="Conceptual frontend simulation only."><Stack direction={{ xs: "column", sm: "row" }} spacing={1}><Button startIcon={<AddRounded />} variant="outlined" onClick={() => setListener(true)}>Register Listener</Button><Button variant="contained" startIcon={<PlayArrowRounded />} onClick={() => emit("standard")}>Emit Event</Button><Button variant="outlined" onClick={() => { setOnce(true); setEvents((current) => [...current, "Once listener registered"]); }}>Register Once</Button><Button variant="outlined" onClick={() => emit("once")}>Emit Once</Button><Button startIcon={<RestartAltRounded />} variant="text" onClick={() => { setListener(false); setOnce(false); setEvents([]); }}>Reset</Button></Stack><Box sx={{ mt: 2, p: 2, border: "1px solid #e2e8f0", borderRadius: 2, backgroundColor: "#f8fafc" }}><Typography variant="body2" color="text.secondary">{listener ? "Listener registered for orderCreated." : "No persistent listener registered."}</Typography>{events.map((event, index) => <Typography key={`${event}-${index}`} variant="body2" color="success.main" fontWeight={700} sx={{ mt: 0.75 }}>{event}</Typography>)}</Box></SectionCard>;
}

export default EventsLesson;