import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sanitizeHtml from 'sanitize-html';
import dbConnect from '../../lib/dbconnect'; // Adjust path based on your structure
import Journalist from '../../models/Journalist';

// Configure environment variables
dotenv.config();

// Helper function to validate Base64 file size and type
function validateBase64File(base64String, fieldName, maxSizeKB = 150) {
  if (!base64String) return { valid: true };
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches) return { valid: false, error: `${fieldName} is not a valid Base64 string` };

  const mimeType = matches[1];
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  if (!allowedTypes.includes(mimeType)) {
    return { valid: false, error: `${fieldName} must be JPEG, PNG, GIF, or PDF` };
  }

  const buffer = Buffer.from(matches[2], 'base64');
  const sizeKB = buffer.length / 1024;
  if (sizeKB > maxSizeKB) {
    return { valid: false, error: `${fieldName} exceeds ${maxSizeKB} KB limit` };
  }

  return { valid: true, mimeType, buffer };
}

// Input sanitization options
const sanitizeOptions = {
  allowedTags: [], // Strip all HTML tags
  allowedAttributes: {}, // No attributes allowed
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let mongooseConn;
  try {
    mongooseConn = await dbConnect(); // Establish connection
  } catch (error) {
    console.error('Database connection error:', error.stack);
    return res.status(500).json({ message: 'Database connection failed' });
  }

  try {
    const formData = req.body;

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

    // Conditional validations
    if (formData.primaryRole === 'Other' && !formData.otherRole) {
      errors.otherRole = 'Please specify your role';
    }

    if (formData.affiliation === 'Yes' && !formData.affiliationDetails) {
      errors.affiliationDetails = 'Please provide affiliation details';
    }

    // Validate email format
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Validate URLs
    const urlFields = ['portfolio', 'domainContribution1', 'domainContributionAdditional', 'videoSubmission'];
    urlFields.forEach((field) => {
      if (formData[field] && !urlRegex.test(formData[field])) {
        errors[field] = 'Invalid URL format';
      }
    });

    // Validate file sizes and types
    const profilePictureValidation = validateBase64File(formData.profilePicture, 'Profile Picture');
    if (!profilePictureValidation.valid) {
      errors.profilePicture = profilePictureValidation.error;
    }

    const pressCardValidation = validateBase64File(formData.pressCard, 'Press Card');
    if (!pressCardValidation.valid) {
      errors.pressCard = pressCardValidation.error;
    }

    // Validate character limits for text fields
    const textFields = [
      { name: 'fullName', maxLength: 100 },
      { name: 'location', maxLength: 100 },
      { name: 'languages', maxLength: 100 },
      { name: 'mediaAffiliation', maxLength: 200 },
      { name: 'otherRole', maxLength: 100 },
      { name: 'affiliationDetails', maxLength: 500 },
      { name: 'recognition', maxLength: 500 },
      { name: 'subjects', maxLength: 500 },
      { name: 'motivation', maxLength: 500 },
      { name: 'reason', maxLength: 500 },
    ];

    textFields.forEach(({ name, maxLength }) => {
      if (formData[name] && formData[name].length > maxLength) {
        errors[name] = `This field cannot exceed ${maxLength} characters`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Sanitize inputs
    const journalistData = {
      fullName: sanitizeHtml(formData.fullName, sanitizeOptions),
      profilePicture: formData.profilePicture || null,
      email: sanitizeHtml(formData.email, sanitizeOptions),
      location: sanitizeHtml(formData.location, sanitizeOptions),
      languages: sanitizeHtml(formData.languages, sanitizeOptions),
      pronouns: formData.pronouns ? sanitizeHtml(formData.pronouns, sanitizeOptions) : null,
      primaryRole: sanitizeHtml(formData.primaryRole, sanitizeOptions),
      otherRole: formData.otherRole ? sanitizeHtml(formData.otherRole, sanitizeOptions) : null,
      mediaAffiliation: sanitizeHtml(formData.mediaAffiliation, sanitizeOptions),
      portfolio: formData.portfolio ? sanitizeHtml(formData.portfolio, sanitizeOptions) : null,
      domainContribution1: sanitizeHtml(formData.domainContribution1, sanitizeOptions),
      domainContributionAdditional: formData.domainContributionAdditional
        ? sanitizeHtml(formData.domainContributionAdditional, sanitizeOptions)
        : null,
      pressCard: formData.pressCard || null,
      recognition: sanitizeHtml(formData.recognition, sanitizeOptions),
      subjects: sanitizeHtml(formData.subjects, sanitizeOptions),
      motivation: sanitizeHtml(formData.motivation, sanitizeOptions),
      affiliation: sanitizeHtml(formData.affiliation, sanitizeOptions),
      affiliationDetails: formData.affiliationDetails
        ? sanitizeHtml(formData.affiliationDetails, sanitizeOptions)
        : null,
      reason: sanitizeHtml(formData.reason, sanitizeOptions),
      videoSubmission: formData.videoSubmission ? sanitizeHtml(formData.videoSubmission, sanitizeOptions) : null,
      selfDeclaration: formData.selfDeclaration === 'true' || formData.selfDeclaration === true,
      termsAgreement: formData.termsAgreement === 'true' || formData.termsAgreement === true,
      Verified: 'no',
      createdAt: new Date(), // For tracking document retention
    };

    // Save to MongoDB
    const journalist = new Journalist(journalistData);
    await journalist.save();

    res.status(201).json({
      message: 'Registration submitted successfully. Your application is under review.',
      data: journalist,
    });
  } catch (error) {
    console.error('Registration error:', error.stack);
    res.status(500).json({
      message: 'An error occurred during registration. Please try again later.',
    });
  }
}

// Optional: Script for scheduled deletion of pressCard after 7 days
// This should be run separately (e.g., via node-cron in a cron job)
export async function deleteVerificationDocs() {
  try {
    await dbConnect();
    await Journalist.updateMany(
      {
        Verified: 'yes',
        createdAt: { $lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      { $set: { pressCard: null } }
    );
    console.log('Verification documents deleted successfully');
  } catch (error) {
    console.error('Error deleting verification documents:', error.stack);
  }
}