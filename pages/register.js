// pages/register.js
import { useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Register.module.css';

export default function RegisterPage() {
  const [step, setStep] = useState(0); // Tracks current step (0: Intro, 1-4: Sections, 5: Submission)
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
    publishedWork1: '',
    publishedWork2: '',
    publishedWorkAdditional: '',
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

  const validateSection = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.email) newErrors.email = 'Email Address is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.profilePicture) newErrors.profilePicture = 'Profile Picture is required';
    } else if (currentStep === 2) {
      if (!formData.primaryRole) newErrors.primaryRole = 'Primary Role is required';
      if (formData.primaryRole === 'Other' && !formData.otherRole)
        newErrors.otherRole = 'Please specify your role';
      if (!formData.publishedWork1) newErrors.publishedWork1 = 'First published work link is required';
      if (!formData.publishedWork2) newErrors.publishedWork2 = 'Second published work link is required';
    } else if (currentStep === 3) {
      if (!formData.recognition) newErrors.recognition = 'This field is required';
      if (!formData.subjects) newErrors.subjects = 'This field is required';
      if (!formData.motivation) newErrors.motivation = 'This field is required';
      if (!formData.affiliation) newErrors.affiliation = 'Please select an option';
      if (formData.affiliation === 'Yes' && !formData.affiliationDetails)
        newErrors.affiliationDetails = 'Please specify affiliation details';
      if (!formData.reason) newErrors.reason = 'This field is required';
    } else if (currentStep === 4) {
      if (!formData.selfDeclaration) newErrors.selfDeclaration = 'You must agree to the self-declaration';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 || validateSection(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSection(4)) {
      console.log('Registration submitted:', formData);
      // Replace with backend API call (e.g., fetch or axios) as needed
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
        <header>
          <nav className="container">
            <a href="/landingPage" className="logo">
              Megheza
            </a>
          </nav>
        </header>
        <main>
          <section className={styles.registerSection}>
            <div className="container">
              <h1>Join Megheza Network</h1>
              <div className={styles.progressBar}>
                <span>Step {step} of 5</span>
              </div>

              {step === 0 && (
                <div className={styles.intro}>
                  <p>
                    This is more than a form—it's your entry into a community where journalism still holds the line. This
                    space is built for reporters, by reporters, and access is granted only to those who’ve earned their
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
                {step === 1 && (
                  <>
                    <h2 className={styles.sectionHeader}>Personal Information</h2>
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName">Full Name (Required)</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full legal name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="profilePicture">Profile Picture (Required)</label>
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                      <div className={styles.profileCard}>
                        {previewImage ? (
                          <>
                            <img src={previewImage} alt="Profile Preview" className={styles.previewImage} />
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={handleRemoveImage}
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <label htmlFor="profilePicture" className={styles.customFileUpload}>
                            📤 Upload Profile Picture
                          </label>
                        )}
                      </div>
                      {errors.profilePicture && <p className={styles.error}>{errors.profilePicture}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address (Required)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="location">Location (City, Country) (Required)</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your current city and country"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.location && <p className={styles.error}>{errors.location}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="languages">Languages You Report In</label>
                      <input
                        type="text"
                        id="languages"
                        name="languages"
                        placeholder="List languages used professionally"
                        value={formData.languages}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="pronouns">Preferred Pronouns (Optional)</label>
                      <input
                        type="text"
                        id="pronouns"
                        name="pronouns"
                        placeholder="e.g., she/her, he/him, they/them"
                        value={formData.pronouns}
                        onChange={handleInputChange}
                      />
                    </div>
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

                {step === 2 && (
                  <>
                    <h2 className={styles.sectionHeader}>Journalism Credentials</h2>
                    <div className={styles.formGroup}>
                      <label>Primary Role (Required)</label>
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
                      <input
                        type="text"
                        name="otherRole"
                        placeholder="Specify if Other"
                        value={formData.otherRole}
                        onChange={handleInputChange}
                        className={styles.otherInput}
                      />
                      {errors.primaryRole && <p className={styles.error}>{errors.primaryRole}</p>}
                      {errors.otherRole && <p className={styles.error}>{errors.otherRole}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="mediaAffiliation">Current Media Affiliation(s)</label>
                      <input
                        type="text"
                        id="mediaAffiliation"
                        name="mediaAffiliation"
                        placeholder="Enter media organization or 'Freelance'"
                        value={formData.mediaAffiliation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="portfolio">Official Website or Portfolio (Optional)</label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        placeholder="Enter your professional website or portfolio link"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Published Work (Minimum of 2)</label>
                      <input
                        type="url"
                        name="publishedWork1"
                        placeholder="Link to published work 1"
                        value={formData.publishedWork1}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.publishedWork1 && <p className={styles.error}>{errors.publishedWork1}</p>}
                      <input
                        type="url"
                        name="publishedWork2"
                        placeholder="Link to published work 2"
                        value={formData.publishedWork2}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.publishedWork2 && <p className={styles.error}>{errors.publishedWork2}</p>}
                      <input
                        type="url"
                        name="publishedWorkAdditional"
                        placeholder="Additional link (optional)"
                        value={formData.publishedWorkAdditional}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="pressCard">Press Card / Journalist ID Upload (Optional)</label>
                      <input
                        type="file"
                        id="pressCard"
                        name="pressCard"
                        accept="image/*,.pdf"
                        className={styles.fileInput}
                        onChange={handleInputChange}
                        ref={pressCardInputRef}
                      />
                      <div className={styles.uploadContainer}>
                        {formData.pressCard ? (
                          <div className={styles.uploadedFileContainer}>
                            <span className={styles.uploadedFileName}>{formData.pressCard.name}</span>
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={handleRemovePressCard}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="pressCard" className={styles.customFileUpload}>
                            📤 Upload Press Card / ID
                          </label>
                        )}
                      </div>
                    </div>
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

                {step === 3 && (
                  <>
                    <h2 className={styles.sectionHeader}>Verification Questions</h2>
                    <div className={styles.formGroup}>
                      <label htmlFor="recognition">How would you like to be recognized as a journalist?</label>
                      <textarea
                        id="recognition"
                        name="recognition"
                        placeholder="Provide a brief statement about your professional identity"
                        value={formData.recognition}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.recognition && <p className={styles.error}>{errors.recognition}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="subjects">What subjects or areas do you primarily report on?</label>
                      <textarea
                        id="subjects"
                        name="subjects"
                        placeholder="e.g., politics, environment, technology"
                        value={formData.subjects}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.subjects && <p className={styles.error}>{errors.subjects}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="motivation">What motivated you to pursue a career in journalism?</label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        placeholder="Share your inspiration or turning point"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.motivation && <p className={styles.error}>{errors.motivation}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Have you been affiliated with any newsroom, media outlet, or journalist association?</label>
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
                      <input
                        type="text"
                        name="affiliationDetails"
                        placeholder="Specify if Yes"
                        value={formData.affiliationDetails}
                        onChange={handleInputChange}
                        className={styles.otherInput}
                      />
                      {errors.affiliation && <p className={styles.error}>{errors.affiliation}</p>}
                      {errors.affiliationDetails && <p className={styles.error}>{errors.affiliationDetails}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="reason">What is your reason for seeking access to this verified space?</label>
                      <textarea
                        id="reason"
                        name="reason"
                        placeholder="Explain what you hope to gain or contribute"
                        value={formData.reason}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.reason && <p className={styles.error}>{errors.reason}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="videoSubmission">Video Submission Link (Optional)</label>
                      <input
                        type="url"
                        id="videoSubmission"
                        name="videoSubmission"
                        placeholder="Link to 1–2 minute introduction video"
                        value={formData.videoSubmission}
                        onChange={handleInputChange}
                      />
                    </div>
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

                {step === 4 && (
                  <>
                    <h2 className={styles.sectionHeader}>Self-Declaration</h2>
                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="selfDeclaration"
                          checked={formData.selfDeclaration}
                          onChange={handleInputChange}
                          required
                        />
                        I hereby confirm that I am an active, working journalist. I acknowledge that this platform is
                        intended exclusively for verified media professionals and understand that all submitted information
                        will undergo manual review. I accept that if my application is not approved, all associated data
                        will be securely deleted. I further understand that any false, misleading, or unverifiable claims
                        may result in permanent disqualification from access. I agree to uphold the principles of
                        integrity, accuracy, and professional respect in all interactions within this space.
                      </label>
                      {errors.selfDeclaration && <p className={styles.error}>{errors.selfDeclaration}</p>}
                    </div>
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

                {step === 5 && (
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
        <footer>
          <div className="container">
            <div className="footer-bottom">
              <p>© 2025 JournalistNet. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}