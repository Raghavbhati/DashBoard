const express = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {authMiddleware} = require("../middlewares/auth.middleware");
const { registerUser, loginUser, logoutUser, updateToken, changePassword, getCurrentUser, deleteAccount} = require("../controllers/user.controllers");

const userRoute = express.Router();

userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)
userRoute.post("/refresh-token", updateToken)
userRoute.post("/logout",authMiddleware, logoutUser)
userRoute.post("/change-password", authMiddleware, changePassword);
userRoute.get("/get-user", authMiddleware, getCurrentUser);
userRoute.delete("/user-delete", authMiddleware, deleteAccount)

// userRoute.post("/register", upload.fields([{
//     name: "logo", 
//     maxCount : 1,
// }]), registerUser)

module.exports = {userRoute};
 