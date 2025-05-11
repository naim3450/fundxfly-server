const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isLoggedin = async function (req, res, next) {    
    const auth_token = req?.headers?.authorization;

    if (!auth_token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        let decoded = jwt.verify(auth_token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");
        req.user = user;
        next()
    } catch (err) {
        return res.status(401).json({ message: err.message });
        // res.redirect('/')
    }
}