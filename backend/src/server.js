import express from "express";
import { routerJogo } from "./routes/jogo.routes.js";
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/jogos", routerJogo)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
})