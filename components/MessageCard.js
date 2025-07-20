import React from 'react';
import styles from '../styles/MessageCard.module.css';

const MessageCard = ({ chatList }) => {
  return (
    <div className={`${styles.chatSection} scroll-reveal`}> {/* Use a global class for animation */}
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
  );
};

export default MessageCard;