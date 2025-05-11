const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        /*
        await mongoose.connect("mongodb+srv://saim-db:71pKzEB8MhaAQHvH@earnindb.fo7qvfl.mongodb.net/earnindb?retryWrites=true&w=majority&appName=earnindb", { //process.env.MONGO_URI,
            useNewUrlParser: true, // not needed anymore for node js driver version 4.0 and above
            useUnifiedTopology: true, // not needed anymore for node js driver version 4.0 and above
        });
        */

        await mongoose.connect(url);

        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;