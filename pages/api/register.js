import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';
import dbConnect from '../../../lib/dbconnect'; // Adjust path based on your structure
import Journalist from '../../../models/Journalist';

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.'));
    }
  },
});

// Helper function to convert file to Base64
function fileToBase64(file) {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let mongooseConn;
  try {
    mongooseConn = await dbConnect(); // Establish connection
  } catch (error) {
    return res.status(500).json({ message: 'Database connection failed', error: error.message });
  }

  const uploadMiddleware = upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'pressCard', maxCount: 1 },
  ]);

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }

    try {
      const formData = req.body;
      const files = req.files;

      // Validate required fields
      const requiredFields = [
        'fullName',
        'email',
        'location',
        'languages',
        'primaryRole',
        'mediaAffiliation',
        'domainContribution1',
        'recognition',
        'subjects',
        'motivation',
        'affiliation',
        'reason',
        'selfDeclaration',
      ];

      const errors = {};
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          errors[field] = 'This field is required';
        }
      });

      if (formData.primaryRole === 'Other' && !formData.otherRole) {
        errors.otherRole = 'Please specify your role';
      }

      if (formData.affiliation === 'Yes' && !formData.affiliationDetails) {
        errors.affiliationDetails = 'Please provide affiliation details';
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
      }

      // Handle file uploads as Base64
      let profilePictureBase64 = null;
      let pressCardBase64 = null;

      if (files?.profilePicture) {
        profilePictureBase64 = fileToBase64(files.profilePicture[0]);
      }

      if (files?.pressCard) {
        pressCardBase64 = fileToBase64(files.pressCard[0]);
      }

      // Prepare data for MongoDB
      const journalistData = {
        fullName: formData.fullName,
        profilePicture: profilePictureBase64,
        email: formData.email,
        location: formData.location,
        languages: formData.languages,
        pronouns: formData.pronouns || null,
        primaryRole: formData.primaryRole,
        otherRole: formData.otherRole || null,
        mediaAffiliation: formData.mediaAffiliation,
        portfolio: formData.portfolio || null,
        domainContribution1: formData.domainContribution1,
        domainContributionAdditional: formData.domainContributionAdditional || null,
        pressCard: pressCardBase64,
        recognition: formData.recognition,
        subjects: formData.subjects,
        motivation: formData.motivation,
        affiliation: formData.affiliation,
        affiliationDetails: formData.affiliationDetails || null,
        reason: formData.reason,
        videoSubmission: formData.videoSubmission || null,
        selfDeclaration: formData.selfDeclaration === 'true',
        Verified: 'no',
      };

      // Save to MongoDB
      const journalist = new Journalist(journalistData);
      await journalist.save();

      res.status(201).json({
        message: 'Registration submitted successfully. Your application is under review.',
        data: journalist,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        message: 'An error occurred during registration.',
        error: error.message,
      });
    }
  });
}