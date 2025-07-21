import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MessageCard from '../components/MessageCard';
import UserProfile from '../components/UserProfile';
import ProfileCard from '../components/ProfileCard';
import styles from '../styles/Dashboard.module.css';

// Dynamically import Shop component with SSR disabled
const Shop = dynamic(() => import('../components/Shop'), { ssr: false });

// Continents component
const Continents = ({ onContinentClick }) => {
  const continents = [
    { name: 'Africa', image: '/assets/Africa.jpg' },
    { name: 'Antarctica', image: '/assets/Antarctica.jpg' },
    { name: 'Asia', image: '/assets/Asia.jpg' },
    { name: 'Australia', image: '/assets/Australia.jpg' },
    { name: 'Europe', image: '/assets/Europe.jpg' },
    { name: 'North America', image: '/assets/NorthAmerica.jpg' },
    { name: 'South America', image: '/assets/SouthAmerica.jpg' },
  ];

  return (
    <div className={styles.profileGrid}>
      {continents.map((continent) => (
        <div
          key={continent.name}
          className={styles.continentCard}
          onClick={() => onContinentClick(continent.name)}
        >
          <div className={styles.thumbnailContainer}>
            <Image
              src={continent.image}
              alt={`${continent.name} thumbnail`}
              width={200}
              height={200}
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{continent.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isContinentsOpen, setIsContinentsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const [user, setUser] = useState({
    name: 'Alex Rivera',
    profession: 'Pulse Narrative',
    bio: 'The Megheza connected me with creators worldwide. Every project here feels like a collaboration with purpose.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  });

  const [chatList] = useState([
    { id: 1, name: 'John Smith', lastMessage: 'Hey, check out this story...', time: '10:30 AM' },
    { id: 2, name: 'Emma Wilson', lastMessage: 'Can we discuss the article?', time: 'Yesterday' },
    { id: 3, name: 'Global News Group', lastMessage: 'New assignment posted', time: '2 days ago' },
  ]);

  useEffect(() => {
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

    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 1000);

    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

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
    setIsDashboardVisible(false);
    setTimeout(() => {
      setIsNetworkOpen(true);
      setIsShopOpen(false);
      setIsContinentsOpen(false);
      setIsSidebarOpen(false);
    }, 300);
  };

  const handleShopClick = () => {
    setIsDashboardVisible(false);
    setTimeout(() => {
      setIsContinentsOpen(true);
      setIsShopOpen(false);
      setIsNetworkOpen(false);
      setIsSidebarOpen(false);
    }, 300);
  };

  const handleContinentClick = (continentName) => {
    setSelectedContinent(continentName);
    setIsContinentsOpen(false);
    setTimeout(() => {
      setIsShopOpen(true);
    }, 300);
  };

  const handleCloseComponent = () => {
    setIsNetworkOpen(false);
    setIsShopOpen(false);
    setIsContinentsOpen(false);
    setSelectedContinent(null);
    setTimeout(() => {
      setIsDashboardVisible(true);
    }, 300);
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
      </Head>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <button className={styles.logo} onClick={handleCloseComponent}>
              <Image src="/assets/Logo.png" alt="The Megheza Logo" width={48} height={48} className={styles.logoImage} />
              <span className={styles.logoText}>Megheza</span>
            </button>
            <div className={styles.headerButtons}>
              <button className={styles.headerButton} onClick={handleNetworkClick}>
                Network
              </button>
              <button className={styles.headerButton} onClick={handleShopClick}>
                Resources
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
              <div className={`${styles.dashboardContent} ${isDashboardVisible ? styles.visible : styles.hidden}`}>
                <UserProfile user={user} setUser={setUser} />
                <MessageCard chatList={chatList} />
              </div>

              {isNetworkOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <ProfileCard initialUserData={user} isRevealed={true} />
                  </div>
                </div>
              )}
              {isContinentsOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <Continents onContinentClick={handleContinentClick} />
                  </div>
                </div>
              )}
              {isShopOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <Shop
                      thumbnail="/assets/shop-placeholder.png"
                      price={29.99}
                      title={`Premium Article - ${selectedContinent || 'Global'}`}
                      onBuyClick={() => console.log(`Buy button clicked for ${selectedContinent || 'Global'}`)}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <button className={styles.closeSidebar} onClick={toggleSidebar}>
            ×
          </button>
          <button className={styles.sidebarButton} onClick={handleNetworkClick}>
            Network
          </button>
          <button className={styles.sidebarButton} onClick={handleShopClick}>
            Resources
          </button>
        </div>

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
      <style jsx>{`
        .${styles.logo} {
          border: none;
          outline: none;
          background: none;
          padding: 0;
        }
      `}</style>
    </>
  );
}