import { useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Register.module.css';
import { FaUpload } from 'react-icons/fa';

// Define questions for each section
const questions = [
  // Section 1: Personal Informationbenefits:// Section 1: Personal Information
  { section: 1, name: 'fullName', label: 'Benefits:// Full Name <span class="required-asterisk">*</span>', type: 'text', placeholder: 'Enter your full legal name', required: true },
  { section: 1, name: 'profilePicture', label: 'Profile Picture (Optional, recommended size: 200x200px)', type: 'file', accept: 'image/*' },
  { section: 1, name: 'email', label: 'Email Address <span class="required-asterisk">*</span>', type: 'email', placeholder: 'Enter your email', required: true },
  { section: 1, name: 'location', label: 'Location (City, Country) <span class="required-asterisk">*</span>', type: 'text', placeholder: 'Enter your current city and country', required: true },
  { section: 1, name: 'languages', label: 'Languages you report in', type: 'text', placeholder: 'List languages used professionally' },
  { section: 1, name: 'pronouns', label: 'Preferred Pronouns (Optional)', type: 'text', placeholder: 'e.g., she/her, he/him, they/them' },
  // Section 2: Journalism Credentials
  { section: 2, name: 'primaryRole', label: 'Primary Role <span class="required-asterisk">*</span>', type: 'role', required: true },
  { section: 2, name: 'mediaAffiliation', label: 'Current Media Affiliation(s)', type: 'text', placeholder: 'Enter media organization or "Freelance"' },
  { section: 2, name: 'portfolio', label: 'Official Website or Portfolio (Optional)', type: 'url', placeholder: 'Enter your professional website or portfolio link' },
  { section: 2, name: 'domainContribution1', label: 'Domain Contribution Link 1 <span class="required-asterisk">*</span>', type: 'url', placeholder: 'We’re excited to explore your work — please share a link', required: true },
  { section: 2, name: 'domainContributionAdditional', label: 'Additional Domain Contribution Link (Optional)', type: 'url', placeholder: 'Additional link (optional)' },
  { section: 2, name: 'pressCard', label: 'Press Card / Journalist ID Upload (Optional)', type: 'file', accept: 'image/*,.pdf' },
  // Section 3: Verification Questions
  { section: 3, name: 'recognition', label: 'How would you like to be recognized as a journalist? <span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Provide a brief statement that reflects your professional identity and journalistic approach.', required: true, maxLength: 500 },
  { section: 3, name: 'subjects', label: 'What subjects or areas do you primarily report on? <span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Examples: politics, environment, technology, social justice, gender, conflict, culture, etc.', required: true, maxLength: 500 },
  { section: 3, name: 'motivation', label: 'What motivated you to pursue a career in journalism? <span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Share a short paragraph outlining the inspiration or turning point that led you to this field.', required: true, maxLength: 500 },
  { section: 3, name: 'affiliation', label: 'Have you been affiliated with any newsroom, media outlet, or journalist association? <span class="required-asterisk">*</span>', type: 'affiliation', required: true },
  { section: 3, name: 'affiliationDetails', label: 'Affiliation Details (if Yes)', type: 'text', placeholder: 'Yes (please specify)', conditional: (formData) => formData.affiliation === 'Yes', maxLength: 500 },
  { section: 3, name: 'reason', label: 'What is your reason for seeking access to this verified space? <span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Explain briefly what you hope to gain or contribute.', required: true, maxLength: 500 },
  { section: 3, name: 'videoSubmission', label: '(Optional) Submit a short video (1–2 minutes) introducing yourself and your intent for joining. This may include your background, values, or vision for how you intend to use this platform. Upload to Google Drive, Dropbox, or YouTube and provide the link below.', type: 'url', placeholder: 'Video Submission Link' },
  // Section 4: Self-Declaration
  { section: 4, name: 'selfDeclaration', label: 'Self-Declaration <span class="required-asterisk">*</span>', type: 'checkbox', required: true, text: 'I hereby confirm that I am an active, working journalist. I acknowledge that this platform is intended exclusively for verified media professionals and understand that all submitted information will undergo manual review. I accept that if my application is not approved, all associated data will be securely deleted. I further understand that any false, misleading, or unverifiable claims may result in permanent disqualification from access. I agree to uphold the principles of integrity, accuracy, and professional respect in all interactions within this space.' },
];

// Total number of questions
const totalQuestions = questions.length;

export default function RegisterPage() {
  const [step, setStep] = useState(0); // Tracks current question index (0: Intro, 1 to totalQuestions: Questions, totalQuestions + 1: Submission)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    languages: '',
    pronouns: '',
    primaryRole: '',
    otherRole: '',
    mediaAffiliation: '',
    portfolio: '',
    domainContribution1: '',
    domainContribution2: '',
    domainContributionAdditional: '',
    pressCard: null,
    recognition: '',
    subjects: '',
    motivation: '',
    affiliation: '',
    affiliationDetails: '',
    reason: '',
    videoSubmission: '',
    selfDeclaration: false,
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const pressCardInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type !== 'file' && type !== 'checkbox' && value.length > 500) return; // Limit to 500 characters
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, primaryRole: role }));
    setErrors((prev) => ({ ...prev, primaryRole: '' }));
  };

  const handleAffiliationSelect = (affiliation) => {
    setFormData((prev) => ({ ...prev, affiliation }));
    setErrors((prev) => ({ ...prev, affiliation: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    setErrors((prev) => ({ ...prev, profilePicture: '' }));
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePressCard = () => {
    setFormData((prev) => ({ ...prev, pressCard: null }));
    if (pressCardInputRef.current) {
      pressCardInputRef.current.value = '';
    }
  };

  const validateQuestion = (question) => {
    const newErrors = {};
    const { name, required, conditional } = question;

    // Skip validation if the question is conditional and the condition is not met
    if (conditional && !conditional(formData)) return true;

    if (required && !formData[name]) {
      newErrors[name] = 'Answer required to continue';
    } else if (name === 'primaryRole' && formData.primaryRole === 'Other' && !formData.otherRole) {
      newErrors.otherRole = 'Answer required to continue';
    } else if (name === 'affiliationDetails' && formData.affiliation === 'Yes' && !formData.affiliationDetails) {
      newErrors.affiliationDetails = 'Answer required to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 || (step <= totalQuestions && validateQuestion(questions[step - 1]))) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all questions
    const newErrors = {};
    questions.forEach((question) => {
      if (question.conditional && !question.conditional(formData)) return;
      if (question.required && !formData[question.name]) {
        newErrors[question.name] = 'Answer required to continue';
      }
      if (question.name === 'primaryRole' && formData.primaryRole === 'Other' && !formData.otherRole) {
        newErrors.otherRole = 'Answer required to continue';
      }
      if (question.name === 'affiliationDetails' && formData.affiliation === 'Yes' && !formData.affiliationDetails) {
        newErrors.affiliationDetails = 'Answer required to continue';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Registration submitted:', formData);
      // Replace with backend API call as needed
    } else {
      // Jump to the first question with an error
      const firstErrorQuestion = questions.find((q) => newErrors[q.name] || (q.name === 'primaryRole' && newErrors.otherRole));
      if (firstErrorQuestion) {
        const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
        setStep(errorIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const renderQuestion = (question) => {
    const { name, label, type, placeholder, accept, required, maxLength, text } = question;

    if (question.conditional && !question.conditional(formData)) {
      return (
        <div className={styles.formGroup}>
          <p className={styles.note}>This field will appear when the condition is met (e.g., select "Yes" for affiliation).</p>
        </div>
      );
    }

    switch (type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <div className={styles.formGroup}>
            <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }}></label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              required={required}
              maxLength={maxLength}
            />
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div className={styles.formGroup}>
            <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }}></label>
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              required={required}
              maxLength={maxLength}
            ></textarea>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'file':
        return (
          <div className={styles.formGroup}>
            <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }}></label>
            <input
              type="file"
              id={name}
              name={name}
              accept={accept}
              className={styles.fileInput}
              onChange={name === 'profilePicture' ? handleImageChange : handleInputChange}
              ref={name === 'profilePicture' ? fileInputRef : pressCardInputRef}
            />
            {name === 'profilePicture' ? (
              <div className={styles.profileCard}>
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Profile Preview" className={styles.previewImage} />
                    <button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
                      ×
                    </button>
                  </>
                ) : (
                  <label htmlFor={name} className={styles.customFileUpload}>
                    <FaUpload /> Upload Profile Picture
                  </label>
                )}
              </div>
            ) : (
              <div className={styles.uploadContainer}>
                {formData.pressCard ? (
                  <div className={styles.uploadedFileContainer}>
                    <span className={styles.uploadedFileName}>{formData.pressCard.name}</span>
                    <button type="button" className={styles.removeButton} onClick={handleRemovePressCard}>
                      ×
                    </button>
                  </div>
                ) : (
                  <label htmlFor={name} className={styles.customFileUpload}>
                    <FaUpload /> Upload Press Card / ID
                  </label>
                )}
              </div>
            )}
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'role':
        return (
          <div className={styles.formGroup}>
            <label dangerouslySetInnerHTML={{ __html: label }}></label>
            <div className={styles.roleGroup}>
              {[
                'Reporter',
                'Editor',
                'Correspondent',
                'Investigative Journalist',
                'Freelance Journalist',
                'Photo/Video Journalist',
                'Other',
              ].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`${styles.roleButton} ${formData.primaryRole === role ? styles.selected : ''}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </button>
              ))}
            </div>
            {formData.primaryRole === 'Other' && (
              <input
                type="text"
                name="otherRole"
                placeholder="Specify if Other"
                value={formData.otherRole}
                onChange={handleInputChange}
                className={styles.otherInput}
                maxLength={500}
              />
            )}
            {errors.primaryRole && <p className={styles.error}>{errors.primaryRole}</p>}
            {errors.otherRole && <p className={styles.error}>{errors.otherRole}</p>}
          </div>
        );
      case 'affiliation':
        return (
          <div className={styles.formGroup}>
            <label dangerouslySetInnerHTML={{ __html: label }}></label>
            <div className={styles.roleGroup}>
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.roleButton} ${formData.affiliation === option ? styles.selected : ''}`}
                  onClick={() => handleAffiliationSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'checkbox':
        return (
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleInputChange}
                required={required}
              />
              <span dangerouslySetInnerHTML={{ __html: label }}></span>
              <div>{text}</div>
            </label>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      default:
        return (
          <div className={styles.formGroup}>
            <p className={styles.error}>No input defined for this step. Please report this issue.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Register - Megheza Journalist Network</title>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.registerContainer}>
        <header className={styles.siteHeader}>
          <nav className={styles.siteNav}>
            <a href="#" className={styles.logo}>
              <img src="/assets/Logo.png" alt="The Megheza Logo" className={styles.logoImage} />
              Megheza
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <section className={styles.registerSection}>
            <div className={styles.container}>
              <div className={styles.progressBar}>
                {step === 0 ? (
                  <span>Introduction</span>
                ) : step <= totalQuestions ? (
                  <span>Question {step} of {totalQuestions}</span>
                ) : (
                  <span>Review and Submit</span>
                )}
              </div>

              {step === 0 && (
                <div className={styles.intro}>
                  <p>
                    This is more than a form—it's your entry into a global consortium where journalism still holds the line. This
                    space is built for reporters, by reporters,-added access is granted only to those who’ve earned their
                    place through real work in the field.
                  </p>
                  <p>
                    We verify every applicant to protect the trust, security, and value of this network. Whether you’ve
                    covered conflict zones or climate change, local politics or global affairs—what matters is that your
                    work is real. If you’re here, chances are you know exactly what that means.
                  </p>
                  <p>
                    This is not for influencers, marketers, or AI-driven content farms. It’s for people who report,
                    investigate, write, and stand by the truth.
                  </p>
                  <p>
                    <strong>If that’s you—welcome. Let’s begin.</strong>
                  </p>
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Start Application
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.registerForm}>
                {step > 0 && step <= totalQuestions && (
                  <>
                    <h2 className={styles.sectionHeader}>
                      Section {questions[step - 1].section}: {questions[step - 1].section === 1 ? 'Personal Information' : questions[step - 1].section === 2 ? 'Journalism Credentials' : questions[step - 1].section === 3 ? 'Verification Questions' : 'Self-Declaration'}
                    </h2>
                    {renderQuestion(questions[step - 1])}
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="button" className={styles.nextButton} onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </>
                )}

                {step === totalQuestions + 1 && (
                  <>
                    <h2 className={styles.sectionHeader}>Review and Submit</h2>
                    <p className={styles.note}>
                      Applications are reviewed individually to maintain the integrity of this space. Due to a high volume
                      of verification requests, review times may occasionally exceed the standard 48–72 hour window. We
                      appreciate your patience and commitment.
                    </p>
                    <p className={styles.warning}>
                      <strong>Please note:</strong> Official access links and communication will only be sent from our
                      verified email address — <a href="mailto:media_network@megheza.com">media_network@megheza.com</a>.
                      Do not respond to or engage with messages from any other source. We strongly advise you to avoid
                      third-party messages or unsolicited offers claiming to represent this platform.
                    </p>
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="submit" className={styles.submitButton}>
                        Submit Application
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </section>
        </main>
        <footer className={styles.siteFooter}>
          <div className={styles.container}>
            <div className={styles.footerBottom}>
              <p>Copyright © 2025 The Megheza. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}