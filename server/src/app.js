import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Node.js Learning Lab API",
  });
});

export default app;