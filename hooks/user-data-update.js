const userModel = require("../models/userModel");

module.exports.userDataUpdate = async function (email, updateObj, message) {
    try {
        const updatedUser = await userModel.findOneAndUpdate({ email }, updateObj, { new: true });        
        if (!updatedUser) {
            return { status: 404, message: "User not found" };
        }
        return {
            status: 200,
            message: message,
            user: updatedUser,
        };
    } catch (error) {
        return { status: 400, message: error.message };
    }
}
