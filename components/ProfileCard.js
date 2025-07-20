import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/ProfileCard.module.css';

const ProfileCard = ({ initialUserData, isRevealed = false }) => {
  const [user] = useState({
    name: initialUserData?.name || 'Alex Rivera',
    profession: initialUserData?.profession || 'Pulse Narrative',
    bio: initialUserData?.bio || 'The Meghieza connected me with creators worldwide. Every project here feels like a collaboration with purpose.',
    profilePic: initialUserData?.profilePic || '/assets/profile-placeholder.png',
    isOnline: initialUserData?.isOnline || true,
  });

  return (
    <div className={`${styles.profileSection} ${isRevealed ? styles.revealed : styles.scrollReveal}`}>
      <div className={styles.statusContainer}>
        <div className={styles.statusToggle}>
          <div 
            className={`${styles.statusIndicator} ${user.isOnline ? styles.online : styles.offline}`}
          ></div>
          <span className={styles.statusText}>
            {user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        <button className={styles.messageButton} aria-label="Send Message">
          <svg className={styles.messageIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
            <path d="M7 9H17V11H7V9ZM7 13H13V15H7V13Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicContainer}>
          <Image
            src={user.profilePic}
            alt="Profile Picture"
            width={80}
            height={80}
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileInfoRow}>
            <h2 className={styles.profileName}>{user.name}</h2>
          </div>
          <div className={styles.profileInfoRow}>
            <p className={styles.profileProfession}>{user.profession}</p>
          </div>
        </div>
      </div>
      <div className={styles.profileBioContainer}>
        <div className={styles.profileBio}>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;