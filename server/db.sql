CREATE DATABASE employees;
USE employees;
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employeeId VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(10) NOT NULL,
    department VARCHAR(50) NOT NULL,
    dateOfJoining DATE NOT NULL,
    role VARCHAR(50) NOT NULL
);
