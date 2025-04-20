import { Router } from "express";
import contact from "../controller/contact.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const contacRouter = Router();
contacRouter.post("/send-message", authenticate, contact);
export default contacRouter;
