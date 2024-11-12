const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const sustainabilityRoute = require('./auth/sustainability');

const signupRoute = require('./auth/signup');
const loginRoute = require("./auth/login");
const profileRoute = require('./auth/profile');

const app = express();
const PORT = 8080;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
    
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/signup', signupRoute(db));
app.use('/login', loginRoute(db));
app.use('/profile', profileRoute(db));
app.use('/sustainability', sustainabilityRoute(db));

app.get("/", (req, res) => {
    res.send("Homepage");
});

app.get('/dashboard', async (req, res) => {
    try {
        const query = 'CALL get_company_dashboard_data();'; // Call the stored procedure
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'Failed to fetch data' });
            }

            // Return the results to the frontend
            res.json({ companies: results[0] }); // MySQL returns the result set in an array
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).send({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});