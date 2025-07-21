import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { Op } from 'sequelize';  // <-- correct import of Op

// Register User
export async function registerUser(req, res) {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password are required.' });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or Email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      created_at: new Date()
    });

    // Exclude password from response
    const userData = newUser.toJSON();
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Login User
export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Exclude password from response
    const userData = user.toJSON();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get All Users (excluding passwords)
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
