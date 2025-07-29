import mongoose from 'mongoose';
import Journalist from '../../../models/Journalist'; // Adjust path based on your project structure

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Remove deprecated options
    });
    console.log(`[${new Date().toISOString()}] Connected to database: ${mongoose.connection.db.databaseName}, Host: ${mongoose.connection.host}, Port: ${mongoose.connection.port}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] MongoDB connection error:`, error);
    throw new Error('Database connection failed');
  }
};

export default async function handler(req, res) {
  console.log(`[${new Date().toISOString()}] Received request: Method=${req.method}, URL=${req.url}, Body=${JSON.stringify(req.body)}`);

  try {
    await connectDB();

    if (req.method === 'GET') {
      console.log(`[${new Date().toISOString()}] Executing GET request to fetch all journalists`);
      const journalists = await Journalist.find().lean();
      console.log(`[${new Date().toISOString()}] Found ${journalists.length} journalists in database`);
      
      const formattedJournalists = journalists.map((j) => ({
        ...j,
        verified: j.verified || false,
      }));
      console.log(`[${new Date().toISOString()}] Formatted journalists data, total records: ${formattedJournalists.length}`);
      return res.status(200).json(formattedJournalists);
    }

    console.log(`[${new Date().toISOString()}] Method ${req.method} not allowed for this endpoint`);
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] API error occurred:`, error.stack || error);
    return res.status(500).json({ message: 'Server error' });
  }
};