import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/UserProfile.module.css';

export default function UserProfile({ user, setUser }) {
  const [editMode, setEditMode] = useState(null);
  const [tempValue, setTempValue] = useState('');

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

  return (
    <div className={`${styles.profileSection} scroll-reveal`}>
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
    </div>
  );
}