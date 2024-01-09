const mongoose = require("mongoose");

const connection = async ()=>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/wood-fans`);
        console.log(`Connect with database, ${connect.connection.host}` )
    } catch (error) {
        console.log("Unable To Connect With MongoDB", error);
    }
}
module.exports = {connection};