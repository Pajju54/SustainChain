import React, { useEffect, useState } from "react";

function DashboardPage() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch company data");
                }

                const data = await response.json();
                setCompanies(data.companies);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (companies.length === 0) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No companies found.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Company Sustainability Dashboard</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Profile ID</th>
                        <th>Company Name</th>
                        <th>Certifications</th>
                        <th>Sustainability Score</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={index}>
                            <td>{company.ProfileID}</td>
                            <td>{company.CompanyName}</td>
                            <td>{company.Certifications}</td>
                            <td>{company.Total_Score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardPage;
