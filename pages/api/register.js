import mongoose from 'mongoose';
import Journalist from '../../models/Journalist';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const data = { ...req.body };

    // Convert languages to array if it's a string
    if (typeof data.languages === 'string') {
      data.languages = data.languages
        .split(',')
        .map((lang) => lang.trim())
        .filter((lang) => lang.length > 0);
    } else if (!Array.isArray(data.languages)) {
      return res.status(400).json({ errors: { languages: 'Languages must be a string or array' } });
    }

    // Validate file sizes (150 KB limit)
    if (data.profilePicture && Buffer.from(data.profilePicture.split(',')[1], 'base64').length > 150 * 1024) {
      return res.status(400).json({ errors: { profilePicture: 'Profile picture exceeds 150 KB limit' } });
    }
    if (data.pressCard && Buffer.from(data.pressCard.split(',')[1], 'base64').length > 150 * 1024) {
      return res.status(400).json({ errors: { pressCard: 'Press card exceeds 150 KB limit' } });
    }

    // Ensure conditional fields
    if (data.primaryRole === 'Other' && !data.otherRole) {
      return res.status(400).json({ errors: { otherRole: 'Other role is required when primary role is "Other"' } });
    }
    if (data.affiliation === 'Yes' && !data.affiliationDetails) {
      return res.status(400).json({ errors: { affiliationDetails: 'Affiliation details are required when affiliation is "Yes"' } });
    }

    // Create new journalist
    const journalist = new Journalist(data);
    await journalist.save();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error in /api/register:', error);
    if (error.name === 'ValidationError') {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};