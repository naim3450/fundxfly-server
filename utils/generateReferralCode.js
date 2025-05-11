function generateReferralCode(user) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
        referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return user.replace(/\s/g, "").toUpperCase() + referralCode;
}

// Example usage


module.exports.generateReferralCode = generateReferralCode; // Export the function for use in other files