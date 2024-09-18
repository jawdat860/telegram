import React, { useState, useEffect } from "react";
import axios from "axios";
import CategorySlider from "./CategorySlider"; // Import the CategorySlider component
import Горячие from "../../assets/Горячие.png";
import Overlay from "./Overlay";
import ServiceCard from './ServiceCard'; // Import the new ServiceCard component

const Services = () => {
  const [overlay, setOverlay] = useState({ isOpen: false, service: null });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post("https://menuapp.ru/api/v1");
      setServicesData(response.data);

      const allCategories = [...new Set(response.data.map(service => service.category))];
      setCategories(["All", ...allCategories]);

      setLoading(false);
    } catch (err) {
      setError("Failed to load services.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (overlay.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [overlay.isOpen]);

  const openOverlay = (service) => {
    setOverlay({ isOpen: true, service });
  };

  const closeOverlay = () => {
    setOverlay({ isOpen: false, service: null });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredServices = selectedCategory === "All"
    ? servicesData
    : servicesData.filter(service => service.category === selectedCategory);
console.log(servicesData);

  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Menu
            </p>
            <h1 className="text-3xl font-bold">Menu</h1>
            <p className="text-xs text-gray-400">
              Discover our delicious and diverse menu options.
            </p>
          </div>

          {/* Filter UI */}
          {isSmallScreen ? (
            <CategorySlider
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <div className="text-center">
              <ul className="flex justify-center gap-4 mb-6">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center cursor-pointer px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-primary hover:text-white transition-colors duration-300`}
                  >
                    <img src={Горячие} className="w-[30px] mr-[10px]" alt="default" />
                    <p>{category}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 place-items-center mt-[20px] p-[10px] overflow-x-hidden">
  {filteredServices.map((service) => (
    <ServiceCard key={service.id} service={service} openOverlay={openOverlay} />
  ))}
</div>

        </div>
      </div>

      <Overlay isOpen={overlay.isOpen} service={overlay.service} onClose={closeOverlay} />
    </>
  );
};

export default Services;
