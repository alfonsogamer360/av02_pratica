import express from "express";
import { routerJogo } from "./routes/jogo.routes.js";

const app = express()
const port = 3000

app.use(express.json())
app.use("/jogo", routerJogo)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
})