const express = require('express');
const app = express();
const connectDB = require('./db/connect'); // Import the database connection module
const port = process.env.PORT || 3000;
require('dotenv').config(); // Load environment variables from .env file
const cookieParser = require('cookie-parser')
const cors = require('cors'); // Import CORS middleware

app.use(cors({
    origin: [
        "http://localhost:3001",
        "https://fundxfly.com",
        "https://admin.fundxfly.com",
        "https://testpart.fundxfly.com",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ], // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // Middleware to parse cookies

// Basic route
app.get('/', (req, res) => {
    res.send('The server is up and running.');
});

// Importing routes
const userRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const incomeRouter = require('./routes/incomeRouter');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/income-details', incomeRouter);

// Start the server
const start = async () => {
    try {
        connectDB(process.env.MONGO_URI); // Connect to the database
        // Start the server after connecting to the database
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);

    }
};

start();
