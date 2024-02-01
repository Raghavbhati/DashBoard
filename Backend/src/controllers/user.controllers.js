const { UserModel } = require("../models/user.models");

const registerUser = async (req, res)=>{
    const {username,companyName, sellerName, email, phone, password, addressLineOne, addressLineTwo, city, state, country, pincode} = req.body;
    const user = {
        username,
        companyName,
        sellerName,
        email,
        phone,
        password,
        state,
        country,
        addressLineOne,
        addressLineTwo,
        city,
        pincode
    } 
    try {
        await UserModel.create(user); 
        res.send({stauts:"user created"});
    } catch (error) {
        res.send(error)
        console.log("ERROR", error)
    }
}
module.exports = {registerUser}