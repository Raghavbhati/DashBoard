const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controllers");
const { upload } = require("../middlewares/multer.middleware");
const {authMiddleware} = require("../middlewares/auth.middleware")

const userRoute = express.Router();

userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)


// userRoute.post("/register", upload.fields([{
//     name: "logo", 
//     maxCount : 1,
// }]), registerUser)

module.exports = {userRoute};
