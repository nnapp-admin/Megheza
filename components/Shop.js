import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from '../styles/Shop.module.css';

// Dynamically import react-pdf components with SSR disabled
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

const Shop = ({ thumbnail = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', price = 0, title = 'Item', onBuyClick, isActive = true, isAnyPdfOpen = false, isPdfViewerRequested = false, onOpenPdf, onClosePdf }) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [workerError, setWorkerError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const maxPages = 4;

  useEffect(() => {
    console.log('Shop.js: Running in browser:', typeof window !== 'undefined');
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
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

  useEffect(() => {
    if (isPdfViewerRequested && !isPdfViewerOpen && isAnyPdfOpen) {
      handleCardClick();
    } else if (!isPdfViewerRequested && isPdfViewerOpen) {
      handleCloseViewer();
    }
  }, [isPdfViewerRequested, isAnyPdfOpen]);

  const onDocumentLoadSuccess = ({ numPages: totalPages }) => {
    console.log('Shop.js: PDF loaded successfully, total pages:', totalPages);
    setNumPages(Math.min(totalPages, maxPages));
    setIsPdfLoading(false);
  };

  const handleCardClick = () => {
    if (workerError) {
      console.error('Shop.js: Cannot open PDF viewer due to worker error:', workerError);
      return;
    }
    setIsPdfViewerOpen(true);
    setCurrentPage(1);
    setIsPdfLoading(true);
    if (onOpenPdf) onOpenPdf();
  };

  const handleCloseViewer = () => {
    setIsPdfViewerOpen(false);
    setIsPdfLoading(false);
    if (onClosePdf) onClosePdf();
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

  const pdfWidth = isMobile ? 354 : 566;
  const pdfHeight = isMobile ? 500 : 800;

  if (!isActive && isAnyPdfOpen && isPdfViewerOpen) return null;

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
              <>
                {isPdfLoading && (
                  <div className={styles.loadingSpinner} style={{ width: pdfWidth, height: pdfHeight }}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
                <Document
                  file="/assets/Article.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => {
                    console.error('Shop.js: Failed to load PDF:', error);
                    setIsPdfLoading(false);
                  }}
                  className={`${styles.pdfDocument} ${isPdfLoading ? styles.hidden : ''}`}
                >
                  {!isPdfLoading && (
                    <Page
                      pageNumber={currentPage}
                      width={pdfWidth}
                      height={pdfHeight}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  )}
                </Document>
              </>
            )}
            <div className={styles.pdfControls}>
              <button
                className={styles.navButton}
                onClick={handlePreviousPage}
                disabled={currentPage <= 1 || isPdfLoading}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {Math.min(numPages || 0, maxPages)}
              </span>
              <button
                className={styles.navButton}
                onClick={handleNextPage}
                disabled={currentPage >= Math.min(numPages || maxPages, maxPages) || isPdfLoading}
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