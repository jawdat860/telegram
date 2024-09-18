import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Importing the heart icon from react-icons

const ServiceCard = ({ service, openOverlay }) => {
  return (
    <div
      key={service.id}
      data-aos="zoom-out"
      data-aos-duration="300"
      className="relative bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white rounded-lg shadow-lg transition-transform transform hover:scale-100 duration-300 cursor-pointer w-full sm:w-80 max-w-xs mx-auto"
      onClick={() => openOverlay(service)}
      aria-label={`Open details for ${service.title}`}
    >
      {/* Image container */}
      <div className="relative w-full h-40 sm:h-48">
        {/* Price and heart icon container */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-1">
          {/* Price on the left */}
          <p className="text-xs sm:text-sm font-bold text-white bg-black bg-opacity-50 px-1 py-0.5 rounded-lg">
            {service.price} ₽
          </p>
          {/* Heart icon in a circle */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <FaHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300" aria-label="Add to favorites" />
          </div>
        </div>

        <img
          src={service.image}
          alt={`${service.title} image`}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Service info */}
      <div className="p-2 sm:p-3 text-center">
        <h1 className="text-base sm:text-lg font-bold">{service.title}</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 group-hover:text-white line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
