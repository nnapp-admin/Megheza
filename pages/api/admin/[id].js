import mongoose from 'mongoose';
import Journalist from '../../../models/Journalist';

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

    const { id } = req.query;
    console.log(`[${new Date().toISOString()}] Extracted ID from query: ${id}`);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`[${new Date().toISOString()}] Invalid ObjectId format: ${id}`);
      return res.status(400).json({ message: 'Invalid journalist ID' });
    }

    if (req.method === 'DELETE') {
      console.log(`[${new Date().toISOString()}] Executing DELETE request for journalist`);
      const journalist = await Journalist.findByIdAndDelete(id);
      console.log(`[${new Date().toISOString()}] Delete result:`, journalist ? 'Deleted' : 'Not Found', journalist);

      if (!journalist) {
        console.log(`[${new Date().toISOString()}] Journalist with ID ${id} not found in collection`);
        return res.status(404).json({ message: 'Journalist not found' });
      }

      console.log(`[${new Date().toISOString()}] Successfully deleted journalist with ID: ${id}`);
      return res.status(200).json({ message: 'Journalist deleted successfully' });
    }

    console.log(`[${new Date().toISOString()}] Method ${req.method} not allowed for this endpoint`);
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] API error occurred:`, error.stack || error);
    return res.status(500).json({ message: 'Server error' });
  }
}