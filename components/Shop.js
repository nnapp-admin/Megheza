import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from '../styles/Shop.module.css';

// Dynamically import react-pdf components with SSR disabled
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

const Shop = ({ thumbnail = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', price = 0, title = 'Item', onBuyClick }) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [workerError, setWorkerError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const maxPages = 4; // Maximum pages to display

  // Set up client-side check, PDF worker, and screen size detection
  useEffect(() => {
    console.log('Shop.js: Running in browser:', typeof window !== 'undefined');
    setIsClient(true);

    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
      import('react-pdf').then(({ pdfjs }) => {
        console.log('Shop.js: Setting pdfjs workerSrc to /pdf.worker.min.js');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }).catch(err => {
        console.error('Shop.js: Failed to load pdfjs or set workerSrc:', err);
        setWorkerError(err.message);
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages: totalPages }) => {
    console.log('Shop.js: PDF loaded successfully, total pages:', totalPages);
    setNumPages(Math.min(totalPages, maxPages)); // Limit to maxPages
  };

  const handleCardClick = () => {
    if (workerError) {
      console.error('Shop.js: Cannot open PDF viewer due to worker error:', workerError);
      return;
    }
    setIsPdfViewerOpen(true);
    setCurrentPage(1); // Reset to first page when opening
  };

  const handleCloseViewer = () => {
    setIsPdfViewerOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < maxPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Set PDF dimensions based on screen size
  const pdfWidth = isMobile ? 354 : 566;
  const pdfHeight = isMobile ? 500 : 800;

  return (
    <div className={styles.shopContainer}>
      {workerError && (
        <div className={styles.errorMessage}>
          Error: Failed to load PDF worker. Please check if /pdf.worker.min.js is in the public directory.
        </div>
      )}
      {!isPdfViewerOpen ? (
        <div className={styles.shopCard} onClick={handleCardClick}>
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
            <button className={styles.buyButton} onClick={(e) => { e.stopPropagation(); onBuyClick(); }}>
              ${price.toFixed(2)}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.pdfViewer}>
          <button className={styles.closeButton} onClick={handleCloseViewer}>
            ×
          </button>
          <div className={styles.pdfContainer}>
            {isClient && (
              <Document
                file="/assets/Article.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error('Shop.js: Failed to load PDF:', error)}
                className={styles.pdfDocument}
              >
                <Page
                  pageNumber={currentPage}
                  width={pdfWidth}
                  height={pdfHeight}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            )}
            <div className={styles.pdfControls}>
              <button
                className={styles.navButton}
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {Math.min(numPages || 0, maxPages)}
              </span>
              <button
                className={styles.navButton}
                onClick={handleNextPage}
                disabled={currentPage >= Math.min(numPages || maxPages, maxPages)}
              >
                Next
              </button>
            </div>
            {currentPage === maxPages && (
              <button className={styles.buyButton} onClick={onBuyClick}>
                Buy Now - ${price.toFixed(2)}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;