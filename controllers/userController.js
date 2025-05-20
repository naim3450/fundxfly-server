const { userDataUpdate } = require("../hooks/user-data-update");
const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const withdrawModel = require("../models/withdrawModel");

module.exports.getUsers = async function (req, res) {
    const query = {};

    if (req.query.name) {
        // Regex to match names that start with the given letter (case-insensitive)
        query.name = { $regex: '^' + req.query.name, $options: 'i' };
    }

    try {
        const user = await userModel.find(query);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.planRequest = async function (req, res) {
    const { planName, planPrice, paymentNumber, paymentType, validity, userId, userEmail } = req.body; // Destructure the request body to get user data
    const existingRequest = await requestModel.findOne({ userEmail });
    if (existingRequest) {
        return res.status(400).json({ message: 'Request already exists for this user' });
    }
    try {
        const request = await requestModel.create({
            planName,
            planPrice,
            validity,
            paymentNumber,
            paymentType,
            userId,
            userEmail,
        });
        res.status(201).json({ message: 'Request created successfully', data: request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getPlanRequest = async function (req, res) {
    try {
        const getPlanRequest = await requestModel.find();
        res.status(200).json(getPlanRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.withdrawRequest = async function (req, res) {
    const { userId, userEmail, number, amount, type, } = req.body; // Destructure the request body to get user data

    if (amount < 2) {
        return res.status(400).json({ message: 'Amount must be $ 2' });
    }

    const existingRequest = await withdrawModel.findOne({ userEmail });
    if (existingRequest) {
        return res.status(400).json({ message: 'A withdrawal request is already pending.' });
    }
    try {
        const request = await withdrawModel.create({
            userId,
            userEmail,
            number,
            amount,
            type,
        });
        res.status(201).json({ message: 'Withdraw request send successfully', data: request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getWithdrawRequest = async function (req, res) {
    try {
        const getWithdrawRequest = await withdrawModel.find();
        res.status(200).json(getWithdrawRequest);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateMyBalance = async function (req, res) {
    const { email, count, countDate, balance } = req.body; // e.g., { email: "new@example.com" }    
    const data = await userDataUpdate(email, { count: Number(count), countDate, balance: Number(balance) }, "User data updated successfully");
    if (data.status === 404) {
        res.status(404).json({ message: data.message });
        return;
    }
    if (data.status === 200) {
        res.status(200).json({ message: data.message, user: data.user, });
        return;
    }
    if (data.status === 400) {
        res.status(400).send(data.message);
        return;
    }
}

module.exports.updateTotalEarnings = async function (req, res) {
    const { email, totalEarnings } = req.body; // e.g., { email: "new@example.com" }    
    const data = await userDataUpdate(email, { totalEarnings: Number(totalEarnings) }, "User data updated successfully");
    if (data.status === 404) {
        res.status(404).json({ message: data.message });
        return;
    }
    if (data.status === 200) {
        res.status(200).json({ message: data.message, user: data.user, });
        return;
    }
    if (data.status === 400) {
        res.status(400).send(data.message);
        return;
    }
}

module.exports.updateAddsIndex = async function (req, res) {
    try {
        const { email, addsIndex, } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Reset addsIndex if not provided or empty
        if (!addsIndex) {
            const updatedUser = await userModel.findOneAndUpdate(
                { email },
                { $set: { addsIndex: [] } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: 'Adds index reset successfully',
                user: updatedUser,
            });
        }

        // Append to addsIndex
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $push: { addsIndex } },
            // { $set: { balance, countDate } },
            { new: true }
        );


        // const updatedUser = await userModel.findOneAndUpdate(
        //     { email },
        //     {
        //         $push: { addsIndex },
        //         $set: { countDate, balance }
        //     },
        //     { new: true }
        // );


        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: 'Adds index updated successfully',
            user: updatedUser,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.refferalLableIncome = async (req, res) => {
    const { email, lable1, lable2, lable3 } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user?.refferby) {
            const res2 = await userModel.findOneAndUpdate(
                { refferCode: user?.refferby },
                {
                    $inc: { balance: lable1, totalEarnings: lable1, refferIncome: lable1, },
                },
                { new: true }
            )
            if (res2?.refferby) {
                const res3 = await userModel.findOneAndUpdate(
                    { refferCode: res2?.refferby },
                    {
                        $inc: { balance: lable2, totalEarnings: lable2, refferIncome: lable2, },
                    },
                    { new: true }
                )
                if (res3?.refferby) {
                    const final = await userModel.findOneAndUpdate(
                        { refferCode: res3?.refferby },
                        {
                            $inc: { balance: lable3, totalEarnings: lable3, refferIncome: lable3, },
                        },
                        { new: true }
                    )
                    res.status(201).json({ message: "Label 3 user income update", final });
                }
            }
        }

    } catch (error) {

    }
}