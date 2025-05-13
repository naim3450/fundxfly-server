const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const { generateReferralCode } = require("../utils/generateReferralCode");


module.exports.registerUser = async function (req, res) {
    try {
        const { name, email, password, number, refferby } = req.body; // Destructure the request body to get user data
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) { // If the user already exists, send a 400 Bad Request response
            return res.status(400).json({ error: "User already exists" });
        }

        if (refferby) {
            const existingrefferby = await userModel.findOne({ refferCode: refferby });
            if (!existingrefferby) {
                res.status(400).json({ message: "Please enter a valid referral code" });
                return;
            }
        }


        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await userModel.create({
                    name,
                    email,
                    password: hash,
                    number,
                    refferCode: generateReferralCode(name),
                    refferby: refferby || null
                });

                const refferUser = await userModel.findOneAndUpdate(
                    { refferCode: refferby },
                    {
                        // $set: { refferIncome },
                        // $inc: { balance: 0.2, totalEarnings: 0.2, refferIncome: 0.2, },
                        $push: { refferUse: user._id },
                    },
                    { new: true }
                );

                const token = generateToken(user)
                // res.cookie('auth_token', token);
                res.status(201).json({
                    user,
                    message: 'User created successfully',
                    status: 'success',
                    token,
                    useRefferUser: { refferUser, message: "update reffer user" }
                }); // Send a 201 Created response with the user data
            })
        })
    }
    catch (error) {
        res.status(400).json({ error: error.message }); // Send a 400 Bad Request response with the error message
    }
}

module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body; // Destructure the request body to get user data
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) { // If the user does not exist, send a 400 Bad Request response
        return res.status(400).json({ message: "User does not exist", status: 400 });
    }
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) { // If the password is incorrect, send a 400 Bad Request response
        return res.status(400).json({ message: "Invalid password", status: 400 });
    }

    // Generate a token for the user
    const token = generateToken(existingUser);

    // Send a success response with the user data and token
    res.status(200).json({ user: existingUser, token }); // Send a 200 OK response with the user data and token
}

module.exports.getMe = async function (req, res) {
    try {
        if (!req.user || !req.user.email) {
            return res.status(400).json({ message: "Invalid user context" });
        }

        const user = await userModel.findOne({ email: req?.user?.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        // console.error("Error in getMe:", error);
        res.status(500).json({ message: error });
    }
};