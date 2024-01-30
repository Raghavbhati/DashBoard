const mongoose = require("mongoose");
const {dashboard} = require("../constants")
const connection = async ()=>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${dashboard}`);
        console.log(`Connect with database, ${connect.connection.host}` )
    } catch (error) {
        console.log("Unable To Connect With MongoDB", error);
    }
}
module.exports = {connection};