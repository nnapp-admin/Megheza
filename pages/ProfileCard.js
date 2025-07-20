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
      <div className={styles.statusToggle}>
        <div 
          className={`${styles.statusIndicator} ${user.isOnline ? styles.online : styles.offline}`}
        ></div>
        <span className={styles.statusText}>
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