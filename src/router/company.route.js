import { Router } from "express";
import {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompany,
} from "../controller/company.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
const companyRouter = Router();

// Routes
companyRouter.post("/",authenticate,createCompany);
companyRouter.get("/companies", getAllCompanies); // list all companies
companyRouter.get("/:id", getCompanyById); // get single company by id
companyRouter.patch("/update/:id", updateCompany);
// companyRouter.delete("/delete/:id", deleteCompany);

export default companyRouter;
