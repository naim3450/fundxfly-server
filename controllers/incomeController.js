const addressModule = require("../models/addressModule");
const incomePlanModel = require("../models/incomePlanModel");

module.exports.getIncomeDetails = async (req, res) => {
    try {
        const incomeDetails = await incomePlanModel.find(req.query)
        if (incomeDetails.length === 0) {
            return res.status(404).json({ message: 'Your income details are still unset.' });
        }
        res.status(200).json({
            message: 'Income details fetched successfully',
            data: incomeDetails
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.updateIncomeDetails = async (req, res) => {
    const { status, adds, income, refferIncome, investAmount } = req.body;
    try {
        const obj = {
            status, adds: Number(adds),
            income: Number(income),
            refferIncome: Number(refferIncome),
            investAmount: Number(investAmount)
        };

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const updatedIncome = await incomePlanModel.findOneAndUpdate(
            { status },                 // filter
            { $set: obj },       // update fields
            { new: true, upsert: true }, // return new doc, create if not exists
        );

        res.status(200).json({
            message: 'Income plan updated successfully',
            data: updatedIncome
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.setAddress = async (req, res) => {
    const { address, type } = req.body;
    try {
        const addBNinfo = await addressModule.findOneAndUpdate(
            { type },                 // filter
            { $set: { address, type } },       // update fields
            { new: true, upsert: true }, // return new doc, create if not exists
        );
        res.status(200).json({
            message: 'Binace Info updated successfully',
            data: addBNinfo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

module.exports.getAddress = async (req, res) => {
    try {
        const data = await addressModule.find()
        if (!data) {
            return res.status(404).json({ message: 'Your address still unset.' });
        }
        res.status(200).json({
            message: 'successfully',
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};