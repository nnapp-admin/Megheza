// models/Journalist.js
import mongoose from 'mongoose';

const journalistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters'],
  },
  profilePicture: {
    type: String, // Base64 string, optional
    validate: {
      validator: function (v) {
        if (!v) return true; // Allow null/undefined
        const isValidBase64 = /^data:image\/(jpeg|png|gif);base64,/.test(v);
        if (!isValidBase64) return false;
        // Validate size (150 KB) by decoding Base64
        const buffer = Buffer.from(v.split(',')[1], 'base64');
        return buffer.length <= 150 * 1024; // 150 KB
      },
      message: props => `${props.path} must be a valid Base64 image (JPEG, PNG, GIF) and not exceed 150 KB`,
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    unique: true, // Prevent duplicate emails
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters'],
  },
  languages: {
    type: String,
    required: [true, 'Languages are required'],
    trim: true,
    maxlength: [100, 'Languages cannot exceed 100 characters'],
  },
  pronouns: {
    type: String,
    trim: true,
    maxlength: [50, 'Pronouns cannot exceed 50 characters'],
  },
  primaryRole: {
    type: String,
    required: [true, 'Primary role is required'],
    trim: true,
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
    trim: true,
    maxlength: [100, 'Other role cannot exceed 100 characters'],
    required: [
      function () {
        return this.primaryRole === 'Other';
      },
      'Other role is required when primary role is "Other"',
    ],
  },
  mediaAffiliation: {
    type: String,
    required: [true, 'Media affiliation is required'],
    trim: true,
    maxlength: [200, 'Media affiliation cannot exceed 200 characters'],
  },
  portfolio: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
  },
  domainContribution1: {
    type: String,
    required: [true, 'Domain contribution link is required'],
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
  },
  domainContributionAdditional: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
  },
  pressCard: {
    type: String, // Base64 string, optional
    validate: {
      validator: function (v) {
        if (!v) return true; // Allow null/undefined
        const isValidBase64 = /^data:(image\/(jpeg|png|gif)|application\/pdf);base64,/.test(v);
        if (!isValidBase64) return false;
        // Validate size (150 KB) by decoding Base64
        const buffer = Buffer.from(v.split(',')[1], 'base64');
        return buffer.length <= 150 * 1024; // 150 KB
      },
      message: props => `${props.path} must be a valid Base64 image (JPEG, PNG, GIF) or PDF and not exceed 150 KB`,
    },
  },
  recognition: {
    type: String,
    required: [true, 'Recognition statement is required'],
    trim: true,
    maxlength: [500, 'Recognition statement cannot exceed 500 characters'],
  },
  subjects: {
    type: String,
    required: [true, 'Subjects are required'],
    trim: true,
    maxlength: [500, 'Subjects cannot exceed 500 characters'],
  },
  motivation: {
    type: String,
    required: [true, 'Motivation is required'],
    trim: true,
    maxlength: [500, 'Motivation cannot exceed 500 characters'],
  },
  affiliation: {
    type: String,
    required: [true, 'Affiliation status is required'],
    enum: ['Yes', 'No'],
  },
  affiliationDetails: {
    type: String,
    trim: true,
    maxlength: [500, 'Affiliation details cannot exceed 500 characters'],
    required: [
      function () {
        return this.affiliation === 'Yes';
      },
      'Affiliation details are required when affiliation is "Yes"',
    ],
  },
  reason: {
    type: String,
    required: [true, 'Reason for access is required'],
    trim: true,
    maxlength: [500, 'Reason cannot exceed 500 characters'],
  },
  videoSubmission: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Invalid URL format'],
  },
  selfDeclaration: {
    type: Boolean,
    required: [true, 'Self-declaration is required'],
  },
  termsAgreement: {
    type: Boolean,
    required: [true, 'Terms agreement is required'],
  },
  Verified: {
    type: String,
    default: 'no',
    enum: ['yes', 'no'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for performance
journalistSchema.index({ email: 1 }); // Unique index for email
journalistSchema.index({ Verified: 1, createdAt: 1 }); // For document deletion queries

// Pre-save hook to sanitize inputs (optional, as API already sanitizes)
journalistSchema.pre('save', function (next) {
  // Additional sanitization if needed (API already handles most)
  this.fullName = this.fullName.replace(/<[^>]+>/g, ''); // Strip HTML tags
  this.email = this.email.replace(/<[^>]+>/g, '');
  this.location = this.location.replace(/<[^>]+>/g, '');
  this.languages = this.languages.replace(/<[^>]+>/g, '');
  if (this.pronouns) this.pronouns = this.pronouns.replace(/<[^>]+>/g, '');
  this.primaryRole = this.primaryRole.replace(/<[^>]+>/g, '');
  if (this.otherRole) this.otherRole = this.otherRole.replace(/<[^>]+>/g, '');
  this.mediaAffiliation = this.mediaAffiliation.replace(/<[^>]+>/g, '');
  if (this.portfolio) this.portfolio = this.portfolio.replace(/<[^>]+>/g, '');
  this.domainContribution1 = this.domainContribution1.replace(/<[^>]+>/g, '');
  if (this.domainContributionAdditional)
    this.domainContributionAdditional = this.domainContributionAdditional.replace(/<[^>]+>/g, '');
  this.recognition = this.recognition.replace(/<[^>]+>/g, '');
  this.subjects = this.subjects.replace(/<[^>]+>/g, '');
  this.motivation = this.motivation.replace(/<[^>]+>/g, '');
  this.affiliation = this.affiliation.replace(/<[^>]+>/g, '');
  if (this.affiliationDetails) this.affiliationDetails = this.affiliationDetails.replace(/<[^>]+>/g, '');
  this.reason = this.reason.replace(/<[^>]+>/g, '');
  if (this.videoSubmission) this.videoSubmission = this.videoSubmission.replace(/<[^>]+>/g, '');
  next();
});

const Journalist = mongoose.model('Journalist', journalistSchema);
export default Journalist;