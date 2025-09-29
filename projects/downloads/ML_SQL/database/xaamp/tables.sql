-- The database schema
CREATE DATABASE IF NOT EXISTS housing_db;
USE housing_db;

-- The table
CREATE TABLE IF NOT EXISTS housing_regions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    housing_median_age INT,
    total_rooms FLOAT,
    total_bedrooms FLOAT,
    population FLOAT,
    households FLOAT,
    median_income FLOAT,
    median_house_value FLOAT,
    ocean_proximity VARCHAR(50),
    region VARCHAR(50),
    rooms_per_house FLOAT,
    bedrooms_per_room FLOAT
);

-- Use an index for faster searching
CREATE INDEX idx_region ON housing_regions (region);
CREATE INDEX idx_ocean_proximity ON housing_regions (ocean_proximity);
CREATE INDEX idx_median_house_value ON housing_regions (median_house_value);
