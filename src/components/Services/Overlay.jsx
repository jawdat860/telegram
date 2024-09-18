import React, { useState, useEffect } from 'react';
import './overlay.css'; // Import the CSS file

const Overlay = ({ isOpen, service, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dragOffset, setDragOffset] = useState(0);
  const [startY, setStartY] = useState(0);
  const dragThreshold = 150; // Define the threshold for closing

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDragOffset(0); // Reset drag offset when closing
    }
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY); // Capture the initial touch point (Y-axis)
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY; // Calculate how much the user has moved
    if (deltaY > 0) {
      setDragOffset(deltaY); // Update the drag offset only if moving downward
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > dragThreshold) {
      onClose(); // Close if dragged beyond threshold
    } else {
      setDragOffset(0); // Reset if not dragged enough
    }
  };

  const handleOrder = () => {
    alert('Order button clicked!');
  };

  if (!isOpen || !service) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Main overlay content */}
      <div
        className={`fixed z-50 transition-transform duration-300 ${isMobile
          ? 'bottom-0 left-0 right-0'
          : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          } bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col`}
        style={
          isMobile
            ? {
                transform: `translateY(${dragOffset}px)`,
                transition: dragOffset === 0 ? 'transform 0.3s ease' : 'none', // Snap back if not dragged enough
              }
            : {}
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative mb-4 w-full h-48">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h2 className="text-center text-xl font-bold mb-2 dark:text-white">{service.title}</h2>
        <p className="text-center dark:text-gray-300 mb-4">{service.description}</p>
        <p className="text-center text-lg font-bold text-primary dark:text-secondary mb-6">
          {service.price} ₽
        </p>
        {!isMobile && (
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleOrder}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Overlay;
