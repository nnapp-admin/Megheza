import { useState } from 'react';
import Shop from './Shop';
import styles from '../styles/ContinentShop.module.css';

const ContinentShop = ({ continentName, onClose }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [isAnyPdfOpen, setIsAnyPdfOpen] = useState(false);

  const shopItems = [
    {
      thumbnail: `/assets/${continentName.replace(' ', '')}.jpg`,
      title: `Premium Article - ${continentName} 1`,
      price: 29.99,
    },
    {
      thumbnail: `/assets/${continentName.replace(' ', '')}.jpg`,
      title: `Premium Article - ${continentName} 2`,
      price: 29.99,
    },
    {
      thumbnail: `/assets/${continentName.replace(' ', '')}.jpg`,
      title: `Premium Article - ${continentName} 3`,
      price: 29.99,
    },
    {
      thumbnail: `/assets/${continentName.replace(' ', '')}.jpg`,
      title: `Premium Article - ${continentName} 4`,
      price: 29.99,
    },
  ];

  const handleOpenPdf = (index) => {
    setActiveCardIndex(index);
    setIsAnyPdfOpen(true);
  };

  const handleClosePdf = () => {
    setActiveCardIndex(null);
    setIsAnyPdfOpen(false);
  };

  if (isAnyPdfOpen && activeCardIndex !== null) {
    return (
      <div className={styles.shopContainer}>
        <Shop
          thumbnail={shopItems[activeCardIndex].thumbnail}
          title={shopItems[activeCardIndex].title}
          price={shopItems[activeCardIndex].price}
          onBuyClick={() => console.log(`Buy button clicked for ${shopItems[activeCardIndex].title}`)}
          isActive={true}
          isAnyPdfOpen={true}
          isPdfViewerRequested={true}
          onOpenPdf={() => handleOpenPdf(activeCardIndex)}
          onClosePdf={handleClosePdf}
        />
      </div>
    );
  }

  return (
    <div className={styles.shopGrid}>
      {shopItems.map((item, index) => (
        <Shop
          key={`${continentName}-${index}`}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          onBuyClick={() => console.log(`Buy button clicked for ${item.title}`)}
          isActive={true}
          isAnyPdfOpen={false}
          isPdfViewerRequested={false}
          onOpenPdf={() => handleOpenPdf(index)}
          onClosePdf={handleClosePdf}
        />
      ))}
    </div>
  );
};

export default ContinentShop;