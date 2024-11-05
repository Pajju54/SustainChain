const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (db) => {
    router.post('/', async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log("Attempting login with email:", email);

            db.query(
                'SELECT * FROM Login_Credentials WHERE ID = ?',
                [email],
                async (err, results) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }

                    if (results.length === 0) {
                        console.log("No user found with email:", email);
                        return res.status(401).json({ message: "Incorrect email or password" });
                    }

                    const user = results[0];

                    // Log the retrieved user data
                    console.log("User data retrieved:", user);

                    // Corrected line to check password
                    const isMatch = await bcrypt.compare(password, user.Password);
                    if (!isMatch) {
                        console.log("Password mismatch for user:", email);
                        return res.status(401).json({ message: "Incorrect email or password" });
                    }

                    const token = jwt.sign({ userId: user.ID }, SECRET_KEY, { expiresIn: "1h" });
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "Strict",
                        maxAge: 3600000
                    });

                    console.log("User logged in successfully:", email);
                    res.status(200).json({ message: "User logged in successfully", success: true });
                }
            );
        } catch (error) {
            console.error("Internal server error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    return router;
};
