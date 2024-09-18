import React, { useState, useRef } from "react";
import Горячие from "../../assets/Горячие.png"
import Салаты from "../../assets/Салаты.png"
import Холодные from "../../assets/Холодные.png"
const CategorySlider = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Number of slides to show at a time
  const startX = useRef(0);
  const endX = useRef(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, Math.ceil(categories.length / slidesToShow) - 1));
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    const diff = startX.current - endX.current;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const slideStyle = {
    transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
  };

  return (
    <div
      className="relative overflow-hidden px-4 py-2 "
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex transition-transform duration-300 ease-in-out" style={slideStyle}>
        
        {categories.map((category) => (
            
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex flex-shrink-0 px-4 py-2 mx-2 cursor-pointer rounded-full text-center transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-xl'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <img src={Горячие}  className="w-[20px] mr-[10px] " alt="default"/>
            <p>
            {category}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive controls */}
     
    </div>
  );
};

export default CategorySlider;
