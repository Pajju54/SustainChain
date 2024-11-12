use sustainchain;

CREATE TABLE Manufacturer (
    ID VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Contact_Info VARCHAR(255),
    Industry_Type VARCHAR(255)
);

CREATE TABLE Product (
    ID VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
    Category VARCHAR(255),
    Manufacturer_ID VARCHAR(255),
    FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(ID)
);

CREATE TABLE Raw_Materials (
    ID VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
    Type VARCHAR(255),
    Product_ID VARCHAR(255),
    FOREIGN KEY (Product_ID) REFERENCES Product(ID)
);

CREATE TABLE Login_Credentials (
    ID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Manufacturer_ID VARCHAR(255),
    FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(ID)
);

CREATE TABLE Environmental_Impact (
    ID VARCHAR(255) PRIMARY KEY,
    Waste_Offices VARCHAR(255),
    Labor_Rights_Score INT,
    Manufacturer_ID VARCHAR(255),
    FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(ID)
);

CREATE TABLE Sustainability_Score (
    ID VARCHAR(255) PRIMARY KEY,
    Manufacturer_ID VARCHAR(255),
    Score_Value INT,
    Date DATE,
    FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(ID)
);

CREATE TABLE Profile (
    ProfileID VARCHAR(255) PRIMARY KEY,
    ManufacturerID VARCHAR(255),
    About TEXT,
    Website VARCHAR(255),
    EstablishedYear VARCHAR(4),
    Certifications TEXT,
    AdditionalNotes TEXT,
    ProductDetails TEXT,
    Quantity INT,
    LaborPractices TEXT,
    EnvironmentalImpact TEXT,
    SupplyChainTransparency TEXT,
    EthicalSourcing TEXT,
    EmployeeWelfare TEXT,
    WasteManagement TEXT,
    RenewableEnergyUse TEXT,
    CompanyName VARCHAR(255),
    EcoFriendlyMaterials VARCHAR(255),
    EnergyConsumption VARCHAR(255),
    Street VARCHAR(255),
    City VARCHAR(255),
    Pincode VARCHAR(255),
    DOB DATE,
    FOREIGN KEY (ManufacturerID) REFERENCES Manufacturer(ID)
);

ALTER TABLE Profile ADD COLUMN FairWages VARCHAR(255);

CREATE TABLE Sustainability_Score (
    ID VARCHAR(255) PRIMARY KEY,
    Manufacturer_ID VARCHAR(255),
    Environmental_EnergyUsage DECIMAL(10,2),
    Environmental_WaterConsumption DECIMAL(10,2),
    Environmental_WasteGeneration DECIMAL(10,2),
    Environmental_RecyclingRate DECIMAL(5,2),
    Social_LaborCompliance INT,
    Social_WorkerSafety INT,
    Social_CommunityImpact INT,
    SupplyChain_SupplierEthics INT,
    SupplyChain_TransportationEmissions DECIMAL(10,2),
    SupplyChain_MaterialSourcing INT,
    Score_Value INT,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(ID)
);

ALTER TABLE Sustainability_Score
ADD COLUMN Environmental_Score FLOAT,
ADD COLUMN Social_Score FLOAT,
ADD COLUMN SupplyChain_Score FLOAT,
ADD COLUMN Total_Score FLOAT;

ALTER TABLE Sustainability_Score
    CHANGE COLUMN Environmental_EnergyUsage EnergyUsage FLOAT,
    CHANGE COLUMN Environmental_WaterConsumption WaterConsumption FLOAT,
    CHANGE COLUMN Environmental_WasteGeneration WasteGeneration FLOAT,
    CHANGE COLUMN Environmental_RecyclingRate RecyclingRate FLOAT,
    CHANGE COLUMN Social_LaborCompliance LaborCompliance FLOAT,
    CHANGE COLUMN Social_WorkerSafety WorkerSafety FLOAT,
    CHANGE COLUMN Social_CommunityImpact CommunityImpact FLOAT,
    CHANGE COLUMN SupplyChain_SupplierEthics SupplierEthics FLOAT,
    CHANGE COLUMN SupplyChain_TransportationEmissions TransportationEmissions FLOAT,
    CHANGE COLUMN SupplyChain_MaterialSourcing MaterialSourcing FLOAT;

CREATE TABLE Audit_Log (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(255),
    EventType VARCHAR(50),
    EventTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DELIMITER //
CREATE TRIGGER log_user_signup
AFTER INSERT ON Login_Credentials
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (UserID, EventType)
    VALUES (NEW.ID, 'User Signup');
END //
DELIMITER ;




