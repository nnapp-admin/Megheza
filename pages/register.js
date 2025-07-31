import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Register.module.css';
import { FaUpload } from 'react-icons/fa';

// Define questions for each section
const questions = [
  // Section 1: Personal Information
  { section: 1, name: 'fullName', label: 'Full Name<span class="required-asterisk">*</span>', type: 'text', placeholder: 'Enter your full legal name', required: true, maxLength: 100 },
  { section: 1, name: 'profilePicture', label: 'Profile Picture (Optional, Maximum file size: 150 KB)', type: 'file', accept: 'image/jpeg,image/png,image/gif' },
  { section: 1, name: 'email', label: 'Email Address<span class="required-asterisk">*</span>', type: 'email', placeholder: 'Enter your email', required: true },
  { section: 1, name: 'location', label: 'Location (City, Country)<span class="required-asterisk">*</span>', type: 'text', placeholder: 'Enter your current city and country', required: true, maxLength: 100 },
  { section: 1, name: 'languages', label: 'Languages you report in<span class="required-asterisk">*</span>', type: 'text', placeholder: 'List languages used professionally', required: true, maxLength: 100 },
  // Section 2: Journalism Credentials
  { section: 2, name: 'primaryRole', label: 'Primary Role<span class="required-asterisk">*</span>', type: 'role', required: true },
  { section: 2, name: 'mediaAffiliation', label: 'Current Media Affiliation(s)<span class="required-asterisk">*</span>', type: 'text', placeholder: 'Enter media organization or "Freelance"', required: true, maxLength: 200 },
  { section: 2, name: 'portfolio', label: 'Official Website or Portfolio (Optional)', type: 'url', placeholder: 'Enter your professional website or portfolio link' },
  { section: 2, name: 'domainContribution1', label: 'Domain Contribution Link<span class="required-asterisk">*</span>', type: 'url', placeholder: 'We’re excited to explore your work — please share a link', required: true },
  { section: 2, name: 'domainContributionAdditional', label: 'Additional Domain Contribution Link (Optional)', type: 'url', placeholder: 'Additional link (optional)' },
  { section: 2, name: 'pressCard', label: 'Press Card / Journalist ID Upload (Optional, Maximum file size: 150 KB)', type: 'file', accept: 'image/jpeg,image/png,image/gif,application/pdf' },
  // Section 3: Verification Questions
  { section: 3, name: 'recognition', label: 'How would you like to be recognized as a journalist?<span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Provide a brief statement that reflects your professional identity and journalistic approach.', required: true, maxLength: 500 },
  { section: 3, name: 'subjects', label: 'What subjects or areas do you primarily report on?<span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Examples: politics, environment, technology, social justice, gender, conflict, culture, etc.', required: true, maxLength: 500 },
  { section: 3, name: 'motivation', label: 'What motivated you to pursue a career in journalism?<span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Share a short paragraph outlining the inspiration or turning point that led you to this field.', required: true, maxLength: 500 },
  { section: 3, name: 'affiliation', label: 'Have you been affiliated with any newsroom, media outlet, or journalist association?<span class="required-asterisk">*</span>', type: 'affiliation', required: true },
  { section: 3, name: 'affiliationDetails', label: 'Affiliation Details (if Yes)', type: 'text', placeholder: 'Yes (please specify)', conditional: (formData) => formData.affiliation === 'Yes', maxLength: 500 },
  { section: 3, name: 'reason', label: 'What is your reason for seeking access to this verified space?<span class="required-asterisk">*</span>', type: 'textarea', placeholder: 'Explain briefly what you hope to gain or contribute.', required: true, maxLength: 500 },
  { section: 3, name: 'videoSubmission', label: '(Optional) Submit a short video (1–2 minutes) introducing yourself and your intent for joining. This may include your background, values, or vision for how you intend to use this platform. Upload to Google Drive, Dropbox, or YouTube and provide the link below.', type: 'url', placeholder: 'Video Submission Link' },
  // Section 4: Self-Declaration
  { section: 4, name: 'selfDeclaration', label: 'Self-Declaration<span class="required-asterisk">*</span>', type: 'checkbox', required: true, text: 'I hereby confirm that I am an active, working journalist. I acknowledge that this platform is intended exclusively for verified media professionals and understand that all submitted information will undergo manual review. I accept that if my application is not approved, all associated data will be securely deleted. I further understand that any false, misleading, or unverifiable claims may result in permanent disqualification from access. I agree to uphold the principles of integrity, accuracy, and professional respect in all interactions within this space.' },
  { section: 4, name: 'termsAgreement', label: 'Terms Agreement<span class="required-asterisk">*</span>', type: 'checkbox', required: true, text: 'I agree to the <span class="termsLink">Terms of Use and Privacy Policy</span>.' },
];

