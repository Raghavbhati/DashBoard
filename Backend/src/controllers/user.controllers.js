const { UserModel } = require("../models/user.models");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { upload } = require("../middlewares/multer.middleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Unable to create token at this moment");
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    throw new ApiError(400, "Username is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  if (!email) {
    throw new ApiError(400, "Email is required");
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
  const user = {
    username: username.toLowerCase(),
    email,
    password,
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
    console.log("ERROR", error);
  }
};

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new ApiError(406, "Either Email or Username is required");
  }
  if (!password) {
    throw new ApiError(406, "Password is required");
  }
  const user = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(404, "User Not Fount");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(email, password);
  if (!isPasswordCorrect) {
    throw new ApiError(404, "Incorrect user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );
  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User Logged In Sucessfully"
        )
      );
  } catch (error) {
    throw new ApiError(502, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User Logged Out"));
  } catch (error) {
    throw new ApiError(500, "Unable to logout");
  }
};

const updateToken = async (req, res) => {
  const IncomingrefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!IncomingrefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decode = jwt.verify(
      IncomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRECT
    );
    const user = await UserModel.findById(decode?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (IncomingrefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Refreshtoken updated"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    throw new ApiError(406, "old Password is required");
  }
  if (!newPassword) {
    throw new ApiError(406, "new Password is required");
  }

  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      throw new ApiError(402, "User not found");
    }
    const passwordChecking = await user.isPasswordCorrect(user.email, oldPassword);
    if(!passwordChecking){
      throw new ApiError(401, "Old password is incorrect")
    }
    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res.status(200).json(new ApiResponse(200, {}, "Password is updated"))
  } catch (error) {
    throw new ApiError(400, "Something went wrong while updating the password")
  }
};

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, req.user, "User Details Fetched"));
  } catch (error) {
    throw new ApiError(401, "Unable to fetch user details")
  }
};

const deleteAccount = async (req, res)=>{
  const user = req.user;
  try {
    const deleted = await UserModel.findByIdAndDelete(user._id);
    console.log(deleted)
    res.status(200).json(new ApiResponse(200, {}, "Account deleted"))
  } catch (error) {
    throw new ApiError(400, "Unable to delete the account at this moment")
  }
}

//unfinsihed
const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

const updateImage = async (req, res) => {
  try {
  } catch (error) {}
}; 

// const updateProfile = async (req, res) => {
//   try {
//     const image = req.files?.logo[0]?.path || "";
//     console.log(image);
//     if (!image) {
//       throw new ApiError(400, "Logo is required");
//     }
//     const imagepath = await uploadOnCloudinary(image);
//     console.log(imagepath);
//     if (!imagepath) {
//       throw new ApiError(400, "Cloudinary Error: logo is required");
//     }
//   } catch (error) {
//     throw new ApiError(502, error);
//     res.send(error)
//   }
// };

module.exports = { registerUser, loginUser, logoutUser, updateToken , changePassword, getCurrentUser, deleteAccount};
