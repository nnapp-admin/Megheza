import React from 'react';
import ProfileCard from './ProfileCard';
import styles from '../styles/Network.module.css';

// Mock data for 5 profiles (replace with API data in production)
const mockProfiles = [
  {
    name: 'Emma Wilson',
    profession: 'Freelance Journalist',
    bio: 'Passionate about uncovering hidden stories and connecting with global networks.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: false,
  },
  {
    name: 'John Smith',
    profession: 'Editor-in-Chief',
    bio: 'Leading content creation with a focus on impactful storytelling.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  },
  {
    name: 'Sarah Johnson',
    profession: 'Photojournalist',
    bio: 'Capturing moments that tell stories beyond words.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  },
  {
    name: 'Michael Chen',
    profession: 'Investigative Reporter',
    bio: 'Digging deep to reveal truths that matter.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: false,
  },
  {
    name: 'Lisa Patel',
    profession: 'Content Strategist',
    bio: 'Crafting narratives that resonate with audiences worldwide.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  },
];

const Network = ({ onClose }) => {
  return (
    <div className={styles.componentOverlay}>
      <div className={styles.component}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Network</h2>
        <div className={styles.profileGrid}>
          {mockProfiles.length === 0 ? (
            <p>No profiles available.</p>
          ) : (
            mockProfiles.map((profile, index) => (
              <ProfileCard key={index} initialUserData={profile} isRevealed={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Network;