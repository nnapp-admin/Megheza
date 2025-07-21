import Image from 'next/image';
import styles from '../styles/Dashboard.module.css';

const ContinentsDisplay = ({ onContinentClick }) => {
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

export default ContinentsDisplay;