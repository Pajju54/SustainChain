const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
        console.log("Cookies: ", req.cookies);
        const token = req.cookies ? req.cookies.token : null;
        console.log(`token is ${token}`);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const userId = decoded.userId;
            console.log(`UserId is ${userId}`);

            db.query(
                'SELECT * FROM Login_Credentials WHERE ID = ?',
                [userId],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: "Database error" });
                    }

                    if (results.length === 0) {
                        return res.status(404).json({ message: "No user data found" });
                    }

                    const user = results[0];

                    db.query(
                        'SELECT * FROM Profile WHERE ProfileID = ?',
                        [userId],
                        (err, profileResults) => {
                            if (err) {
                                return res.status(500).json({ error: "Database error" });
                            }

                            const profile = profileResults.length > 0 ? profileResults[0] : null;
                            console.log(`Profile is ${JSON.stringify(profile)}`);
                            res.status(200).json({ user, profile });
                        }
                    );
                }
            );
        });
    });

    router.put('/update', (req, res) => {
        const token = req.cookies ? req.cookies.token : null;
        console.log("Received update request", req.body);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const userId = decoded.userId;
            console.log(`UserId is ${userId}`);

            // Destructure the data from the request body
            const {
                About,
                Street,
                City,
                Pincode,
                DOB,
                CompanyName,
                PhoneNumber,
                Certifications,
                ProfileID,
                Products,
            } = req.body;

            console.log(req.body);

            // Prepare the query to update the profile table
            const query = `
            UPDATE Profile SET
                About = ?,
                Street = ?,
                City = ?,
                Pincode = ?,
                DOB = ?,
                CompanyName = ?,
                PhoneNumber = ?,
                Certifications = ?,
                Products = ?
            WHERE ProfileID = ?;
`;

            // Run the query with values
            db.query(
                query,
                [
                    About,
                    Street,
                    City,
                    Pincode,
                    DOB,
                    CompanyName,
                    PhoneNumber,
                    Certifications,
                    Products,
                    ProfileID,
                ],
                (err, results) => {
                    if (err) {
                        console.error("Error updating profile:", err);
                        return res.status(500).json({ error: "Database error" });
                    }

                    if (results.affectedRows === 0) {
                        return res.status(404).json({ message: "Profile not found" });
                    }

                    console.log("Profile updated successfully");
                    res.status(200).json({ message: "Profile updated successfully" });
                }
            );
        });
    });



    return router;
};