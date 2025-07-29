// models/Journalist.js
import mongoose from 'mongoose';

const journalistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    maxlength: [100, 'Full name cannot exceed 100 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true, // Define index here
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    maxlength: [100, 'Location cannot exceed 100 characters'],
    trim: true,
  },
  languages: {
    type: String,
    required: [true, 'Languages are required'],
    maxlength: [100, 'Languages cannot exceed 100 characters'],
    trim: true,
  },
  pronouns: {
    type: String,
    maxlength: [50, 'Pronouns cannot exceed 50 characters'],
    trim: true,
  },
  primaryRole: {
    type: String,
    required: [true, 'Primary role is required'],
    enum: [
      'Reporter',
      'Editor',
      'Correspondent',
      'Investigative Journalist',
      'Freelance Journalist',
      'Photo/Video Journalist',
      'Other',
    ],
  },
  otherRole: {
    type: String,
    maxlength: [100, 'Other role cannot exceed 100 characters'],
    trim: true,
  },
  mediaAffiliation: {
    type: String,
    required: [true, 'Media affiliation is required'],
    maxlength: [200, 'Media affiliation cannot exceed 200 characters'],
    trim: true,
  },
  portfolio: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
    trim: true,
  },
  domainContribution1: {
    type: String,
    required: [true, 'Domain contribution link is required'],
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
    trim: true,
  },
  domainContributionAdditional: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
    trim: true,
  },
  pressCard: {
    type: String, // Base64-encoded string
    validate: {
      validator: function (v) {
        return !v || /^data:(image\/[a-z]+|application\/pdf);base64,/.test(v);
      },
      message: 'Invalid file format for press card',
    },
  },
  profilePicture: {
    type: String, // Base64-encoded string
    validate: {
      validator: function (v) {
        return !v || /^data:image\/[a-z]+;base64,/.test(v);
      },
      message: 'Invalid file format for profile picture',
    },
  },
  recognition: {
    type: String,
    required: [true, 'Recognition statement is required'],
    maxlength: [500, 'Recognition cannot exceed 500 characters'],
    trim: true,
  },
  subjects: {
    type: String,
    required: [true, 'Subjects are required'],
    maxlength: [500, 'Subjects cannot exceed 500 characters'],
    trim: true,
  },
  motivation: {
    type: String,
    required: [true, 'Motivation is required'],
    maxlength: [500, 'Motivation cannot exceed 500 characters'],
    trim: true,
  },
  affiliation: {
    type: String,
    required: [true, 'Affiliation status is required'],
    enum: ['Yes', 'No'],
  },
  affiliationDetails: {
    type: String,
    maxlength: [500, 'Affiliation details cannot exceed 500 characters'],
    trim: true,
  },
  reason: {
    type: String,
    required: [true, 'Reason for seeking access is required'],
    maxlength: [500, 'Reason cannot exceed 500 characters'],
    trim: true,
  },
  videoSubmission: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
    trim: true,
  },
  selfDeclaration: {
    type: Boolean,
    required: [true, 'Self-declaration is required'],
  },
  termsAgreement: {
    type: Boolean,
    required: [true, 'Terms agreement is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Remove duplicate index definition
// Do NOT include journalistSchema.index({ email: 1 }) here, as it's already defined with index: true

// Singleton pattern to prevent OverwriteModelError
const Journalist = mongoose.models.Journalist || mongoose.model('Journalist', journalistSchema);

export default Journalist;