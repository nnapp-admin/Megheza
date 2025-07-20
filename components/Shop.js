import Image from 'next/image';
import styles from '../styles/Shop.module.css';

const Shop = ({ thumbnail = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', price = 0, title = 'Item', onBuyClick }) => {
  return (
    <div className={styles.shopCard}>
      <div className={styles.thumbnailContainer}>
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          width={200}
          height={200}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.buyButton} onClick={onBuyClick}>
          ${price.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Shop;