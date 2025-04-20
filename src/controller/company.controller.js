import apiError from "../utils/apiError.js";
import userModel from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import companyModel from "../model/company.model.js";
export const createCompany = asyncHandler(async (req, res) => {
  // logic here
  const { name } = req.body;
  if (!name) {
    throw new apiError("All fields are required", 400);
  }
  const user = req.user;
  console.log("User in Company", user);
  const userInDB = await userModel.findById({ _id: user });
  console.log("User in DB ", userInDB);
  if (!userInDB) {
    throw new apiError("User not found", 404);
  }

  if (userInDB.role !== "recruiter") {
    throw new apiError("You are not a recruiter", 403);
  }
  const company = await companyModel.create({
    name,
    author: user,
  });
  return apiResponse(res, 201, "Company created successfully",company);
});
//
export const getCompanyById = async (req, res) => {
  // logic here
};

export const getAllCompanies = async (req, res) => {
  // logic here
};

export const updateCompany = async (req, res) => {
  // logic here
};

const deleteCompany = async (req, res) => {
  // logic here
};
