import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_ingo_schools_jwt_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Mock in-memory user store fallback if DB is not actively connected
const mockUsers = [
  {
    id: 'usr_admin_01',
    email: 'admin@ingoschools.com',
    passwordHash: bcrypt.hashSync('Admin@123456', 10),
    fullName: 'Dr. Sarah Jenkins',
    role: 'SUPER_ADMIN',
    schoolName: 'INGO Central Academy'
  },
  {
    id: 'usr_teacher_01',
    email: 'teacher@ingoschools.com',
    passwordHash: bcrypt.hashSync('Teacher@123456', 10),
    fullName: 'Prof. Alan Vance',
    role: 'TEACHER',
    schoolName: 'INGO Central Academy'
  }
];

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, role = 'TEACHER', schoolName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and full name.'
      });
    }

    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr_${Date.now()}`,
      email,
      passwordHash,
      fullName,
      role,
      schoolName: schoolName || 'General Campus',
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        schoolName: newUser.schoolName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        schoolName: user.schoolName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = mockUsers.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        schoolName: user.schoolName
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching profile.' });
  }
};
