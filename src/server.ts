import express from "express";
import toolRouter from "./router"

const app = express();
app.use(express.json());

app.use("/", toolRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 MCP-lite server running at http://localhost:${PORT}`);
});



