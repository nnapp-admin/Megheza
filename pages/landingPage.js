// pages/landingPage.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/LandingPage.module.css'; // Import CSS module for modal styling

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleJoinClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log('Login submitted:', {
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Journalist Network Platform - Professional Network for Verified Journalists</title>
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
      <div className="page-wrapper">
        <header>
          <nav className="container">
            <a href="#" className="logo">
              Megheza
            </a>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#conferences">Conferences</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <button className="cta-button" onClick={handleLoginClick}>
              Login
            </button>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-content fade-in">
                <div className="hero-text">
                  <h1>The Professional Network for Verified Journalists</h1>
                  <p>
                    Powered by the Power of 9. For a one-time $9 entry fee, connect with trusted peers worldwide, access exclusive resources, and grow your career in a secure space that values integrity. No noise, no monthly fees—just real journalism, real opportunity. Your voice deserves to be heard—among those who’ve earned the right to speak.
                  </p>
                  <div className="hero-buttons">
                    <button className="cta-button" onClick={handleJoinClick}>
                      Join
                    </button>
                    <button className="secondary-button" onClick={handleLoginClick}>
                      Login
                    </button>
                  </div>
                  <div className="hero-checklist">
                    ✓ Verified journalists only ✓ End-to-end encryption ✓ Source protection
                  </div>
                </div>
                <div className="hero-visual">
                  <img src="/assets/Faces.png" alt="Journalist Network" className="hero-image" />
                </div>
              </div>
            </div>
          </section>

          {/* Rest of the sections (stats, features, cta-section, footer) remain unchanged */}
          <section className="stats">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-item scroll-reveal">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Verified Journalists</div>
                </div>
                <div className="stat-item scroll-reveal">
                  <div className="stat-number">150+</div>
                  <div className="stat-label">Countries Represented</div>
                </div>
                <div className="stat-item scroll-reveal">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Media Organizations</div>
                </div>
                <div className="stat-item scroll-reveal">
                  <div className="stat-number">1M+</div>
                  <div className="stat-label">Secure Messages</div>
                </div>
              </div>
            </div>
          </section>

          <section className="features" id="features">
            <div className="container">
              <div className="features-grid">
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">🔐</span>
                  <h3>Verified Access Only</h3>
                  <p>Rigorous verification process ensures only credentialed journalists gain access to our platform.</p>
                  <ul className="feature-list">
                    <li>Press credential verification</li>
                    <li>Media organization validation</li>
                    <li>Professional reference checks</li>
                    <li>Multi-factor authentication</li>
                  </ul>
                </div>
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">🤝</span>
                  <h3>Professional Networking</h3>
                  <p>Connect with journalists worldwide, find collaborators, and build meaningful professional relationships.</p>
                  <ul className="feature-list">
                    <li>Beat-specific communities</li>
                    <li>Mentorship matching</li>
                    <li>Collaborative project spaces</li>
                    <li>Industry expertise sharing</li>
                  </ul>
                </div>
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">🎥</span>
                  <h3>Virtual Conferences</h3>
                  <p>Attend and host professional conferences with integrated networking and interactive features.</p>
                  <ul className="feature-list">
                    <li>Live streaming capabilities</li>
                    <li>Interactive workshops</li>
                    <li>Networking lounges</li>
                    <li>Q&A and polling features</li>
                  </ul>
                </div>
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">📚</span>
                  <h3>Professional Development</h3>
                  <p>Access resources, training modules, and certification tracking to advance your journalism skills.</p>
                  <ul className="feature-list">
                    <li>Resource library</li>
                    <li>Training modules</li>
                    <li>Certification tracking</li>
                    <li>Skills endorsement system</li>
                  </ul>
                </div>
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">🛡️</span>
                  <h3>Source Protection</h3>
                  <p>Advanced security features designed specifically for journalism's unique confidentiality needs.</p>
                  <ul className="feature-list">
                    <li>End-to-end encryption</li>
                    <li>Secure file sharing</li>
                    <li>Anonymous communication</li>
                    <li>GDPR compliance</li>
                  </ul>
                </div>
                <div className="feature-card scroll-reveal">
                  <span className="feature-icon">💼</span>
                  <h3>Career Opportunities</h3>
                  <p>Discover job opportunities, freelance projects, and career advancement resources.</p>
                  <ul className="feature-list">
                    <li>Job board access</li>
                    <li>Freelance opportunities</li>
                    <li>Portfolio showcase</li>
                    <li>Career guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>Ready to Join the Network?</h2>
                <p>Apply for verification and become part of the most trusted professional network for journalists worldwide.</p>
                <button className="cta-button cta-button-large" onClick={handleJoinClick}>
                  Start Your Application
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Platform</h3>
                <ul>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Security</a></li>
                  <li><a href="#">Conferences</a></li>
                  <li><a href="#">Resources</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Support</h3>
                <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Verification Guide</a></li>
                  <li><a href="#">Technical Support</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Company</h3>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Community</h3>
                <ul>
                  <li><a href="#">Guidelines</a></li>
                  <li><a href="#">Ethics Code</a></li>
                  <li><a href="#">Best Practices</a></li>
                  <li><a href="#">News</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>Copyright © 2025 The Megheza. All Rights Reserved.</p>
            </div>
          </div>
        </footer>

        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
              <h2>Login to Megheza</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}