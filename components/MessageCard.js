import React, { useState } from 'react';
import styles from '../styles/MessageCard.module.css';

const MessageCard = ({ chatList }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToMessages = () => {
    setSelectedChat(null);
  };

  return (
    <div className={`${styles.chatSection} scroll-reveal`}>
      <h3>Messages</h3>
      <div className={styles.chatContent}>
        <div
          className={`${styles.chatListWrapper} ${
            selectedChat ? styles.fadeOut : styles.fadeIn
          }`}
        >
          {!selectedChat && (
            <ul className={styles.chatList}>
              {chatList.map((chat) => (
                <li
                  key={chat.id}
                  className={styles.chatItem}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className={styles.chatAvatar}></div>
                  <div className={styles.chatInfo}>
                    <h4>{chat.name}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <span className={styles.chatTime}>{chat.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={`${styles.chatWindowWrapper} ${
            selectedChat ? styles.fadeIn : styles.fadeOut
          }`}
        >
          {selectedChat && (
            <ChatWindow chat={selectedChat} onBack={handleBackToMessages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;

const ChatWindow = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: chat.name, text: chat.lastMessage, time: chat.time },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      // Simulate a reply after 1 second
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: chat.name,
            text: `Reply to: ${newMessage}`,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <button className={styles.backButton} onClick={onBack}>
          ←
        </button>
        <h4>{chat.name}</h4>
      </div>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender === 'You' ? styles.sent : styles.received
            }`}
          >
            <div className={styles.messageContent}>
              <p>{msg.text}</p>
              <span className={styles.messageTime}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className={styles.messageForm}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};