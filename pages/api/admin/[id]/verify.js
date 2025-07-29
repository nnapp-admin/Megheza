import mongoose from 'mongoose';
import Journalist from '../../../../models/Journalist'; // Adjust path based on your project structure

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

    if (req.method === 'PATCH') {
      console.log(`[${new Date().toISOString()}] Executing PATCH request for verification`);

      // Extract ID from dynamic route parameter
      const { id } = req.query;
      console.log(`[${new Date().toISOString()}] Extracted ID from query: ${id}`);

      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`[${new Date().toISOString()}] Invalid ObjectId format: ${id}`);
        return res.status(400).json({ message: 'Invalid journalist ID' });
      }

      // Find the journalist
      console.log(`[${new Date().toISOString()}] Querying database for journalist with ID: ${id}`);
      const journalist = await Journalist.findById(id);
      console.log(`[${new Date().toISOString()}] Query result:`, journalist ? 'Found' : 'Not Found', journalist);

      if (!journalist) {
        console.log(`[${new Date().toISOString()}] Journalist with ID ${id} not found in collection`);
        return res.status(404).json({ message: 'Journalist not found' });
      }

      // Update verification status
      const { verified } = req.body;
      console.log(`[${new Date().toISOString()}] Updating verified status to: ${verified} for ID: ${id}`);
      journalist.verified = verified;
      await journalist.save();
      console.log(`[${new Date().toISOString()}] Successfully saved updated journalist document:`, journalist);

      return res.status(200).json({ message: 'Verification status updated', verified });
    }

    console.log(`[${new Date().toISOString()}] Method ${req.method} not allowed for this endpoint`);
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] API error occurred:`, error.stack || error);
    return res.status(500).json({ message: 'Server error' });
  }
};