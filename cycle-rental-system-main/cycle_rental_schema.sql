CREATE DATABASE IF NOT EXISTS cycle_rental;
USE cycle_rental;
  -- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create plans table
CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_days INT NOT NULL
);

-- Create cycles table
CREATE TABLE cycles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(100) NOT NULL,
  status ENUM('available', 'rented', 'maintenance') DEFAULT 'available',
  location VARCHAR(255) NOT NULL
);

-- Create payments table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_id INT,
  amount DECIMAL(10,2),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- Create rentals table
CREATE TABLE rentals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  cycle_id INT,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (cycle_id) REFERENCES cycles(id) ON DELETE CASCADE
);
