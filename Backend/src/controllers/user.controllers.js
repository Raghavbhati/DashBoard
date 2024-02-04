const { UserModel } = require("../models/user.models");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { upload } = require("../middlewares/multer.middleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const registerUser = async (req, res) => {
  const {
    username,
    companyName,
    sellerName,
    email,
    phone,
    password,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    country,
    pincode,
  } = req.body;

  if (
    [
      username,
      companyName,
      sellerName,
      email,
      phone,
      password,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      country,
      pincode,
    ].some((each) => typeof each === "string" && each.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  } 

  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(
      409,
      "Account already existed with this username or email"
    );
  }

  const image = req.files?.logo[0]?.path;
  console.log(image)
  if (!image) {
    throw new ApiError(400, "Logo is required");
  }
  const imagepath = await uploadOnCloudinary(image);
  console.log(imagepath)
  if (!imagepath) {
    throw new ApiError(400, "Cloudinary Error: logo is required");
  }

  const user = {
    username: username.toLowerCase(),
    companyName,
    sellerName,
    email,
    phone,
    profile: imagepath.url,
    password,
    state,
    country,
    addressLineOne,
    addressLineTwo,
    city,
    pincode,
  };
  try {
    const createUser = await UserModel.create(user);

    const createdUser = await UserModel.findById(createUser._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Something Went Wrong while creating user");
    }
    res.status(201).json(new ApiResponse(200, createdUser, "User Created"));
  } catch (error) {
    res.send(error);
    console.log("ERROR", error);
  }
};

// const loginUser = AsyncHandler(async (req, res)=>{
//     return res.status(200).json({
//         message : "ok"
//     })
//     console.log("ok")
// })
const loginUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    throw new ApiError(502, error);
  }
};
module.exports = { registerUser, loginUser };
