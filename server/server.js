require("dotenv").config();
const express = require("express");
const next = require("next");
const connectDB = require("./database");
const todoRoutes = require("./routes/todos");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json()); // JSON 요청 파싱
  server.use("/api/todos", todoRoutes); // todo API 연결

  connectDB(); // mongoDB연결

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
