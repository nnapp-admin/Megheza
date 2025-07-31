import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Splash.module.css';
import { useState, useEffect } from 'react';

export default function SplashPage() {
  const router = useRouter();
  const fullText = 'Every journalist has a story. This one begins with a click.';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100); // Adjust speed of typing here (100ms per character)
      return () => clearTimeout(typingTimeout);
    }
  }, [index, fullText]);

  const handleLogoClick = () => {
    router

.push('/home');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Every journalist has a story. This one begins with a click.</title>
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
      <div className={styles.splashContainer}>
        <img
          src="/assets/Logo.png"
          alt="Megheza Logo"
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
        <h1 className={styles.tagline}>{displayedText}<span className={styles.cursor}>|</span></h1>
      </div>
    </>
  );
}