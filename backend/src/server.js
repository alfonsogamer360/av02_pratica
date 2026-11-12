
import express from "express";
import { routerJogo } from "./routes/jogo.routes.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://av02pratica.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/jogos", routerJogo);

app.get("/api", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

export default app;
