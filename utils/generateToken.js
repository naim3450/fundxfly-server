const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const { email, _id } = user
    return jwt.sign({ email, userId: _id }, process.env.JWT_KEY)
}

module.exports.generateToken = generateToken;