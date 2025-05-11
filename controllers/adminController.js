const { request } = require("express");
const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const withdrawModel = require("../models/withdrawModel");

module.exports.approvePlanRequest = async function (req, res) {
    const { email, status } = req.body; // e.g., { email: "new@example.com" }
    try {
        const updatedUser = await userModel.findOneAndUpdate({ email }, { status }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedItem = await requestModel.deleteOne({ userEmail: email });
        res.status(200).json({
            message: "Plan request approved", user: updatedUser, requestWas: deletedItem
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.deletePlanRequest = async function (req, res) {
    const { email } = req.body;
    try {
        const deletedItem = await requestModel.deleteOne({ userEmail: email });
        res.status(200).json({
            message: "Plan request deleted", requestWas: deletedItem
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.approveWithdrawRequest = async function (req, res) {
    const { email, amount } = req.body; // e.g., { email: "new@example.com" }
    const user = await userModel.findOne({ email });

    try {
        const updatedUser = await userModel.findOneAndUpdate({ email }, { balance: user.balance - amount }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedItem = await withdrawModel.deleteOne({ userEmail: email });
        res.status(200).json({
            message: "Withdraw request approved", user: updatedUser, requestWas: deletedItem
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.deleteWithdrawRequest = async function (req, res) {
    const { email } = req.body;
    try {
        const deletedItem = await withdrawModel.deleteOne({ userEmail: email });
        res.status(200).json({
            message: "Withdraw request deleted",
            requestWas: deletedItem,
        });
    } catch (err) {
        res.status(400).send(err.message);
    };
}