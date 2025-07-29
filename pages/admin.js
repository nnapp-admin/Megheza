import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/AdminPage.module.css';

export default function AdminPage() {
  const [journalists, setJournalists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const correctPassword = 'w8T#fZ3p@Lq9';

  useEffect(() => {
    if (isAuthenticated) {
      const fetchJournalists = async () => {
        try {
          const response = await fetch('/api/admin');
          if (!response.ok) throw new Error('Failed to fetch journalists');
          const data = await response.json();
          setJournalists(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchJournalists();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
      setPassword('');
    }
  };

  const handleVerifyToggle = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/${id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !currentStatus }),
      });
      if (!response.ok) throw new Error('Failed to update verification status');
      setJournalists((prev) =>
        prev.map((journalist) =>
          journalist._id === id ? { ...journalist, verified: !currentStatus } : journalist
        )
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatLanguages = (languages) => {
    if (Array.isArray(languages)) {
      return languages.join(', ') || 'N/A';
    }
    return languages || 'N/A';
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>Enter Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.passwordInput}
              autoFocus
            />
            {passwordError && <p className={styles.passwordError}>{passwordError}</p>}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin - Journalist Verification</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <div className={styles.container}>
            <a href="/" className={styles.logo}>
              <img src="/assets/Logo.png" alt="Megheza Logo" className={styles.logoImage} />
              Megheza Admin
            </a>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.journalistList}>
              {journalists.map((journalist, index) => (
                <div
                  key={journalist._id}
                  className={`${styles.journalistCard} ${index === 0 ? styles.firstJournalistCard : ''}`}
                >
                  <div
                    className={styles.journalistHeader}
                    onClick={() => toggleRow(journalist._id)}
                  >
                    <span className={styles.journalistName}>
                      {journalist.fullName || journalist._id}
                    </span>
                    <span
                      className={`${styles.verifiedStatus} ${
                        journalist.verified ? styles.verified : styles.unverified
                      }`}
                    >
                      {journalist.verified ? 'Verified' : 'Unverified'}
                    </span>
                    <button
                      className={styles.toggleButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(journalist._id);
                      }}
                    >
                      {expandedRows[journalist._id] ? '−' : '+'}
                    </button>
                  </div>
                  {expandedRows[journalist._id] && (
                    <div className={styles.journalistDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span>{journalist.email}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Location:</span>
                        <span>{journalist.location}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Languages:</span>
                        <span>{formatLanguages(journalist.languages)}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Pronouns:</span>
                        <span>{journalist.pronouns || 'N/A'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Primary Role:</span>
                        <span>{journalist.primaryRole}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Other Role:</span>
                        <span>{journalist.otherRole || 'N/A'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Media Affiliation:</span>
                        <span>{journalist.mediaAffiliation}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Portfolio:</span>
                        <span>
                          {journalist.portfolio ? (
                            <button
                              className={styles.linkButton}
                              onClick={() => window.open(journalist.portfolio, '_blank')}
                            >
                              Link
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Domain Contribution 1:</span>
                        <span>
                          {journalist.domainContribution1 ? (
                            <button
                              className={styles.linkButton}
                              onClick={() => window.open(journalist.domainContribution1, '_blank')}
                            >
                              Link
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Domain Contribution 2:</span>
                        <span>
                          {journalist.domainContributionAdditional ? (
                            <button
                              className={styles.linkButton}
                              onClick={() => window.open(journalist.domainContributionAdditional, '_blank')}
                            >
                              Link
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Press Card:</span>
                        <span>
                          {journalist.pressCard ? (
                            <img
                              src={journalist.pressCard}
                              alt="Press Card"
                              className={styles.detailImage}
                              onClick={() => window.open(journalist.pressCard, '_blank')}
                            />
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Profile Picture:</span>
                        <span>
                          {journalist.profilePicture ? (
                            <img
                              src={journalist.profilePicture}
                              alt="Profile Picture"
                              className={styles.detailImage}
                              onClick={() => window.open(journalist.profilePicture, '_blank')}
                            />
                          ) : (
                            <img
                              src="/assets/placeholder-profile.png"
                              alt="Placeholder Profile Picture"
                              className={styles.detailImage}
                            />
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Recognition:</span>
                        <span>{journalist.recognition}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Subjects:</span>
                        <span>{journalist.subjects}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Motivation:</span>
                        <span>{journalist.motivation}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Affiliation:</span>
                        <span>{journalist.affiliation}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Affiliation Details:</span>
                        <span>{journalist.affiliationDetails || 'N/A'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Reason:</span>
                        <span>{journalist.reason}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Video Submission:</span>
                        <span>
                          {journalist.videoSubmission ? (
                            <button
                              className={styles.linkButton}
                              onClick={() => window.open(journalist.videoSubmission, '_blank')}
                            >
                              Link
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Self Declaration:</span>
                        <span>{journalist.selfDeclaration ? 'Yes' : 'No'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Terms Agreement:</span>
                        <span>{journalist.termsAgreement ? 'Yes' : 'No'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Created At:</span>
                        <span>{new Date(journalist.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Action:</span>
                        <button
                          className={styles.verifyButton}
                          onClick={() => handleVerifyToggle(journalist._id, journalist.verified)}
                        >
                          {journalist.verified ? 'Unverify' : 'Verify'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>© 2025 Megheza – Verified Global Journalist Media Network. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}