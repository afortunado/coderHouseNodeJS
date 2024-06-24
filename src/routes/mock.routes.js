 import { Router } from "express";
import { createProducts } from "../../mocks/mock.controller.js";

const mockRouter = Router();
mockRouter.get("/", createProducts);

export default mockRouter;