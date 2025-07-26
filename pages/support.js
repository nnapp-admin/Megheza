import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Support.module.css';

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
            <a href="/" className={styles.logo}>
              <img src="/assets/Logo.png" alt="The Megheza Logo" className={styles.logoImage} />
              Megheza
            </a>
          </nav>
        </header>

        <main className={styles.main}>
          <section className={`${styles.section} scroll-reveal`} id="support">
            <div className={styles.container}>
              <h2>Support</h2>
              <h3>🛠️ Help Center</h3>
              <p>Need assistance navigating the Megheza platform? Our Help Center is designed to provide you with practical, detailed support for all stages of your membership, including:</p>
              <ul>
                <li>Account registration & login help</li>
                <li>Verification submission guidance</li>
                <li>Troubleshooting platform features</li>
                <li>Navigating editorial tools</li>
                <li>Accessing the Megheza story vault & newsroom rooms</li>
              </ul>
              <p>You can also find answers to frequently asked questions and technical documentation.</p>
              <p>
                📩 For unresolved issues, email: <a href="mailto:media_network@megheza.com">media_network@megheza.com</a>
              </p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="contact">
            <div className={styles.container}>
              <h2>Contact Us</h2>
              <p>We are a globally distributed platform and strive to respond swiftly and thoughtfully. For any communication—technical, editorial, security-related, or partnership-based—please contact:</p>
              <p>
                📨 Official Email: <a href="mailto:media_network@megheza.com">media_network@megheza.com</a>
              </p>
              <p>🕓 Standard Response Time: 24–48 business hours</p>
              <p>Please include your name, issue type, and verification ID (if applicable).</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="verification">
            <div className={styles.container}>
              <h2>Verification Guide</h2>
              <p>Verification at Megheza ensures every member upholds the integrity of real journalism. Our process is transparent, secure, and essential for access.</p>
              <h3>You’ll Need:</h3>
              <ul>
                <li>Verified bylines or clips from reputable media outlets</li>
                <li>Press ID / affiliation / resume / portfolio</li>
                <li>Independent or freelance journalists: credible links or scanned samples</li>
                <li>Optional: peer endorsement from an existing Megheza member</li>
              </ul>
              <h3>What We Look For:</h3>
              <ul>
                <li>Evidence of original reporting</li>
                <li>Adherence to journalistic ethics</li>
                <li>History of field work (local or international)</li>
                <li>No affiliation with AI-generated content farms or misinformation channels</li>
              </ul>
              <p>Verification preserves trust. It’s not just access—it’s a credential.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="company">
            <div className={styles.container}>
              <h2>Company</h2>
              <h3>📘 About Us</h3>
              <p>Megheza is the world’s first verified-only global journalist media network, created to empower professionals who defend truth in an age of noise, misinformation, and synthetic content. We are a secure, curated digital infrastructure that supports:</p>
              <ul>
                <li>Cross-border collaboration between trusted journalists</li>
                <li>Access to exclusive story leads, multimedia tools, and narrative frameworks</li>
                <li>Original visual storytelling under our Megheza Originals label</li>
              </ul>
              <p>We exist to help real journalists thrive—on their own terms, in a trusted space.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="privacy">
            <div className={styles.container}>
              <h2>Privacy Policy</h2>
              <p>Megheza is committed to full data transparency and protection. We comply with global data protection laws (GDPR, CCPA, India's DPDP Act), ensuring that your identity and information remain secure.</p>
              <h3>Key Assurances:</h3>
              <ul>
                <li>No data is sold or shared with third-party advertisers</li>
                <li>All communications are encrypted</li>
                <li>You control what’s visible on your journalist profile</li>
                <li>You may request access, update, or deletion of your data at any time</li>
              </ul>
              <p>
                📩 For privacy inquiries: <a href="mailto:media_network@megheza.com">media_network@megheza.com</a>
              </p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="terms">
            <div className={styles.container}>
              <h2>Terms of Service</h2>
              <p>By accessing Megheza, you agree to our shared values and legal terms that protect this network.</p>
              <h3>Key Terms Include:</h3>
              <ul>
                <li>Respectful, confidential collaboration on leads & investigations</li>
                <li>Revocation of access for ethics or verification breaches</li>
                <li>Adherence to security protocols for sensitive material</li>
              </ul>
              <p>These terms safeguard the professional standards we all rely on.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="consortium">
            <div className={styles.container}>
              <h2>Consortium</h2>
              <h3>📑 Guidelines</h3>
              <p>Our platform thrives on structured, fair, and respectful engagement. These guidelines govern how journalists:</p>
              <ul>
                <li>Exchange story leads and protect source material</li>
                <li>Share authorship, byline credit, and collaboration rights</li>
                <li>Engage in peer reviews and resolve disputes respectfully</li>
                <li>Manage embargoed or sensitive content across borders</li>
              </ul>
              <p>These rules are designed to uphold professional conduct and safeguard your work.</p>

              <h3>🧭 Ethics Code</h3>
              <p>Adapted from global press councils and journalist federations, the Megheza Ethics Code emphasizes:</p>
              <ul>
                <li>Accuracy over sensationalism</li>
                <li>Transparent sourcing and attribution</li>
                <li>Non-partisanship and independence</li>
                <li>Accountability in correction and fact-checking</li>
                <li>Fair, human-centered reporting—especially in vulnerable contexts</li>
              </ul>
              <p>Every member must abide by these principles. Violations are reviewed seriously.</p>

              <h3>🧠 Best Practices</h3>
              <p>Our Best Practices archive is a curated and evolving resource, offering tools and insights for:</p>
              <ul>
                <li>Cybersecurity & data protection for journalists</li>
                <li>Cross-border collaboration techniques</li>
                <li>Cultural fluency in international reporting</li>
                <li>Interviewing vulnerable populations ethically</li>
                <li>Visual and multimedia ethics in digital storytelling</li>
                <li>Use of secure, privacy-respecting platforms for communication</li>
              </ul>
              <p>This resource is updated quarterly by the Megheza editorial board and legal advisors.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="legal">
            <div className={styles.container}>
              <h2>Legal & Copyright</h2>
              <p>© 2025 Megheza – Verified Global Journalist Media Network. All Rights Reserved.</p>
              <p>Megheza™, Megheza Originals™, and related marks are the intellectual property of the Megheza consortium.</p>
              <p>Unauthorized use, scraping, or impersonation of verified profiles is strictly prohibited and prosecutable under international cyberlaw.</p>
            </div>
          </section>

          <section className={`${styles.section} scroll-reveal`} id="official-contact">
            <div className={styles.container}>
              <h2>Official Contact</h2>
              <p>For all editorial, partnership, verification, or legal inquiries:</p>
              <p>
                ✉️ <a href="mailto:media_network@megheza.com">media_network@megheza.com</a>
              </p>
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