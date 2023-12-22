const mongoose = require("mongoose")

const connectDB = async() => {
    try {

        await mongoose.connect("")
        .then(console.log("MongoDB connected"))

    } catch(error){
        console.log(error.message)
    }
}

module.exports = connectDB