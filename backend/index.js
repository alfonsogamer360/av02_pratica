
import express from "express";
import cors from "cors";
import { routerJogo } from "./src/routes/jogo.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://av02pratica.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/jogos", routerJogo);

app.get("/api", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

export default app;
