import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express"
import {swaggerOptions} from "../config/swagger.js"

const apidocsRoute = new Router();
const specs = swaggerJSDoc(swaggerOptions);

apidocsRoute.get("/", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

export default apidocsRoute;