// Total number of questions
const totalQuestions = questions.length;

export default function RegisterPage() {
  const [step, setStep] = useState(0);
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
    termsAgreement: false,
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const pressCardInputRef = useRef(null);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSuccessModalOpen) closeSuccessModal();
      if (e.key === 'Escape' && isTermsModalOpen) closeTermsModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSuccessModalOpen, isTermsModalOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const maxLength = questions.find((q) => q.name === name)?.maxLength || 500;
    if (type !== 'file' && type !== 'checkbox' && value.length > maxLength) {
      setErrors((prev) => ({ ...prev, [name]: `Cannot exceed ${maxLength} characters` }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, primaryRole: role, otherRole: step === 'Other' ? prev.otherRole : '' }));
    setErrors((prev) => ({ ...prev, primaryRole: '', otherRole: '' }));
  };

  const handleAffiliationSelect = (affiliation) => {
    setFormData((prev) => ({ ...prev, affiliation, affiliationDetails: affiliation === 'Yes' ? prev.affiliationDetails : '' }));
    setErrors((prev) => ({ ...prev, affiliation: '', affiliationDetails: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 150 * 1024) {
        setErrors((prev) => ({ ...prev, profilePicture: 'File size exceeds 150 KB limit' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData((prev) => ({ ...prev, profilePicture: null }));
    }
    setErrors((prev) => ({ ...prev, profilePicture: '' }));
  };

  const handlePressCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 150 * 1024) {
        setErrors((prev) => ({ ...prev, pressCard: 'File size exceeds 150 KB limit' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, pressCard: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, pressCard: null }));
    }
    setErrors((prev) => ({ ...prev, pressCard: '' }));
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePressCard = () => {
    setFormData((prev) => ({ ...prev, pressCard: null }));
    if (pressCardInputRef.current) pressCardInputRef.current.value = '';
  };

  const openTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setStep(0);
    setFormData({
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
      termsAgreement: false,
      profilePicture: null,
    });
    setPreviewImage(null);
  };

  const validateQuestion = (question) => {
    const newErrors = {};
    const { name, required, conditional, maxLength } = question;

    if (conditional && !conditional(formData)) return true;

    if (required && !formData[name]) {
      newErrors[name] = 'Answer required to continue';
    } else if (name === 'email' && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else if (['portfolio', 'domainContribution1', 'domainContributionAdditional', 'videoSubmission'].includes(name) && formData[name] && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData[name])) {
      newErrors[name] = 'Invalid URL format';
    } else if (maxLength && formData[name] && formData[name].length > maxLength) {
      newErrors[name] = `Cannot exceed ${maxLength} characters`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    questions.forEach((question) => {
      if (question.conditional && !question.conditional(formData)) return;
      if (question.required && !formData[question.name]) {
        newErrors[question.name] = 'Answer required to continue';
      }
      if (question.name === 'email' && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (['portfolio', 'domainContribution1', 'domainContributionAdditional', 'videoSubmission'].includes(question.name) && formData[question.name] && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData[question.name])) {
        newErrors[question.name] = 'Invalid URL format';
      }
      if (question.maxLength && formData[question.name] && formData[question.name].length > question.maxLength) {
        newErrors[question.name] = `Cannot exceed ${question.maxLength} characters`;
      }
      if (question.name === 'primaryRole' && formData.primaryRole === 'Other' && !formData.otherRole) {
        newErrors.otherRole = 'Answer required to continue';
      }
      if (question.name === 'affiliationDetails' && formData.affiliation === 'Yes' && !formData.affiliationDetails) {
        newErrors.affiliationDetails = 'Answer required to continue';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      const firstErrorQuestion = questions.find((q) => newErrors[q.name] || (q.name === 'primaryRole' && newErrors.otherRole));
      if (firstErrorQuestion) {
        const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
        setStep(errorIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setIsSuccessModalOpen(true);
      } else {
        setErrors(result.errors || { general: result.message });
        const firstErrorQuestion = questions.find((q) => result.errors?.[q.name]);
        if (firstErrorQuestion) {
          const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
          setStep(errorIndex);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } catch (error) {
      setErrors({ general: 'Failed to submit registration. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Modal component
  const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
            ×
          </button>
          <div className={styles.modalContent}>
            {title && <h2>{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Terms and Privacy Policy content
  const termsContent = (
    <>
      <h2>Privacy Policy — Megheza</h2>
      <p>At Megheza, we believe that privacy is not simply a legal obligation—it is a foundational principle of credible journalism and ethical media infrastructure. Our privacy framework is designed to preserve the dignity, agency, and professional autonomy of every verified journalist in our ecosystem. This Privacy Policy outlines the nature of the data we collect, the purposes behind its collection, the security measures deployed to protect it, and your rights as a user operating within a sovereign media platform of international standards.</p>
      <p>We recognize that the challenges facing journalists today are not only editorial but existential. Surveillance, data breaches, and opaque algorithmic profiling have become normalized. At Megheza, we reject that norm. Our infrastructure is intentionally built to resist exploitation, minimize data retention, and foster a culture of digital sanctity. You are not our product—you are our purpose.</p>
      <h3>1. Information We Collect and Why It Matters</h3>
      <p>We collect only the information necessary to establish and maintain a trusted journalistic environment. Every piece of data has a purpose rooted in verification, collaboration, or platform functionality. We explicitly avoid collecting any information that does not serve this mission.</p>
      <p><strong>Personal Identification Data:</strong> When you apply for verification, we collect your full legal name, region of operation, and verifiable journalistic affiliations. This is used solely to assess and verify your professional identity.</p>
      <p><strong>Professional Documentation:</strong> You may submit credentials such as national press cards, assignment letters, or institutional IDs. These are reviewed by credentialed editors and then permanently deleted within a secure window.</p>
      <p><strong>Contact Preferences:</strong> Your communication preferences, preferred language(s), and secure contact points allow us to customize your experience while minimizing intrusiveness.</p>
      <p><strong>Platform Engagement Metrics:</strong> To enhance functionality and relevance, we track which features are used most often, such as cross-border collaboration forums, pitch rooms, and language translation tools.</p>
      <p><strong>Device Metadata:</strong> We collect minimal technical data such as browser version, device type, and IP address strictly for security and regional customization.</p>
      <p><strong>Multimedia Contributions:</strong> If you choose to participate in Megheza Originals or the immersive storytelling wing, we will process your visual assets solely for that purpose.</p>
      <p>We strictly avoid collecting unnecessary personal information—no financial account data, no biometric identifiers, and absolutely no surveillance-based behavior tracking.</p>
      <h3>2. How We Use Your Data</h3>
      <p>Our philosophy on data use is direct: all information is processed for the sole benefit of the verified journalist community. Data is never sold, rented, or monetized through third-party advertising.</p>
      <ul>
        <li>Verify the authenticity of your journalistic credentials</li>
        <li>Facilitate secure communication among verified professionals globally</li>
        <li>Provide you access to specialized features like collaborative storytelling rooms, multilingual editorial tools, and global fellowship opportunities</li>
        <li>Match your interests with story leads and investigative cohorts</li>
        <li>Securely store visual submissions and collaborative content within editorial parameters</li>
      </ul>
      <p>Where possible, we anonymize usage data to improve platform design without profiling individual users.</p>
      <h3>3. Your Rights and Data Sovereignty</h3>
      <p>We believe in a user-first approach to data governance. You are not simply consenting to our framework—you are actively participating in it.</p>
      <p>You have the right to:</p>
      <ul>
        <li>Request full access to all data we hold on you</li>
        <li>Request edits or corrections to your account or verification data</li>
        <li>Withdraw participation from any collaborative or public-facing feature</li>
        <li>Delete your account and have all data purged within seven working days</li>
      </ul>
      <p>Consent is explicitly sought for any third-party inclusion, such as showcasing your work in a consortium exhibition or submitting your story to a fellowship program.</p>
      <h3>4. Data Security Infrastructure</h3>
      <p>Megheza maintains a fortress-grade digital environment built with principles of digital sovereignty, zero-trust architecture, and human-centered encryption. Some key features include:</p>
      <ul>
        <li>End-to-end encrypted messaging and collaboration systems</li>
        <li>Zero-knowledge proof verification processes</li>
        <li>Geo-fenced data storage options</li>
        <li>Compartmentalized access controls for editorial review</li>
        <li>Two-factor authentication (2FA) required at all user levels</li>
        <li>Infrastructure compliance with GDPR, Indian IT Rules, and the African Union Convention on Cyber Security</li>
      </ul>
      <p>Quarterly vulnerability assessments are conducted in partnership with independent cybersecurity auditors who specialize in civil society infrastructure.</p>
      <h3>5. Global Data Residency</h3>
      <p>As a cross-continental network, Megheza stores and processes data in jurisdictionally appropriate environments:</p>
      <ul>
        <li>For users in Europe, servers are based in Frankfurt, fully compliant with EU GDPR</li>
        <li>For Asia-Pacific users, infrastructure is hosted in Singapore with end-to-end safeguards</li>
        <li>For African journalists, Megheza is actively developing sovereign cloud infrastructure</li>
        <li>For the Americas, secure hosting is split between Ontario and Virginia</li>
      </ul>
      <p>We never transfer data to jurisdictions where journalistic freedom is legally compromised unless a journalist has explicitly chosen to operate there.</p>
      <h3>6. Cookie Usage and Tracking</h3>
      <p>Cookies are kept to an absolute minimum. We use them only for:</p>
      <ul>
        <li>Maintaining secure login sessions</li>
        <li>Preserving display preferences</li>
        <li>Detecting suspicious activity or bot behavior</li>
      </ul>
      <p>All cookies expire within 14 days and are automatically cleared upon logout. We do not use cookies for behavioral tracking or advertising.</p>
      <h3>7. Responsible Vendor Partnerships</h3>
      <p>Megheza partners only with service providers who sign a binding Data Ethics Agreement. These include:</p>
      <ul>
        <li>Encrypted file hosting for story drafts and visual contributions</li>
        <li>Secure translation services for cross-language editorial rooms</li>
        <li>Financial disbursement systems for fellowships and grants</li>
      </ul>
      <p>Each third-party undergoes rigorous vetting and ongoing auditing. We do not allow integration with ad-based or surveillance-heavy vendors.</p>
      <h3>8. Data Retention Framework</h3>
      <p>We apply a strict need-based retention protocol:</p>
      <ul>
        <li>Verification documents are deleted within 7 days of account approval</li>
        <li>Account data is retained as long as the user is active</li>
        <li>Inactive users receive a notice after 12 months, after which data is anonymized or deleted</li>
        <li>Published or co-authored material within Megheza Originals is archived unless opted out</li>
      </ul>
      <p>We honor individual requests to expunge contributions, including withdrawal from syndication.</p>
      <h3>9. Policy Updates and Communication</h3>
      <p>As Megheza evolves, we will continue to adapt this policy to meet new legal, ethical, and technological standards. All changes will be transparently communicated via:</p>
      <ul>
        <li>Platform-wide announcements</li>
        <li>Direct dashboard notifications</li>
        <li>Updated documentation available within your user portal</li>
      </ul>
      <p>You will always have the option to accept or reject new data terms before participating in new features or programs.</p>
      <h3>10. Accountability and Grievance Redressal</h3>
      <p>Our internal Data Ethics Office reviews all complaints or disputes involving user data. Investigations are carried out independently of the product or editorial teams, ensuring transparency and fairness. Final decisions are archived for accountability and made available upon request.</p>
      <p>Megheza is more than a platform—it is a principled structure built on the sanctity of press freedom and human dignity. We do not collect what we do not need. We do not store what we cannot protect. We do not exploit what we cannot ethically defend.</p>
      <p>In the pursuit of truth, your data is never the cost—it is the responsibility we uphold.</p>
      <h2>Terms of Service — Megheza</h2>
      <p><strong>Effective Date: July 27, 2025</strong></p>
      <p>Welcome to Megheza. These Terms of Service ("Terms") govern your access to and use of the Megheza platform and all associated services, including but not limited to our secure journalist network, collaborative tools, and Megheza Originals storytelling segment. By using our platform, you agree to abide by these terms in their entirety. If you do not accept these Terms, you may not access or use Megheza.</p>
      <p>These Terms are intended to protect both the individual journalist and the integrity of our global media ecosystem. Our platform is designed specifically for verified professionals in journalism, and the standards outlined here reflect the professional, ethical, and security expectations we uphold.</p>
      <h3>1. Acceptance of Terms</h3>
      <p>By registering for or accessing any part of Megheza, you affirm that:</p>
      <ul>
        <li>You are a verified journalist or media professional with proof of credentials.</li>
        <li>You have read, understood, and agree to be bound by these Terms.</li>
        <li>You are not using the platform to impersonate, deceive, or misrepresent yourself or others.</li>
      </ul>
      <p>Megheza reserves the right to modify these Terms at any time. Any changes will be communicated via your dashboard and prominently on the homepage. Continued use after such modifications indicates your acceptance of the updated Terms.</p>
      <h3>2. Eligibility</h3>
      <p>Access to Megheza is strictly limited to verified individuals working in journalism or related media fields. To be eligible, you must:</p>
      <ul>
        <li>Submit verifiable documentation (e.g., press credentials, letters from editors or recognized institutions).</li>
        <li>Successfully pass the verification process carried out by our human review team.</li>
        <li>Refrain from using pseudonyms or unverified affiliations unless explicitly permitted for safety reasons.</li>
      </ul>
      <p>Megheza retains the right to deny, revoke, or suspend access if a user is found to have misrepresented their professional identity.</p>
      <h3>3. User Responsibilities</h3>
      <p>As a user of Megheza, you agree to:</p>
      <ul>
        <li>Maintain the confidentiality of your login credentials.</li>
        <li>Use the platform solely for lawful, ethical, and professional activities.</li>
        <li>Respect the privacy and intellectual property of other users.</li>
        <li>Avoid uploading or sharing content that is defamatory, threatening, or unlawful.</li>
        <li>Refrain from using bots, scrapers, or automated systems to interact with the platform.</li>
      </ul>
      <p>You are solely responsible for the content you submit, including any collaborative work, visuals, and commentary.</p>
      <h3>4. Verification and Trust</h3>
      <p>Verification is at the heart of the Megheza platform. To preserve the network's credibility:</p>
      <ul>
        <li>All users must undergo one-time verification.</li>
        <li>Verified status may be revoked if a user engages in unethical practices.</li>
        <li>Megheza may request updated credentials periodically to ensure continued eligibility.</li>
        <li>Verification data is reviewed under strict confidentiality by editors who operate under nondisclosure agreements.</li>
      </ul>
      <h3>5. Intellectual Property Rights</h3>
      <p>You retain full copyright to your individual contributions. However:</p>
      <ul>
        <li>By uploading content to Megheza, you grant us a non-exclusive, royalty-free, global license to publish, display, and archive your work for the purpose of professional promotion and collaboration.</li>
        <li>Collaborative content involving multiple members (e.g., in the Megheza Originals segment) will be credited to all contributors, and redistribution will occur only with consent.</li>
        <li>Unauthorized use of Megheza branding, trademarks, or original works is strictly prohibited.</li>
      </ul>
      <h3>6. Platform Use and Restrictions</h3>
      <p>Megheza may not be used for:</p>
      <ul>
        <li>Promoting AI-generated journalism without disclosure.</li>
        <li>Disseminating propaganda, disinformation, or unauthorized leaks.</li>
        <li>Recruitment for non-journalistic activities, including political campaigns, lobbying, or corporate PR.</li>
        <li>Commercial resale or sublicensing of platform content or tools.</li>
      </ul>
      <p>Violations may result in account termination and legal action.</p>
      <h3>7. Account Suspension and Termination</h3>
      <p>Megheza may suspend or terminate accounts if:</p>
      <ul>
        <li>The user violates any part of these Terms.</li>
        <li>Verification is found to be fraudulent or expired.</li>
        <li>The user is inactive for more than 12 months without notice.</li>
      </ul>
      <p>Users may also voluntarily deactivate their accounts at any time by contacting our support team. Upon termination, any public content authored by the user may remain archived for editorial transparency unless deletion is requested.</p>
      <h3>8. Disclaimers and Limitations</h3>
      <p>Megheza is a platform for professional collaboration; we are not liable for disputes between users unless they involve verifiable misconduct on the platform.</p>
      <p>While we offer a secure digital environment, we cannot guarantee uninterrupted access due to internet outages or force majeure events.</p>
      <p>Any external links, tools, or integrations are provided as resources and do not constitute endorsements.</p>
      <h3>9. Indemnity</h3>
      <p>By using Megheza, you agree to indemnify and hold harmless the platform and its team from any claims, damages, or liabilities arising from your use of the platform, including those related to content you share, projects you join, or collaborations you undertake.</p>
      <h3>10. Governing Law and Dispute Resolution</h3>
      <p>These Terms are governed by the laws of the jurisdiction in which Megheza is legally registered. Disputes arising from these Terms shall first be addressed through mutual negotiation. If unresolved, the dispute will be settled via arbitration under recognized international media ethics forums or digital rights tribunals.</p>
      <h3>11. Contact</h3>
      <p>For any questions, clarifications, or feedback about these Terms, please reach out to our legal and editorial operations through the communication channels listed on our website.</p>
      <p>Megheza exists to serve verified media professionals with trust, creativity, and global responsibility. These Terms are designed not just to protect a platform, but to nurture a global media network built on integrity.</p>
    </>
  );

  const successContent = (
    <>
      <p>Thank you—your commitment to truth-driven reporting matters here.</p>
      <p>We're honored to review your application.</p>
    </>
  );

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
              onChange={name === 'profilePicture' ? handleImageChange : handlePressCardChange}
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
                    <span className={styles.uploadedFileName}>{formData.pressCard.name || 'Uploaded File'}</span>
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
                maxLength={100}
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
              <div>
                {text.includes('termsLink') ? (
                  <>
                    {text.split('<span class="termsLink">')[0]}
                    <span
                      className={styles.termsLink}
                      onClick={openTermsModal}
                      dangerouslySetInnerHTML={{
                        __html: text.split('<span class="termsLink">')[1].split('</span>')[0],
                      }}
                    />
                    {text.split('</span>')[1]}
                  </>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                )}
              </div>
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
        <style>
          {`
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #fff;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              animation: spin 1s linear infinite;
              margin-left: 10px;
              display: inline-block;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </Head>
      <div className={styles.registerContainer}>
        <header className={styles.siteHeader}>
          <nav className={styles.siteNav}>
            <Link href="/home" className={styles.logo}>
              <img src="/assets/Logo.png" alt="The Megheza Logo" className={styles.logoImage} />
              Megheza
            </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <section className={styles.registerSection}>
            <div className={styles.container}>
              <div className={styles.progressBar}>
                {step === 0 ? (
                  <span>Introduction</span>
                ) : step <= 18 ? (
                  <span>Question {step} of 18</span>
                ) : (
                  <span></span>
                )}
              </div>

              {step === 0 && (
                <div className={styles.intro}>
                  <p>
                    This is more than a form—it's your entry into a global consortium where journalism still holds the line. This
                    space is built for reporters, by reporters, and access is granted only to those who’ve earned their
                    place through real work in the field.
                  </p>
                  <p>
                    We verify every applicant to protect the trust, security, and value of this network. Whether you’ve
                    covered conflict zones or climate change, local politics or global affairs—what matters is that your
                    work is real. If you’re here, chances are you know exactly what that means.
                  </p>
                  <p>
                    This space is reserved for those dedicated to original reporting and journalistic integrity. It’s for people who report, investigate, write, and stand by the truth.
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
                    {step <= 18 ? (
                      <h2 className={styles.sectionHeader}>
                        Section {questions[step - 1].section}: {questions[step - 1].section === 1 ? 'Personal Information' : questions[step - 1].section === 2 ? 'Journalism Credentials' : 'Verification Questions'}
                      </h2>
                    ) : step === 19 ? (
                      <h2 className={styles.sectionHeader}>Self Declaration</h2>
                    ) : step === 20 ? (
                      <h2 className={styles.sectionHeader}>Policy Agreement Section</h2>
                    ) : null}
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
                      verified email address — <a href="mailto:media.network@megheza.com">media.network@megheza.com</a>.
                      Do not respond to or engage with messages from any other source. We strongly advise you to avoid
                      third-party messages or unsolicited offers claiming to represent this platform.
                    </p>
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            Submitting <span className="loader"></span>
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </div>
                    {errors.general && <p className={styles.error}>{errors.general}</p>}
                  </>
                )}
              </form>
            </div>
          </section>
        </main>
        <Modal isOpen={isTermsModalOpen} onClose={closeTermsModal} title="Terms and Privacy Policy">
          {termsContent}
        </Modal>
        <Modal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} title="Application Submitted">
          {successContent}
        </Modal>
        <footer className={styles.siteFooter}>
          <div className={styles.container}>
            <div className={styles.footerBottom}>
              <p>Copyright © 2025 Megheza. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}