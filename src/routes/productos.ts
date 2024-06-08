import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes= Router();

routes.get("", ProductosController.getAll)
routes.get("/getOne/:id", ProductosController.getOne)
routes.post("", ProductosController.create)


export default routes;

