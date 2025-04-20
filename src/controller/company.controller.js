import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import companyModel from "../model/company.model.js";
const createCompany = asyncHandler(async (req, res) => {
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
  return apiResponse(res, 201, "Company created successfully", company);
});
//
const getCompanyById = asyncHandler(async (req, res) => {
  // logic here
  const { id } = req.params;
  const company = await companyModel.findById(id);
  if (!company) {
    throw new apiError("Company not found", 404);
  }
  return apiResponse(res, 200, null, company);
});

const getAllCompanies = asyncHandler(async (req, res) => {
  // logic here
  const companies = await companyModel.find();
  return apiResponse(res, 200, null, companies);
});

// get company which created by user
const getCompanyByUser = asyncHandler(async (req, res) => {
  const userId = req.user;  // From the JWT token attached by the middleware
  console.log("user id ",userId);

  const companies = await companyModel.find({ author: userId });

  if (companies.length === 0) {
    return res.status(404).json({ message: "No companies found for this user." });
  }
  return apiResponse(res, 200, null, companies);
});


const updateCompany = async (req, res) => {
  // logic here
};

const deleteCompany = async (req, res) => {
  // logic here
};

export {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  getCompanyByUser
}