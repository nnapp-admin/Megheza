import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Support.module.css';
import { FaTools, FaEnvelope, FaClock, FaBook, FaShieldAlt, FaFileAlt, FaFileSignature, FaBrain } from 'react-icons/fa';

export default function Support() {
  const router = useRouter();

  useEffect(() => {
    // Handle URL hash on page load
    const { hash } = router.asPath;
    if (hash) {
      const targetId = hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }

    // Scroll animations
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // Add .loaded class to body after animations
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 1000);

    // Ensure .loaded is added on window load as fallback
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // Cleanup event listeners on component unmount
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener('load', () => {
        document.body.classList.add('loaded');
      });
    };
  }, [router.asPath]);

  const handleJoinClick = () => {
    router.push('/register');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Support & Information - Megheza</title>
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
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <nav className={styles.container}>
            <a href="/home" className={styles.logo}>
              <img src="/assets/Logo.png" alt="The Megheza Logo" className={styles.logoImage} />
              Megheza
            </a>
          </nav>
        </header>

        <main className={styles.main}>
          <section className={`${styles.section} scroll-reveal`} id="support">
            <div className={styles.container}>
              <h2>Help Center</h2>
              <p>Welcome to the Megheza Help Center — a dedicated, extensive, and constantly evolving knowledge environment built to serve the nuanced needs of professional journalists operating within a verified, global media network. At Megheza, we recognize the dynamic pressures facing media professionals today: shrinking newsroom resources, globalized editorial expectations, personal safety threats, digital surveillance, and the constant race against disinformation. This Help Center exists to anchor journalists with both foundational and cutting-edge resources that support them through every stage of their professional journey.</p>
              <h3 id="onboarding">Verification Guide</h3>
              <p>Verification at Megheza is not an algorithmic filter — it is a deliberate, human process that acknowledges the context, commitment, and complexity of real journalism. To protect the credibility of our global network, each applicant is reviewed in layers by verification editors and field liaisons.</p>
              <h4>What Verification Means</h4>
              <ul>
                <li>Verified members are granted full access to Megheza’s editorial tools, peer network, storytelling studios, and collaborative protections.</li>
                <li>Verification is not temporary. Once accepted, members retain access unless they breach ethics or usage terms.</li>
                <li>Applicants are judged on the authenticity, depth, and integrity of their journalistic record — not on celebrity status or social media reach.</li>
              </ul>
              <h4>Required Materials</h4>
              <ul>
                <li>3 to 5 samples of published journalism that demonstrate authorship and journalistic judgment.</li>
                <li>A summary biography detailing professional experience, geographies of coverage, languages used, and key subject matter areas.</li>
                <li>Documentation from a recognized newsroom, press council, university journalism program, or non-profit media initiative. Freelancers may submit equivalent credentials or references.</li>
              </ul>
              <h4>Optional Materials</h4>
              <ul>
                <li>A written reference from a verified Megheza member.</li>
                <li>Any publicly known awards, major syndications, or journalism fellowships.</li>
              </ul>
              <h4>Review Structure</h4>
              <ul>
                <li>Applications are reviewed by a team comprised of multilingual editors, investigative journalists, and regional liaisons.</li>
                <li>Processing times vary by workload, submission completeness, and background checks.</li>
                <li>Applications are archived under strict data protection and are never shared externally.</li>
                <li>Rejected applicants may reapply after 90 days. Repeat falsification attempts result in permanent blacklisting across the network.</li>
              </ul>
              <h3>Platform Onboarding & Optimization</h3>
              <p>For every verified member, the first touchpoint with Megheza is crucial. The Help Center provides a full walkthrough on how to activate, secure, and optimize your account:</p>
              <ul>
                <li>Secure password encryption, dual-authentication setup, and IP tracking for anomalous logins.</li>
                <li>User profile customization with multilingual capabilities, time zone synchronization, beat specification, and regional expertise tagging.</li>
                <li>Interactive tutorials for uploading portfolios, activating digital bylines, and connecting to real-time peer networks.</li>
              </ul>
              <h3>System Navigation, Tools, & Dashboards</h3>
              <p>Megheza is a feature-rich platform with an interface designed for seamless reporting, collaboration, and distribution:</p>
              <ul>
                <li>Using the Global Discovery Grid to identify peer collaborators by country, language, or area of specialization.</li>
                <li>Scheduling virtual editorial roundtables with time zone coordination across hemispheres.</li>
                <li>Utilizing the encrypted production hub for co-authored reports, interactive research boards, and simultaneous editorial feedback.</li>
                <li>Accessing specialized segments like the "Conflict Zone Channel" or "Climate & Indigenous Reports."</li>
              </ul>
              <h3>Editorial Planning & Project Workflows</h3>
              <p>Our Help Center helps members align on journalism timelines, deliverables, and ethical structures:</p>
              <ul>
                <li>Tools for storyboarding investigative dossiers.</li>
                <li>Templates for collaborative research agreements and inter-organizational pitch submissions.</li>
                <li>Real-time updates on project milestones and dynamic publishing timetables.</li>
              </ul>
              <h3>Conflict Resolution & Peer Mediation</h3>
              <p>Journalistic collaborations across cultures, languages, and political frameworks can encounter friction. Megheza offers impartial protocols:</p>
              <ul>
                <li>Reporting and resolving disagreements related to authorship, story angle, or editorial tone.</li>
                <li>Formal peer mediation request procedures.</li>
                <li>Documentation for arbitration in the case of unresolved conflicts.</li>
              </ul>
              <h3>Safety, Threat Response, & Protection Protocols</h3>
              <p>Megheza incorporates journalist protection at the system level:</p>
              <ul>
                <li>Digital safety kits including guides on anti-surveillance, VPN configuration, and metadata scrubbing.</li>
                <li>On-ground physical risk toolkits, including location-specific briefings, emergency contacts, and off-grid protocols.</li>
                <li>Confidential alert system to notify moderators and safety partners in the event of regional threats.</li>
              </ul>
              <p>All entries in the Help Center are vetted and updated by an editorial-technical working group comprised of frontline journalists, open-source intelligence analysts, safety officers, and field editors.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="contact">
            <div className={styles.container}>
              <h2>Contact Us</h2>
              <p>At Megheza, we value real conversations over automated responses. Our “Contact Us” channel is structured to prioritize clarity, urgency, and relevance. Whether you're reporting from a remote conflict zone, running a data investigation across borders, or building out a multimedia series on post-colonial identity — we are here to support you.</p>
              <p>You may reach out to us for:</p>
              <ul>
                <li>Technical issues including platform glitches, downtime, feature access, or performance bugs.</li>
                <li>Editorial system concerns such as ethical review of peer collaboration, code of conduct clarity, or review of story escalations.</li>
                <li>Storytip submissions involving transnational importance that require confidential escalation.</li>
                <li>Institutional collaboration proposals from journalism schools, NGOs, indigenous documentation projects, or independent fact-checking networks.</li>
              </ul>
              <p>All incoming messages are directed to our decentralized editorial desks, which triage issues by urgency and field relevance. Our review process is manual, conducted by journalist coordinators operating across time zones to maintain global coverage. We prioritize human understanding, not auto-generated support scripts.</p>
              <p><FaEnvelope /> Official Email: <a href="mailto:media.network@megheza.com">media.network@megheza.com</a></p>
              <p><FaClock /> Standard Response Time: 24–48 business hours</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="company">
            <div className={styles.container}>
              <h2>About Us</h2>
              <h3><FaBook /> Who We Are</h3>
              <p>Megheza is more than a platform—it is a pioneering global media infrastructure, built exclusively for verified, professional journalists who believe in the core values of integrity, trust, and truthful storytelling. We are a next-generation journalist media network where seasoned correspondents, investigative reporters, visual storytellers, field producers, data analysts, and editors from around the world come together to reshape journalism—on their own terms.</p>
              <p>We are not a marketplace, not a content farm, and not another social media feed diluted by misinformation, bots, or non-verified sources. Megheza exists to counter the chaos of today’s digital information landscape by creating a secure, dignified, and visionary ecosystem—one designed to preserve, protect, and elevate real journalism.</p>
              <p>Founded by journalists for journalists, Megheza operates across borders, platforms, and mediums. Our mission is deeply rooted in global collaboration, narrative sovereignty, and soft-power intelligence, brought to life through a secure, peer-verified ecosystem.</p>
              <h3>Our Purpose</h3>
              <p>Megheza was born in response to a rapidly deteriorating media environment, where truth is commodified, AI-generated impersonation thrives, and authentic voices are buried under unverified noise.</p>
              <p>We recognize that journalism today is no longer only about informing the public—it’s also about protecting the integrity of truth, the safety of storytellers, and the future of democratic discourse.</p>
              <p>Megheza exists to:</p>
              <ul>
                <li>Restore credibility in the information supply chain</li>
                <li>Provide tools, infrastructure, and global connections to verified journalists</li>
                <li>Reimagine storytelling through high-end visual formats</li>
                <li>Safeguard media sovereignty, especially in the Global South</li>
                <li>Enable deep collaboration across geopolitical, linguistic, and technological boundaries</li>
              </ul>
              <p>We are building a future where journalism is borderless, protected, and powerful.</p>
              <h3>What We Offer</h3>
              <h4>1. Verified-Only Global Network</h4>
              <p>Every member of Megheza undergoes rigorous verification. This isn’t a subscription. It’s a membership earned through demonstrated journalistic work, integrity, and commitment to the profession.</p>
              <p>This enables us to:</p>
              <ul>
                <li>Protect against impersonation, propaganda, and AI-driven misinformation</li>
                <li>Foster deep trust and peer validation</li>
                <li>Create an organic, living network of real journalists</li>
              </ul>
              <p>Whether you are a field reporter in Eastern Ukraine, a photojournalist in Nairobi, a fact-checker in São Paulo, or an editor in Jakarta—your credentials matter here.</p>
              <h4>2. The Platform: Secure and Functional</h4>
              <p>Our digital platform serves as your secure newsroom and collaboration space.</p>
              <p>Features include:</p>
              <ul>
                <li>Encrypted profiles and dashboards</li>
                <li>Geo-tagged journalist mapping for local-global collaboration</li>
                <li>Real-time pitch exchange rooms</li>
                <li>Cross-border editorial roundtables</li>
                <li>Archival tools, newsroom simulators, and investigation sandboxes</li>
              </ul>
              <p>We’ve created an interface that respects your time, values your work, and protects your sources. No ads. No algorithmic suppression. No clutter. Just professional-grade infrastructure designed for journalists.</p>
              <h4>3. Megheza Originals: A New Language of Storytelling</h4>
              <p>Megheza Originals is our in-house high-end comic-graphic storytelling studio, where narratives of geopolitics, displacement, identity, climate, resistance, and memory are reframed visually.</p>
              <p>We take field reports and investigative dossiers and convert them into:</p>
              <ul>
                <li>Illustrated comic chapters</li>
                <li>Animated panel scrolls</li>
                <li>AR-integrated timelines</li>
                <li>Motion-driven immersive dossiers</li>
              </ul>
              <p>Our visual journalism team works with correspondents to reclaim soft power and decolonize global narratives through cutting-edge storytelling that resonates across cultures and languages.</p>
              <p>Megheza Originals is not fiction. It’s a non-fiction artistic vessel for deep stories—accessible to new audiences, preserved in formats that endure.</p>
              <h3>Our Philosophy: The Power of Integrity</h3>
              <p>Our foundational values shape every line of code, every editorial decision, and every partnership:</p>
              <ul>
                <li><strong>Verification is Sacred:</strong> Only real journalists with real credentials are admitted. This is not exclusion—it’s protection.</li>
                <li><strong>No Surveillance Economics:</strong> We do not and will never monetize user data. Our model is symbolic, member-driven, and transparent.</li>
                <li><strong>Storytelling is a Force of Memory:</strong> We believe in journalism not just as information, but as collective memory, cultural preservation, and historical resistance.</li>
                <li><strong>Global Solidarity, Local Agency:</strong> While we connect globally, we empower regional voices to lead local stories, respecting linguistic, cultural, and social autonomy.</li>
                <li><strong>Decolonial, Ethical, Restorative:</strong> Megheza is a space for rethinking the norms of extractive journalism. Our visual formats, language policies, and ethics codes reflect this commitment.</li>
              </ul>
              <h3>How We’re Structured</h3>
              <p>Megheza is organized into three synergistic divisions:</p>
              <ul>
                <li><strong>Megheza Platform:</strong> This is the operational backbone—a secure, digital space for collaborating across borders, pitching investigative ideas, finding co-authors or producers, managing documentation and review workflows, and publishing archival dossiers with integrity.</li>
                <li><strong>Megheza Originals:</strong> This is our creative think tank and production studio. Stories here are visually reimagined in a dignified, data-informed, and culturally rooted style, narrated in multi-modal formats, and designed with care for accessibility, trauma ethics, and audience immersion.</li>
                <li><strong>Megheza Global Consortium:</strong> This is the strategic core of our policy, advocacy, and institutional arm. It includes global journalist advisory panels, ethics mediation and protection frameworks, language equity and translation support, legal and archival safeguarding for endangered narratives, and global fellowship programs and mentorship exchanges.</li>
              </ul>
              <h3>Who We Serve</h3>
              <p>Megheza serves:</p>
              <ul>
                <li>Field Journalists risking their lives to document truth</li>
                <li>Editors and Producers curating complex, long-form investigations</li>
                <li>Photo and Video Journalists working in unstable or high-risk areas</li>
                <li>Fact-Checkers and OSINT experts seeking secure collaboration</li>
                <li>Podcast Teams, Visual Designers, and Illustrators transforming audio-visual storytelling</li>
                <li>Media Thinkers, Policy Advisors, and Journalism Scholars engaging with ethical evolution</li>
              </ul>
              <p>We are intergenerational, interdisciplinary, and intersectional.</p>
              <h3>What Makes Megheza Different</h3>
              <ul>
                <li>✅ No AI-generated content</li>
                <li>✅ No influencer noise</li>
                <li>✅ No clickbait incentives</li>
                <li>✅ No forced monetization</li>
                <li>✅ No syndication without consent</li>
                <li>✅ No celebrity-first journalism</li>
                <li>✅ No platform bias</li>
              </ul>
              <p>Instead:</p>
              <ul>
                <li>You own your work.</li>
                <li>You collaborate on your terms.</li>
                <li>You grow in a trusted, global media network.</li>
              </ul>
              <h3>Our Ecosystem</h3>
              <p>Megheza is part media network, part story lab, part global forum. We are structured for resilience:</p>
              <ul>
                <li>Decentralized design with no single point of control</li>
                <li>Regional nodes across South Asia, Latin America, Sub-Saharan Africa, and the MENA region</li>
                <li>Time-zone responsive teams to enable 24/7 platform support and editorial assistance</li>
                <li>Multilingual interface and interpreter tools for cross-cultural collaboration</li>
              </ul>
              <p>We’re not replacing journalism institutions—we’re building the infrastructure they never had time to create.</p>
              <h3>Join the Movement</h3>
              <p>Megheza is not open to the public. Membership is earned through verification. We believe:</p>
              <ul>
                <li>Journalism is not noise—it’s a profession.</li>
                <li>Truth needs protection—not platform dilution.</li>
                <li>Collaboration must be intentional—not forced virality.</li>
              </ul>
              <p>Whether you’re covering crisis zones, reporting on cultural heritage, archiving diaspora history, or mapping power networks—Megheza is the network where your work has meaning, safety, and global resonance.</p>
              <p>You’ve earned the right to tell your story. Let’s make sure it reaches the world—with dignity.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="privacy">
            <div className={styles.container}>
              <h2>Privacy Policy</h2>
              <p>At Megheza, we believe that privacy is not simply a legal obligation—it is a foundational principle of credible journalism and ethical media infrastructure. Our privacy framework is designed to preserve the dignity, agency, and professional autonomy of every verified journalist in our ecosystem. This Privacy Policy outlines the nature of the data we collect, the purposes behind its collection, the security measures deployed to protect it, and your rights as a user operating within a sovereign media platform of international standards.</p>
              <p>We recognize that the challenges facing journalists today are not only editorial but existential. Surveillance, data breaches, and opaque algorithmic profiling have become normalized. At Megheza, we reject that norm. Our infrastructure is intentionally built to resist exploitation, minimize data retention, and foster a culture of digital sanctity. You are not our product—you are our purpose.</p>
              <h3>1. Information We Collect and Why It Matters</h3>
              <p>We collect only the information necessary to establish and maintain a trusted journalistic environment. Every piece of data has a purpose rooted in verification, collaboration, or platform functionality. We explicitly avoid collecting any information that does not serve this mission.</p>
              <ul>
                <li><strong>Personal Identification Data:</strong> When you apply for verification, we collect your full legal name, region of operation, and verifiable journalistic affiliations. This is used solely to assess and verify your professional identity.</li>
                <li><strong>Professional Documentation:</strong> You may submit credentials such as national press cards, assignment letters, or institutional IDs. These are reviewed by credentialed editors and then permanently deleted within a secure window.</li>
                <li><strong>Contact Preferences:</strong> Your communication preferences, preferred language(s), and secure contact points allow us to customize your experience while minimizing intrusiveness.</li>
                <li><strong>Platform Engagement Metrics:</strong> To enhance functionality and relevance, we track which features are used most often, such as cross-border collaboration forums, pitch rooms, and language translation tools.</li>
                <li><strong>Device Metadata:</strong> We collect minimal technical data such as browser version, device type, and IP address strictly for security and regional customization.</li>
                <li><strong>Multimedia Contributions:</strong> If you choose to participate in Megheza Originals or the immersive storytelling wing, we will process your visual assets solely for that purpose.</li>
              </ul>
              <p>We strictly avoid collecting unnecessary personal information—no financial account data, no biometric identifiers, and absolutely no surveillance-based behavior tracking.</p>
              <h3>2. How We Use Your Data</h3>
              <p>Our philosophy on data use is direct: all information is processed for the sole benefit of the verified journalist community. Data is never sold, rented, or monetized through third-party advertising.</p>
              <p>We use your information to:</p>
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
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="terms">
            <div className={styles.container}>
              <h2>Terms of Service</h2>
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
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="consortium">
            <div className={styles.container}>
              <h2>Guidelines</h2>
              <p>The Megheza Consortium represents a cooperative framework that brings together journalists, editors, visual storytellers, media scholars, and regional collaborators to pursue the advancement of ethical journalism, cross-border reporting, and digital sovereignty. The guidelines below define the standards, principles, and operational norms for all those participating in or contributing to Megheza’s consortium initiatives.</p>
              <h3>I. Vision and Mandate</h3>
              <p>The Megheza Consortium is driven by a mission to create a secure, verified, and collaborative environment where media professionals can engage in meaningful storytelling, factual reporting, and long-form narrative creation across borders. As such, the consortium facilitates the following:</p>
              <ul>
                <li>Multi-regional collaborative journalism projects</li>
                <li>Long-term storytelling initiatives under the Megheza Originals banner</li>
                <li>Protection of cultural narratives and reporting on soft and hard power dynamics</li>
                <li>Dissemination of media education, ethical best practices, and data sovereignty awareness</li>
              </ul>
              <h3>II. Consortium Composition</h3>
              <p>The Megheza Consortium comprises:</p>
              <ul>
                <li>Verified journalists (print, broadcast, multimedia)</li>
                <li>Editorial leads and regional contributors</li>
                <li>Visual and investigative storytellers</li>
                <li>Language and culture liaisons</li>
                <li>Data journalists, fact-checkers, and ethics advisors</li>
              </ul>
              <p>All members are onboarded after an extensive review process to ensure professional legitimacy, journalistic credibility, and non-partisanship.</p>
              <h3>III. Responsibilities of Consortium Members</h3>
              <p>Members of the Megheza Consortium must adhere to the following responsibilities:</p>
              <ul>
                <li>Maintain strict journalistic integrity in all collaborative outputs</li>
                <li>Respect embargoes, confidential sources, and sensitive regional contexts</li>
                <li>Contribute actively to shared reporting efforts where assigned</li>
                <li>Participate in editorial debriefs and cultural sensitivity workshops</li>
                <li>Declare any conflicts of interest and recuse themselves from relevant storyrooms</li>
              </ul>
              <p>Consortium members are expected to maintain professional decorum and contribute constructively to cross-cultural narratives and global solidarity.</p>
              <h3>IV. Governance Structure</h3>
              <p>The Megheza Consortium operates under a multi-tiered governance model:</p>
              <ul>
                <li><strong>Editorial Steering Committee (ESC):</strong> Oversees project approvals, ethical review, and alignment with Megheza’s mission.</li>
                <li><strong>Regional Clusters:</strong> Organized by geography to manage language, cultural, and geopolitical nuances.</li>
                <li><strong>Project Facilitators:</strong> Assigned per initiative, responsible for timeline management, conflict mediation, and publishing coordination.</li>
                <li><strong>Review Board:</strong> A panel of senior journalists and ethics experts who provide final review of contentious or sensitive reporting.</li>
              </ul>
              <p>This structure ensures transparency, quality control, and decentralized editorial oversight.</p>
              <h3>V. Code of Interaction</h3>
              <p>Consortium members shall:</p>
              <ul>
                <li>Respect all regional, cultural, and linguistic identities</li>
                <li>Avoid promoting state-aligned propaganda or political extremism</li>
                <li>Uphold a zero-tolerance policy for harassment, plagiarism, or intimidation</li>
                <li>Accept constructive critique and participate in post-publication evaluations</li>
                <li>Recognize shared bylines and honor all editorial contributions</li>
              </ul>
              <p>Violations of these standards will result in warnings, suspension, or permanent removal from the Consortium.</p>
              <h3>VI. Data and Story Ownership</h3>
              <p>All stories produced under the Consortium retain shared rights between the creators and Megheza. Reproduction rights, republication, and public showcases require prior consent from all listed contributors. Data gathered during collaborative projects must be stored securely and may not be exported or reused without consortium approval.</p>
              <p>Personal information of contributors, sources, and partner organizations remains protected under Megheza’s Privacy Policy.</p>
              <h3>VII. Funding and Transparency</h3>
              <p>Megheza’s consortium activities are supported through a combination of membership contributions, institutional fellowships, public interest grants, and philanthropic partnerships. No commercial advertising or corporate funding influences editorial decisions.</p>
              <p>All funding sources for major projects will be disclosed to consortium members and stakeholders in advance. Members are encouraged to report potential conflicts of interest through their regional clusters or directly to the ESC.</p>
              <h3>VIII. Representation and Publication</h3>
              <p>Megheza reserves the right to publish selected Consortium outputs across its media channels, academic platforms, and public archives. All contributors will be credited based on their editorial, visual, or research roles.</p>
              <p>No content from the Consortium may be used in promotional materials, AI datasets, or third-party media platforms without formal permission.</p>
              <h3>IX. Exiting the Consortium</h3>
              <p>A member may voluntarily exit the Consortium at any time. However, any work completed prior to withdrawal remains governed by this guideline. Members who leave must transfer any unfulfilled responsibilities to another approved collaborator.</p>
              <p>In the event of disputes or unresolved issues, the Review Board will mediate and provide a binding resolution.</p>
              <h3>X. Future Expansion</h3>
              <p>Megheza intends to expand its Consortium into regional language bureaus, open-source research circles, and climate-impact reporting cells. Members will be invited to apply or nominate peers to lead such expansions based on merit and mission alignment.</p>
              <p>Participation in expansion initiatives is optional but encouraged for those interested in shaping the future of global journalism.</p>
              <p>For additional support or clarification on consortium responsibilities, members may reach out to their assigned facilitator or contact the Megheza Editorial Steering Committee.</p>
              <p>Together, through ethical collaboration and shared accountability, the Megheza Consortium aims to redefine global journalism with depth, accuracy, and integrity.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="ethics">
            <div className={styles.container}>
              <h2>Ethics Code</h2>
              <p>At Megheza, the ethical practice of journalism is not just a guiding principle—it is a non-negotiable foundation of everything we build, publish, and protect. As a verified global network of journalists, visual storytellers, editors, and investigators, our mission requires that we hold ourselves to the highest standards of integrity, fairness, cultural sensitivity, and professional conduct. The following Ethics Code outlines the values, principles, and responsibilities that govern all individual and collective actions within the Megheza ecosystem.</p>
              <h3>I. Purpose and Commitment</h3>
              <p>The Megheza Ethics Code serves as a professional compass for every contributor, member, and partner within our network. This code aims to foster a reporting environment that protects journalistic independence, amplifies underrepresented truths, and ensures accountability in every narrative we support.</p>
              <p>It is designed to empower journalists and storytellers by:</p>
              <ul>
                <li>Upholding nonpartisan, evidence-based reporting.</li>
                <li>Safeguarding privacy, anonymity, and source integrity.</li>
                <li>Eliminating plagiarism, misinformation, and manipulation.</li>
                <li>Respecting diverse worldviews and local cultural norms.</li>
                <li>Promoting a safe and collaborative space for expression.</li>
              </ul>
              <p>Every verified member of Megheza is expected to internalize and apply this code both within the platform and in their public journalistic conduct.</p>
              <h3>II. Principles of Ethical Journalism</h3>
              <h4>1. Accuracy and Verification</h4>
              <p>Truth is the cornerstone of our work. All contributors must commit to rigorous fact-checking, evidence validation, and cross-verification of sources before publication or submission. Sensationalism, data distortion, and editorial misrepresentation are strictly prohibited.</p>
              <h4>2. Accountability</h4>
              <p>Mistakes, when they occur, must be acknowledged transparently. Corrections should be made swiftly with a public note of clarification or retraction. Journalists are encouraged to maintain detailed logs of their sourcing, editorial decision-making, and version histories.</p>
              <h4>3. Fairness and Non-Discrimination</h4>
              <p>Reports and stories must be free from bias, hate speech, stereotyping, or unjust framing. Every subject must be given the right of response, especially in cases of critical reporting or investigative work.</p>
              <h4>4. Independence and Objectivity</h4>
              <p>Members must not allow personal relationships, financial incentives, or ideological affiliations to influence editorial judgment. Paid content, sponsored research, or affiliated partnerships must be clearly disclosed.</p>
              <h4>5. Source Protection</h4>
              <p>Megheza holds an unbreakable commitment to safeguarding sources—particularly whistleblowers, victims, and individuals in high-risk environments. Journalists must take all necessary precautions to protect the identities and digital footprints of vulnerable sources.</p>
              <h4>6. Consent and Transparency</h4>
              <p>Informed consent is required when capturing stories, photos, videos, or audio from individuals. Consent must be continuous and must not be inferred through silence or proximity. Vulnerable groups require additional sensitivity and permission protocols.</p>
              <h4>7. Cultural Sensitivity</h4>
              <p>We recognize the importance of local context. All journalists must report with an awareness of regional history, language nuances, and the potential social impact of their work. Assignments involving indigenous populations, displaced communities, or minority traditions must be handled with particular care.</p>
              <h3>III. Conflict of Interest</h3>
              <p>All members of Megheza are expected to:</p>
              <ul>
                <li>Declare potential conflicts prior to taking on a story or project.</li>
                <li>Abstain from covering topics where personal, political, or financial interests may impair impartiality.</li>
                <li>Refrain from accepting gifts, payments, or undisclosed favors in connection with reporting assignments.</li>
              </ul>
              <p>Editorial independence is vital to our credibility and must never be compromised by internal or external pressures.</p>
              <h3>IV. Conduct within the Megheza Network</h3>
              <p>Our digital and physical spaces are designed to promote mutual respect and collaboration. Every member shall:</p>
              <ul>
                <li>Engage in professional and respectful communication with peers.</li>
                <li>Acknowledge co-authors, researchers, and illustrators in bylines and metadata.</li>
                <li>Refrain from defamatory language, threats, or online harassment.</li>
                <li>Avoid monopolizing storyrooms or editorial direction without consensus.</li>
                <li>Participate constructively in peer review, critique rounds, and final debriefings.</li>
              </ul>
              <p>Intellectual debates are encouraged, but personal attacks, aggressive posturing, or discriminatory behavior are grounds for removal.</p>
              <h3>V. Visual and Investigative Storytelling Ethics</h3>
              <p>Journalists working in visual formats (photo, video, comics, infographics, animation) must adhere to additional standards:</p>
              <ul>
                <li>Never stage or manipulate events.</li>
                <li>Avoid image distortion or misleading edits.</li>
                <li>Attribute all visual content unless it qualifies for anonymous release.</li>
                <li>Provide trigger warnings for disturbing content.</li>
              </ul>
              <p>For Megheza Originals, particularly in graphic novel or comic formats, contributors must ensure:</p>
              <ul>
                <li>Characters and narratives based on real persons are handled responsibly.</li>
                <li>National and cultural symbols are not used satirically or disparagingly without context.</li>
                <li>Dialogue is respectful and accurately translates the subject’s intent.</li>
              </ul>
              <h3>VI. Reporting on Crisis, Conflict, and Trauma</h3>
              <p>Journalists working in war zones, disaster areas, or reporting on trauma must:</p>
              <ul>
                <li>Avoid re-traumatizing subjects during interviews.</li>
                <li>Disclose their presence and purpose during coverage.</li>
                <li>Take precautions to avoid becoming conduits for propaganda.</li>
                <li>Prioritize the safety of themselves and those they engage.</li>
              </ul>
              <p>When engaging in stories involving suicide, assault, or genocide, writers are encouraged to work with trauma experts and include resources for support where applicable.</p>
              <h3>VII. Intellectual Property and Attribution</h3>
              <p>All original work—textual or visual—must be properly credited. Shared materials require appropriate licensing or approval. Unauthorized use or duplication of another journalist’s content within or beyond Megheza will result in disciplinary action.</p>
              <p>Our platform encourages collaborative authorship and shared bylines. Any contributor whose work is part of a final publication deserves visible and lasting credit.</p>
              <h3>VIII. AI, Automation, and Generative Tools</h3>
              <p>Megheza does not permit the use of generative AI for news reporting, investigative narratives, or any form of visual journalism that may mislead the public. While assistive tools like transcription or language translation may be used, the core editorial process must remain human-driven.</p>
              <p>Synthetic content, deepfakes, and AI-generated images or articles are strictly banned.</p>
              <h3>IX. Breaches and Penalties</h3>
              <p>Violations of the Ethics Code will be addressed through the following stages:</p>
              <ul>
                <li><strong>Warning:</strong> A formal notice with explanation and remediation instructions.</li>
                <li><strong>Suspension:</strong> Temporary restriction of publishing or storyroom access.</li>
                <li><strong>Review Board Hearing:</strong> An internal review process including peers and ethics advisors.</li>
                <li><strong>Termination:</strong> Permanent removal from the Megheza network.</li>
              </ul>
              <p>In severe cases, Megheza reserves the right to report egregious ethical violations to relevant professional associations or legal authorities.</p>
              <h3>X. Commitment to Evolution</h3>
              <p>Megheza’s Ethics Code will be reviewed annually by a panel of independent advisors, regional editors, and working journalists. Amendments may be introduced to reflect evolving challenges, technological shifts, or newly recognized best practices.</p>
              <p>We welcome feedback and suggestions for improvement, particularly from underrepresented media communities and journalists facing high-risk reporting conditions.</p>
              <p>Megheza exists to elevate journalism that is honest, verified, and fearless. This code is our collective oath—a statement of what we stand for and how we intend to operate in a world where truth itself is under siege.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="best-practices">
            <div className={styles.container}>
              <h2>Best Practices</h2>
              <p>At Megheza, best practices are the living standards that guide our work, our platform dynamics, and our contributions to journalism and global storytelling. These practices are not static policies but evolving frameworks that embrace the core values of integrity, cross-border collaboration, visual excellence, and cultural sensitivity. As a global media network exclusively composed of verified journalists, we uphold best practices that transcend geographic, political, and cultural boundaries. They form the operational bedrock of how our members engage, produce, review, and share stories that matter.</p>
              <h3>I. Purpose of Best Practices at Megheza</h3>
              <p>The purpose of this Best Practices framework is to provide clear and comprehensive operational guidance to every verified journalist, visual storyteller, editor, researcher, and contributor on the Megheza network. While ethical codes define what is right, best practices define how to do it right.</p>
              <p>These practices enable:</p>
              <ul>
                <li>Consistency in editorial and publishing quality.</li>
                <li>Peer-to-peer learning and mentorship across regions.</li>
                <li>A professional ecosystem where journalistic excellence is the default.</li>
                <li>Safeguarding of sources, narratives, and creative rights.</li>
                <li>Resilience in the face of digital misinformation and institutional pressures.</li>
              </ul>
              <p>Best practices are adaptable and scalable—built to serve frontline war reporters, environmental journalists, comic-graphic storytellers, policy analysts, and investigative teams with equal diligence.</p>
              <h3>II. Editorial Best Practices</h3>
              <h4>1. Research Methodology</h4>
              <p>All stories must begin with a foundational research protocol. Journalists are expected to validate their information using multiple independent and primary sources. Secondary sourcing, while allowed, must be clearly distinguished. In-depth reading, background checks, and database verification should be practiced before any outreach or interviews.</p>
              <h4>2. Interview Protocols</h4>
              <p>Consent-driven interviewing is essential. Journalists should:</p>
              <ul>
                <li>Fully disclose their intent before recording.</li>
                <li>Ask permission before going on-the-record.</li>
                <li>Avoid leading, biased, or assumptive questions.</li>
                <li>Offer interviewees the opportunity to fact-check quoted segments where needed.</li>
                <li>Be particularly sensitive to trauma, marginalization, and risk.</li>
              </ul>
              <h4>3. Story Structuring</h4>
              <p>Stories should reflect logical progression, narrative cohesion, and fact layering. At Megheza, long-form pieces are encouraged to follow a tripartite narrative arc—context, conflict, and consequence—with space for nuance and reflection.</p>
              <h4>4. Citation Standards</h4>
              <p>Use verifiable data points, cite reliable institutions, and avoid overly general claims. All graphs, visuals, and charts must include sources. When referencing academic research or third-party articles, provide attribution either in-text or in a reference section.</p>
              <h4>5. Corrections and Clarifications</h4>
              <p>Corrections must be made visibly and promptly. All publications will have a transparent change log attached to the metadata, indicating the nature and date of corrections. Authors are encouraged to acknowledge reader-submitted error flags with professionalism.</p>
              <h3>III. Visual Storytelling and Design Practices</h3>
              <h4>1. Asset Verification</h4>
              <p>Every image, video, and infographic must be original or licensed for use. Reverse image search tools, forensic software, and metadata examination are part of standard verification practice at Megheza.</p>
              <h4>2. Inclusive Representation</h4>
              <p>Visuals must reflect the diversity of the people they cover. Avoid tokenism, stereotype portrayal, or unnecessary sensationalism. Facial blur techniques, symbolic framing, and contextual captions are required in sensitive cases.</p>
              <h4>3. Design Consistency</h4>
              <p>Megheza has its own signature comic-graphic format for investigative storytelling. Graphic artists are trained in frame balancing, caption harmonization, and narrative mapping. Adherence to design templates and typographic standards is expected.</p>
              <h4>4. Color and Accessibility</h4>
              <p>High contrast color palettes, alt-text for images, and accessible fonts are required across visual formats to ensure inclusivity.</p>
              <h4>5. Cultural Respect</h4>
              <p>Avoid using cultural imagery, attire, or iconography out of context. Any story involving indigenous communities or sacred symbolism must undergo a peer-review for cultural approval.</p>
              <h3>IV. Digital Security and Data Management Practices</h3>
              <h4>1. Encrypted Communication</h4>
              <p>All sensitive exchanges between journalists and sources must be conducted via end-to-end encrypted channels. Use of open or unprotected messaging services is discouraged.</p>
              <h4>2. File Protection</h4>
              <p>Visual and textual files must be password-protected when stored or shared. Megheza provides an internal cloud repository with access control layers for confidential projects.</p>
              <h4>3. Anonymity of High-Risk Sources</h4>
              <p>When anonymity is promised, all identifying metadata must be scrubbed from images, videos, and documents before publication. Megheza offers in-house anonymization tools.</p>
              <h4>4. Breach Response</h4>
              <p>In case of a data breach, the incident must be reported within 12 hours to the designated cybersecurity lead. A redressal and containment protocol will be activated.</p>
              <h3>V. Collaboration and Review Best Practices</h3>
              <h4>1. Cross-Border Collaboration</h4>
              <p>Megheza is built for transnational storytelling. Collaborative teams should use shared editorial calendars, cloud storyboards, and bilingual notes where applicable. All team members should be credited appropriately.</p>
              <h4>2. Peer Review Culture</h4>
              <p>Before publication, stories undergo multiple rounds of peer scrutiny. These reviews focus on:</p>
              <ul>
                <li>Factual accuracy</li>
                <li>Narrative coherence</li>
                <li>Ethical compliance</li>
                <li>Visual integrity</li>
              </ul>
              <p>Reviewers are rotated across regions to avoid bias and bring fresh perspectives.</p>
              <h4>3. Conflict Resolution</h4>
              <p>Editorial disputes must be addressed via structured mediation. A three-step protocol of dialogue, panel hearing, and editor-in-chief review is followed to resolve contentions.</p>
              <h3>VI. Reporting Under Risk: Conflict, Disaster, and Oppression Zones</h3>
              <h4>1. Field Safety</h4>
              <p>Field reporters must complete Megheza’s security certification before undertaking high-risk assignments. They are also required to register their itineraries and emergency contacts.</p>
              <h4>2. Emotional Resilience</h4>
              <p>Mental health protocols include access to on-call therapists, burnout leave, and trauma debriefing sessions. Journalists are trained to recognize signs of PTSD, anxiety, or field fatigue.</p>
              <h4>3. Propaganda and Disinformation Checks</h4>
              <p>All content from conflict zones undergoes double verification to ensure it is not inadvertently amplifying propaganda. Satirical or politicized symbols must be flagged in internal notes.</p>
              <h3>VII. Learning, Growth, and Feedback</h3>
              <h4>1. Training Modules</h4>
              <p>Megheza runs monthly training workshops on investigative tools, visual storytelling, cultural literacy, and digital ethics.</p>
              <h4>2. Feedback Cycles</h4>
              <p>Post-publication analysis is conducted through internal audits and reader feedback dashboards. Journalists are encouraged to respond constructively to critique.</p>
              <h4>3. Recognition and Growth</h4>
              <p>Outstanding contributors are highlighted via annual Megheza Fellowships, editorial showcases, and cross-platform syndication opportunities.</p>
              <h3>VIII. Evolving With the Times</h3>
              <p>Best practices at Megheza are not fixed in time. They are updated semi-annually based on technological advancements, legal shifts, cultural feedback, and evolving media challenges. Every verified member is invited to contribute to these updates, making our standard-setting collaborative and future-ready.</p>
              <p>At Megheza, best practices reflect not just technical competence but deep respect for the truth, the craft, and the people behind every story. They are our collective promise to the world: that journalism can still be courageous, collaborative, and credible.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="legal">
            <div className={styles.container}>
              <h2>Legal & Copyright</h2>
              <p>At Megheza, our legal and copyright framework serves as a cornerstone for ethical journalism, creative ownership, intellectual integrity, and operational legitimacy. As a global media network that brings together verified journalists, visual storytellers, and editorial professionals, we operate within a jurisdictionally respectful and internationally aligned legal protocol. Our goal is not only to protect the rights of our contributors and users but also to uphold a legal ecosystem where transparency, fairness, and mutual respect thrive across borders.</p>
              <p>This section outlines the principles, obligations, rights, and procedures that govern all forms of content, communication, and collaboration on the Megheza platform.</p>
              <h3>I. Ownership of Content</h3>
              <p>Every piece of original work published on Megheza—be it text, video, photograph, infographic, podcast, or comic-graphic content—is protected under international copyright laws and remains the intellectual property of its respective creator, unless otherwise stated under a separate licensing agreement.</p>
              <p>Contributors retain full ownership of their work. Megheza only obtains a non-exclusive, royalty-free, irrevocable license to distribute, archive, translate, excerpt, and feature the submitted content on its platform and affiliated networks, with proper credit to the original creator. This license allows us to preserve the story’s integrity while enabling broader dissemination across mediums.</p>
              <p>All derivative adaptations (e.g., turning a long-form article into a comic narrative or visual graphic) are subject to co-licensing. Consent from the original author is mandatory before such transformations take place.</p>
              <p>Megheza does not claim copyright over content sourced from external databases, archives, or third-party licensors. Such materials are always attributed and governed by their respective license agreements.</p>
              <h3>II. Copyright Infringement & Plagiarism Policy</h3>
              <p>Megheza enforces a zero-tolerance policy toward plagiarism, unauthorized use of copyrighted content, or misappropriation of another individual’s intellectual property.</p>
              <p>All content submitted to Megheza undergoes plagiarism screening using advanced verification tools. Contributors are expected to cite, credit, or license all third-party assets, including textual references, quotes, data visualizations, and audiovisual components.</p>
              <p>Should any contributor be found guilty of:</p>
              <ul>
                <li>Copying or closely paraphrasing content without permission or citation;</li>
                <li>Using images, footage, or graphics without proper licenses;</li>
                <li>Republishing work already under contractual obligation elsewhere;</li>
                <li>Falsely attributing authorship or co-authorship;</li>
              </ul>
              <p>...they will face immediate editorial review, content withdrawal, and potential removal from the platform.</p>
              <p>Repeat or egregious offenses may result in legal action, public disclaimer, and forfeiture of any current/future collaborations with Megheza or its partners.</p>
              <h3>III. Rights of Contributors</h3>
              <p>Megheza respects the sovereignty of journalistic work. All contributors have the following rights:</p>
              <ul>
                <li><strong>Right to Retain Copyright:</strong> Contributors maintain legal ownership of all original submissions unless a mutually signed transfer agreement is in place.</li>
                <li><strong>Right to Attribution:</strong> Authors and visual storytellers will be credited in every distribution instance, regardless of format.</li>
                <li><strong>Right to Withdraw:</strong> Contributors can formally request the removal or revision of their content from the platform. Each request will be reviewed in accordance with editorial and legal commitments.</li>
                <li><strong>Right to Legal Protection:</strong> In cases of copyright violation by third parties or unauthorized reposting, Megheza will support the contributor through digital takedown notices (under DMCA or its jurisdictional equivalent) and, when necessary, legal counsel.</li>
              </ul>
              <h3>IV. Use of Platform Content by External Entities</h3>
              <p>Any reproduction, republication, adaptation, or redistribution of Megheza’s platform content—whether in full or in excerpted form—is strictly prohibited without prior written consent.</p>
              <p>Academic institutions, research bodies, and news syndicates wishing to reference Megheza content must follow these protocols:</p>
              <ul>
                <li>Request formal permission via our editorial office.</li>
                <li>Clearly state the purpose, scope, and format of the usage.</li>
                <li>Ensure that the original author(s) and Megheza are credited prominently.</li>
              </ul>
              <p>Unauthorized use may result in legal actions, removal requests, and public retraction notices.</p>
              <h3>V. Licensing Models and Open Access</h3>
              <p>Megheza believes in accessibility and knowledge sharing while respecting creator rights. Depending on the nature of the project, Megheza offers three licensing options:</p>
              <ul>
                <li><strong>Standard License:</strong> The default model under which most contributor content is published. It allows Megheza internal usage with full author credit but restricts external third-party use.</li>
                <li><strong>Creative Commons License:</strong> Contributors may opt to publish under a CC BY-NC-ND license (Attribution-NonCommercial-NoDerivatives), allowing their content to be shared non-commercially with proper credit but not modified.</li>
                <li><strong>Syndication License:</strong> Under editorial approval, selected works may be syndicated to verified media networks and academic archives through revenue-sharing agreements.</li>
              </ul>
              <h3>VI. Intellectual Property of Megheza Assets</h3>
              <p>All proprietary software, code, branding, graphic templates, editorial guides, visual design systems, platform features, and Megheza’s original comic storytelling formats are the sole intellectual property of Megheza.</p>
              <p>Unauthorized copying, reverse engineering, use of logos, or replication of our platform’s design, editorial interface, and user structure constitutes a violation of trade dress and intellectual property protections and will be met with legal action.</p>
              <p>Contributors granted access to internal editorial tools or branded formats are bound by confidentiality and limited-use clauses embedded in contributor agreements.</p>
              <h3>VII. Dispute Resolution & Legal Jurisdiction</h3>
              <p>Any legal dispute concerning ownership, rights, or platform usage shall be subject to the jurisdiction where Megheza’s principal legal entity is registered. However, Megheza strives to resolve all intellectual property and legal conflicts through mediation, mutual discussion, and digital arbitration before escalating to courts.</p>
              <p>Contributors and third-party claimants are encouraged to submit their concerns directly to the Megheza legal desk, accompanied by documentation and a formal statement.</p>
              <p>Megheza retains the right to update, amend, or redefine its Legal & Copyright terms in accordance with international copyright treaties, digital publishing innovations, or internal governance reforms. All updates will be timestamped and publicly documented on the platform.</p>
              <p>At Megheza, legal integrity is not just a compliance measure—it is a value system. By preserving the rights of creators, respecting global copyright law, and maintaining transparency across our ecosystem, we ensure that every story told through our platform remains protected, honored, and credited.</p>
              <p>If you have further questions or need clarification regarding our Legal & Copyright protocols, we invite you to contact our editorial office through our official communication channels.</p>
            </div>
          </section>


          <section className={styles.ctaSection}>
            <div className={styles.container}>
              <div className={styles.ctaContent}>
                <h2>Ready to Join the Network?</h2>
                <p>Apply for verification and become part of the most trusted professional network for journalists worldwide.</p>
                <button className={`${styles.ctaButton} ${styles.ctaButtonLarge}`} onClick={handleJoinClick}>
                  Start Your Application
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
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