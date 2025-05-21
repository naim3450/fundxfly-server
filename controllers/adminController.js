const { request } = require("express");
const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const withdrawModel = require("../models/withdrawModel");
const monetagModule = require("../models/monetagModule");
const messageModule = require("../models/messageModule");

module.exports.deleteUser = async function (req, res) {
    const { email } = req.body; // e.g., { email: "new@example.com" }
    try {
        const deleteUser = await userModel.deleteOne({ email });
        res.status(200).json({
            message: "User deleted successfully",
            user: deleteUser,
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.approvePlanRequest = async function (req, res) {
    const { email, status, expiry } = req.body; // e.g., { email: "new@example.com" }
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            {
                $set: { status, expiry: expiry || null, addsIndex: [], count: 0, },
            },
            { new: true }
        );
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

module.exports.updateZoonId = async function (req, res) {
    const { type, zoonId } = req.body;
    try {
        if (!zoonId) {
            return res.status(400).json({ message: 'zoonId is required' });
        }

        const zId = await monetagModule.findOneAndUpdate(
            { type },                 // filter
            { $set: { type, zoonId } },       // update fields
            { new: true, upsert: true }, // return new doc, create if not exists
        );
        res.status(200).json({ message: "update zoon id successfully", zId });
    } catch (err) {
        res.status(400).send(err.message);
    };
}

module.exports.getZoonIdAndMessage = async function (req, res) {
    try {
        const zm = await monetagModule.find();
        if (zm.length == 0) {
            return res.status(400).json({ message: 'empty data' });
        }
        res.status(200).json({ message: "get data successfully", zm });

    } catch (err) {
        res.status(400).send(err.message);
    };
}

module.exports.createMessage = async function (req, res) {
    const { type, title, message } = req.body;
    try {
        const ms = await messageModule.findOneAndUpdate(
            { type },                 // filter
            { $set: { title, message, createdAt: Date.now(), } },       // update fields
            { new: true, upsert: true }, // return new doc, create if not exists
        );
        if (ms.length == 0) {
            return res.status(400).json({ message: 'empty message' });
        }
        res.status(200).json({ message: "update message successfully", data: ms });
    } catch (err) {
        res.status(400).send(err.message);
    };
}

module.exports.getMessage = async function (req, res) {
    try {
        const data = await messageModule.find();
        if (data.length == 0) {
            return res.status(400).json({ message: 'empty data' });
        }
        res.status(200).json({ message: "get data successfully", data });

    } catch (err) {
        res.status(400).send(err.message);
    };
}