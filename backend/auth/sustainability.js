const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // for generating unique IDs

module.exports = (db) => {
    router.post('/calculate-score', async (req, res) => {
        // console.log("Request body received:", req.body);
        // Destructure the individual values directly from the request body
        const {
            email,
            EnergyUsage,
            WaterConsumption,
            WasteGeneration,
            RecyclingRate,
            LaborCompliance,
            WorkerSafety,
            CommunityImpact,
            SupplierEthics,
            TransportationEmissions,
            MaterialSourcing
        } = req.body;

        console.log('hsd');
        console.log("Request Body", req.body);

        db.query(
            'SELECT * FROM login_credentials WHERE ID= ?',
            [email],
            (err, results) => {
                if (err) {
                    console.error("Error checking manufacturer:", err);
                    return res.status(500).json({ success: false, error: "Error checking manufacturer" });
                }
                if (results.length === 0) {
                    return res.status(400).json({ success: false, error: "Manufacturer does not exist" });
                }
                console.log("inside 1");

                // Manufacturer exists, proceed with calculating the scores
                const calculateEnvironmentalScore = (energyUsage, waterConsumption, wasteGeneration, recyclingRate) => (
                    energyUsage * 0.3 + waterConsumption * 0.3 + wasteGeneration * 0.2 + recyclingRate * 0.2
                );

                const calculateSocialScore = (laborCompliance, workerSafety, communityImpact) => (
                    laborCompliance * 0.4 + workerSafety * 0.4 + communityImpact * 0.2
                );

                const calculateSupplyChainScore = (supplierEthics, transportationEmissions, materialSourcing) => (
                    supplierEthics * 0.4 + transportationEmissions * 0.3 + materialSourcing * 0.3
                );


                // Calculate the final scores
                const finalEnvironmentalScore = calculateEnvironmentalScore(
                    EnergyUsage,
                    WaterConsumption,
                    WasteGeneration,
                    RecyclingRate
                );

                const finalSocialScore = calculateSocialScore(
                    LaborCompliance,
                    WorkerSafety,
                    CommunityImpact
                );

                const finalSupplyChainScore = calculateSupplyChainScore(
                    SupplierEthics,
                    TransportationEmissions,
                    MaterialSourcing
                );

  
                db.query(
                    `INSERT INTO Sustainability_Score (
                        ID,
                        EnergyUsage, WaterConsumption,
                        WasteGeneration, RecyclingRate,
                        LaborCompliance, WorkerSafety, CommunityImpact,
                        SupplierEthics, TransportationEmissions,
                        MaterialSourcing,
                        Environmental_Score, Social_Score, SupplyChain_Score, Date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)`,
                    [
                        email, // Use email for both ID and Manufacturer_ID
                        EnergyUsage, WaterConsumption,
                        WasteGeneration, RecyclingRate,
                        LaborCompliance, WorkerSafety, CommunityImpact,
                        SupplierEthics, TransportationEmissions,
                        MaterialSourcing,
                        finalEnvironmentalScore, finalSocialScore, finalSupplyChainScore
                    ],
                    (err, result) => {
                        if (err) {
                            console.error("Error inserting data:", err);
                            return res.status(500).json({ success: false, error: err.message });
                        }

                        res.json({
                            success: true,
                            score: {
                                environmental: finalEnvironmentalScore,
                                social: finalSocialScore,
                                supplyChain: finalSupplyChainScore,
                            }
                        });
                    }
                );
            }
        );
    });


    return router;
};
