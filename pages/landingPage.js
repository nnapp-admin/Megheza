import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/LandingPage.module.css'; // Import CSS module for modal styling

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true); // Changed to true
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
    if (!phone && !password) {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Log the input (for debugging, can be removed in production)
    console.log('Login submitted:', {
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
    setIsLoginButtonDisabled(true);
    // Redirect to dashboard regardless of input
    router.push('/dashboard');
    setIsLoginModalOpen(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Global Professional Network for Verified Journalists</title>
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
            <a href="/" className="logo">
              <img src="/assets/Logo.png" alt="The Megheza Logo" className="logo-image" />
              Megheza
            </a>
            <button 
              className="cta-button" 
              onClick={handleLoginClick}
              disabled={isLoginButtonDisabled}
            >
              Login
            </button>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-content fade-in">
                <div className="hero-text">
                  <h1>Global Professional Network for Verified Journalists</h1>
                  <p>
                    Powered by the Power of 9. For a one-time $9 entry fee, connect with trusted peers worldwide, access exclusive resources, and grow your career in a secure space that values integrity. No noise, no monthly fees—just real journalism, real opportunity. Your voice deserves to be heard—among those who’ve earned the right to speak.
                  </p>
                  <div className="hero-buttons">
                    <button className="cta-button" onClick={handleJoinClick}>
                      Join
                    </button>
                    <button 
                      className="secondary-button" 
                      onClick={handleLoginClick}
                      disabled={isLoginButtonDisabled}
                    >
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

          <section className="world-image-section scroll-reveal">
            <img
              src="/assets/world.png"
              alt="World Network"
              className="world-image"
              width="1230"
              height="300"
            />
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
            <div className={styles.footerContent}>
              <div className={styles.footerSection}>
                <h3>Support</h3>
                <ul>
                  <li><a href="/support#support">Help Center</a></li>
                  <li><a href="/support#contact">Contact Us</a></li>
                  <li><a href="/support#verification">Verification Guide</a></li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3>Company</h3>
                <ul>
                  <li><a href="/support#company">About Us</a></li>
                  <li><a href="/support#privacy">Privacy Policy</a></li>
                  <li><a href="/support#terms">Terms of Service</a></li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3>Consortium</h3>
                <ul>
                  <li><a href="/support#consortium">Guidelines</a></li>
                  <li><a href="/support#consortium">Ethics Code</a></li>
                  <li><a href="/support#consortium">Best Practices</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 Megheza – Verified Global Journalist Media Network. All Rights Reserved.</p>
              <p>Megheza™, Megheza Originals™, and related marks are the intellectual property of the Megheza consortium.</p>
              <p>Unauthorized use, scraping, or impersonation of verified profiles is strictly prohibited and prosecutable under international cyberlaw.</p>
              <div className="footer-contact">
                <p>For all editorial, partnership, verification, or legal inquiries: <a href="mailto:media_network@megheza.com" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>media_network@megheza.com</a></p>
              </div>
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
                    value={phone}
                    onChange={handleInputChange}
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
                    value={password}
                    onChange={handleInputChange}
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