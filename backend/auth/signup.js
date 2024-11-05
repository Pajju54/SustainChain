const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (db) => {
    router.post('/', async (req, res) => {
        try {
            const { email, username, password } = req.body;
    
            db.query(
                'SELECT * FROM Login_Credentials WHERE ID = ?',
                [email],
                async (err, results) => {
                    if (err) {
                        console.error('Error checking user existence:', err);
                        return res.status(500).json({ error: "Database error while checking user existence" });
                    }
                    if (results.length > 0) {
                        return res.status(409).json({ message: "User already exists" });
                    }
    
                    const hashedPassword = await bcrypt.hash(password, 10);
    
                    db.query(
                        'INSERT INTO Login_Credentials (ID, Username, Password) VALUES (?, ?, ?)',
                        [email, username, hashedPassword],
                        (err) => {
                            if (err) {
                                console.error('Error inserting into Login_Credentials:', err);
                                return res.status(500).json({ error: "Database error during user creation" });
                            }
    
                            db.query(
                                'INSERT INTO Profile (ProfileID) VALUES (?)',
                                [email],
                                (err) => {
                                    if (err) {
                                        console.error('Error inserting into Profile:', err);
                                        return res.status(500).json({ error: "Database error while creating profile" });
                                    }
    
                                    const token = jwt.sign({ userId: email }, SECRET_KEY, { expiresIn: "1h" });
                                    res.cookie("token", token, {
                                        httpOnly: true,
                                        secure: process.env.NODE_ENV === "production",
                                        sameSite: "Strict",
                                        maxAge: 3600000
                                    });
    
                                    res.status(201).json({ message: "User signed up successfully", success: true });
                                }
                            );
                        }
                    );            
                }
            );            
        } catch (error) {
            console.error('Signup route error:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    

    return router;
};
