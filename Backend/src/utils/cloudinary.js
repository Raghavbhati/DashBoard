const { v2: cloudinary } = require("cloudinary");
const fs = require("node:fs");
require("dotenv").config()

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const uploadOnCloudinary = async (localPath)=>{
    try {
        if(!localPath) return null
        const res = await cloudinary.uploader.upload(localPath,{
            resource_type : "auto",
        })
        console.log("uploaded on the cloudinary", res)
        return res;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localPath)
        console.log("Image Deleted") 
        return null
    }
}

module.exports = {uploadOnCloudinary}