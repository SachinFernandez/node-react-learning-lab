import { useEffect, useState } from "react";
import { ArrowForwardRounded, ReplayRounded } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getHealth } from "../api/healthApi.js";
import PageHeader from "../components/common/PageHeader.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";

const learningSteps = [["01", "Learn", "Understand the concept."], ["02", "Code", "Inspect the implementation."], ["03", "Try It", "Run the example yourself."], ["04", "Flow", "See what happens internally."]];

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);
  const openLesson = () => navigate("/learn/node-introduction");
  const checkBackendHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getHealth();
      setHealthData(data);
    } catch {
      setHealthData(null);
      setError("Make sure the Node.js server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const status = loading ? { label: "Checking...", type: "warning", message: "Checking connection to the Node.js backend." } : error ? { label: "Disconnected", type: "error", message: "Unable to connect to the Node.js backend." } : { label: "Connected", type: "success", message: healthData.message };

  return <Stack spacing={{ xs: 3, md: 4 }}><PageHeader eyebrow="OVERVIEW" title="Node.js Learning Lab" subtitle="Learn Node.js through interactive full-stack examples." /><SectionCard><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2.5}><Box><Typography variant="h2">Learn by building</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: 620 }}>Explore Node.js concepts, inspect real backend code, run examples, and understand how each request flows through the application.</Typography></Box><Button variant="contained" endIcon={<ArrowForwardRounded />} onClick={openLesson}>Start Learning</Button></Stack></SectionCard><Box><Typography component="h2" variant="h2" sx={{ mb: 2 }}>How you&apos;ll learn</Typography><Grid container spacing={1.5}>{learningSteps.map(([number, title, description]) => <Grid key={number} size={{ xs: 12, sm: 6, lg: 3 }}><SectionCard><Typography color="primary.main" fontWeight={750} variant="body2">{number}</Typography><Typography variant="h3" sx={{ mt: 2 }}>{title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography></SectionCard></Grid>)}</Grid></Box><Grid container spacing={2}><Grid size={{ xs: 12, md: 7 }}><SectionCard title="Continue Learning" subtitle="Lesson 1" action={<Button size="small" variant="outlined" onClick={openLesson}>Start Lesson</Button>}><Typography variant="h3">Node.js Introduction</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Understand what Node.js is and how JavaScript runs outside the browser.</Typography><Typography variant="caption" color="primary.main" fontWeight={700} sx={{ display: "block", mt: 2 }}>FOUNDATIONS</Typography></SectionCard></Grid><Grid size={{ xs: 12, md: 5 }}><SectionCard title="Backend Environment" action={!loading && <Button size="small" variant="text" startIcon={<ReplayRounded />} onClick={checkBackendHealth}>Retry</Button>}><Stack spacing={1.25}><Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}><Typography variant="body2" color="text.secondary">{status.message}</Typography><StatusBadge label={status.label} status={status.type} /></Stack>{healthData && <Typography variant="caption" color="text.secondary">API Status: {healthData.status}</Typography>}{error && <Typography variant="caption" color="error.main">{error}</Typography>}<Typography variant="caption" color="text.secondary">Frontend: localhost:5173 &nbsp; Backend: localhost:5000</Typography></Stack></SectionCard></Grid></Grid></Stack>;
}

export default Dashboard;