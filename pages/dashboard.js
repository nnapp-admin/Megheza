import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Network from './Network'; // Import the actual Network component
import styles from '../styles/Dashboard.module.css'; // Import CSS module for dashboard styling

export default function Dashboard() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [editMode, setEditMode] = useState(null); // 'pic', 'name', 'profession', 'bio'
  const [tempValue, setTempValue] = useState('');
  
  // Mock user data (replace with actual user data from auth context or API)
  const [user, setUser] = useState({
    name: 'Alex Rivera',
    profession: 'Pulse Narrative',
    bio: 'The Megheza connected me with creators worldwide. Every project here feels like a collaboration with purpose.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  });
  // Mock chat list data (replace with actual data from API)
  const [chatList] = useState([
    { id: 1, name: 'John Smith', lastMessage: 'Hey, check out this story...', time: '10:30 AM' },
    { id: 2, name: 'Emma Wilson', lastMessage: 'Can we discuss the article?', time: 'Yesterday' },
    { id: 3, name: 'Global News Group', lastMessage: 'New assignment posted', time: '2 days ago' },
  ]);

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(`.${styles.scrollReveal}`).forEach((el) => {
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

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', {
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
    setIsLoginModalOpen(false);
  };

  const handleNetworkClick = () => {
    setIsNetworkOpen(true);
    setIsSidebarOpen(false); // Close sidebar on selection
  };

  const handleShopClick = () => {
    setIsShopOpen(true);
    setIsSidebarOpen(false); // Close sidebar on selection
  };

  const handleCloseComponent = () => {
    setIsNetworkOpen(false);
    setIsShopOpen(false);
  };

  const handleEditClick = (field) => {
    setEditMode(field);
    if (field === 'name') setTempValue(user.name);
    else if (field === 'profession') setTempValue(user.profession);
    else if (field === 'bio') setTempValue(user.bio);
  };

  const handleSaveEdit = () => {
    if (editMode === 'name') {
      setUser(prev => ({ ...prev, name: tempValue }));
    } else if (editMode === 'profession') {
      setUser(prev => ({ ...prev, profession: tempValue }));
    } else if (editMode === 'bio') {
      setUser(prev => ({ ...prev, bio: tempValue }));
    }
    setEditMode(null);
    setTempValue('');
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setTempValue('');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser(prev => ({ ...prev, profilePic: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
    setEditMode(null);
  };

  const toggleOnlineStatus = () => {
    setUser(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Journalist Dashboard - The Megheza</title>
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
          <nav className={styles.nav}>
            <a href="#" className={styles.logo}>
              <Image src="/assets/Logo.png" alt="The Megheza Logo" width={48} height={48} className={styles.logoImage} />
              <span className={styles.logoText}>Megheza</span>
            </a>
            <div className={styles.headerButtons}>
              <button className={styles.headerButton} onClick={handleNetworkClick}>
                Network
              </button>
              <button className={styles.headerButton} onClick={handleShopClick}>
                Shop
              </button>
            </div>
            <button className={styles.hamburger} onClick={toggleSidebar}>
              ☰
            </button>
          </nav>
        </header>

        <main className={styles.main}>
          <section className={styles.dashboardSection}>
            <div className={styles.container}>
              <div className={`${styles.profileSection} ${styles.scrollReveal}`}>
                {/* Status Toggle - Top Right */}
                <div className={styles.statusToggle}>
                  <div 
                    className={`${styles.statusIndicator} ${user.isOnline ? styles.online : styles.offline}`}
                  ></div>
                  <span className={styles.statusText} onClick={toggleOnlineStatus}>
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>

                <div className={styles.profileHeader}>
                  <div className={styles.profilePicContainer}>
                    <Image
                      src={user.profilePic}
                      alt="Profile Picture"
                      width={80}
                      height={80}
                      className={styles.profilePic}
                      onClick={() => handleEditClick('pic')}
                    />
                    <div className={styles.editIcon} onClick={() => handleEditClick('pic')}>
                      ✏️
                    </div>
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.profileInfoRow}>
                      <h2 className={styles.profileName} onClick={() => handleEditClick('name')}>
                        {user.name}
                      </h2>
                      <span className={styles.textEditIcon} onClick={() => handleEditClick('name')}>
                        ✏️
                      </span>
                    </div>
                    <div className={styles.profileInfoRow}>
                      <p className={styles.profileProfession} onClick={() => handleEditClick('profession')}>
                        {user.profession}
                      </p>
                      <span className={styles.textEditIcon} onClick={() => handleEditClick('profession')}>
                        ✏️
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.profileBioContainer}>
                  <div className={styles.profileBio} onClick={() => handleEditClick('bio')}>
                    <p>{user.bio}</p>
                  </div>
                  <span className={styles.textEditIcon} onClick={() => handleEditClick('bio')}>
                    ✏️
                  </span>
                </div>
              </div>

              <div className={`${styles.chatSection} ${styles.scrollReveal}`}>
                <h3>Messages</h3>
                <ul className={styles.chatList}>
                  {chatList.map((chat) => (
                    <li key={chat.id} className={styles.chatItem}>
                      <div className={styles.chatAvatar}></div>
                      <div className={styles.chatInfo}>
                        <h4>{chat.name}</h4>
                        <p>{chat.lastMessage}</p>
                      </div>
                      <span className={styles.chatTime}>{chat.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Edit Modals */}
              {editMode === 'pic' && (
                <div className={styles.modalOverlay}>
                  <div className={styles.editModal}>
                    <button className={styles.closeButton} onClick={handleCancelEdit}>
                      ×
                    </button>
                    <h3>Change Profile Picture</h3>
                    <div className={styles.editForm}>
                      <div className={styles.uploadBox}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          className={styles.fileInput}
                          id="profile-pic-upload"
                        />
                        <label htmlFor="profile-pic-upload" className={styles.uploadLabel}>
                          <div className={styles.uploadContent}>
                            <div className={styles.uploadIcon}>📷</div>
                            <div className={styles.uploadText}>
                              <span>Click to upload image</span>
                              <small>JPG, PNG, GIF up to 10MB</small>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editMode === 'name' && (
                <div className={styles.modalOverlay}>
                  <div className={styles.editModal}>
                    <button className={styles.closeButton} onClick={handleCancelEdit}>
                      ×
                    </button>
                    <h3>Edit Name</h3>
                    <div className={styles.editForm}>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={styles.editInput}
                        placeholder="Enter your name"
                        autoFocus
                      />
                      <div className={styles.editButtons}>
                        <button className={styles.cancelButton} onClick={handleCancelEdit}>
                          Cancel
                        </button>
                        <button className={styles.saveButton} onClick={handleSaveEdit}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editMode === 'profession' && (
                <div className={styles.modalOverlay}>
                  <div className={styles.editModal}>
                    <button className={styles.closeButton} onClick={handleCancelEdit}>
                      ×
                    </button>
                    <h3>Edit Profession</h3>
                    <div className={styles.editForm}>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={styles.editInput}
                        placeholder="Enter your profession"
                        autoFocus
                      />
                      <div className={styles.editButtons}>
                        <button className={styles.cancelButton} onClick={handleCancelEdit}>
                          Cancel
                        </button>
                        <button className={styles.saveButton} onClick={handleSaveEdit}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editMode === 'bio' && (
                <div className={styles.modalOverlay}>
                  <div className={styles.editModal}>
                    <button className={styles.closeButton} onClick={handleCancelEdit}>
                      ×
                    </button>
                    <h3>Edit Bio</h3>
                    <div className={styles.editForm}>
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={styles.editTextarea}
                        placeholder="Tell us about yourself"
                        autoFocus
                      />
                      <div className={styles.editButtons}>
                        <button className={styles.cancelButton} onClick={handleCancelEdit}>
                          Cancel
                        </button>
                        <button className={styles.saveButton} onClick={handleSaveEdit}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Network and Shop Components */}
              {isNetworkOpen && (
                <Network onClose={handleCloseComponent} />
              )}
              {isShopOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <h2>Shop Component</h2>
                    <p>Placeholder for Shop component (to be designed).</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Sidebar moved outside header */}
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <button className={styles.closeSidebar} onClick={toggleSidebar}>
            ×
          </button>
          <button className={styles.sidebarButton} onClick={handleNetworkClick}>
            Network
          </button>
          <button className={styles.sidebarButton} onClick={handleShopClick}>
            Shop
          </button>
        </div>

        {/* Login Modal (retained but not triggered since Login button is removed) */}
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