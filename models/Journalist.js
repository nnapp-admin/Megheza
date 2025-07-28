// models/Journalist.js
import mongoose from 'mongoose';

const journalistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  profilePicture: String, // Base64 string, optional
  email: { type: String, required: true },
  location: { type: String, required: true },
  languages: { type: String, required: true },
  pronouns: String,
  primaryRole: { type: String, required: true },
  otherRole: String,
  mediaAffiliation: { type: String, required: true },
  portfolio: String,
  domainContribution1: { type: String, required: true },
  domainContributionAdditional: String,
  pressCard: String, // Base64 string, optional
  recognition: { type: String, required: true },
  subjects: { type: String, required: true },
  motivation: { type: String, required: true },
  affiliation: { type: String, required: true },
  affiliationDetails: String,
  reason: { type: String, required: true },
  videoSubmission: String,
  selfDeclaration: { type: Boolean, required: true },
  Verified: { type: String, default: 'no' },
});

// Optional: Add validation for Base64 fields if needed
journalistSchema.path('profilePicture').validate({
  validator: function(v) {
    return !v || /^data:image\/(jpeg|png|gif);base64,/.test(v);
  },
  message: props => `${props.value} is not a valid Base64 image!`
}, 'invalid base64');

journalistSchema.path('pressCard').validate({
  validator: function(v) {
    return !v || /^data:(image\/(jpeg|png|gif)|application\/pdf);base64,/.test(v);
  },
  message: props => `${props.value} is not a valid Base64 image or PDF!`
}, 'invalid base64');

const Journalist = mongoose.model('Journalist', journalistSchema);
export default Journalist;