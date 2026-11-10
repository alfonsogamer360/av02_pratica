import { Router } from "express";
import { controllerJogo } from "../controllers/jogo.controller.js";

export const routerJogo = Router()


routerJogo.get("/", controllerJogo.getAll)
routerJogo.get("/:id", controllerJogo.getById)
routerJogo.post("/", controllerJogo.create)
routerJogo.patch("/:id", controllerJogo.patchKnex)
routerJogo.delete("/:id", controllerJogo.delete)