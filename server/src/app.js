import cors from "cors";
import express from "express";
import healthRoutes from "./routes/healthRoutes.js";
import nodeRoutes from "./routes/nodeRoutes.js";

const app = express();

app.use(express.json());

// React and Node.js run on different origins during local development.
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/health", healthRoutes);
app.use("/api/node", nodeRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Node.js Learning Lab API",
  });
});

export default app;