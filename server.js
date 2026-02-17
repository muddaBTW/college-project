import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "SafeDose API", timestamp: new Date().toISOString() });
});

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  const message = err?.message || "Unexpected server error";
  res.status(500).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`SafeDose server running on http://localhost:${PORT}`);
});
