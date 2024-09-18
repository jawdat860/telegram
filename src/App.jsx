import React, { useState, useEffect } from 'react';
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services.jsx";
import Example from "./components/Example.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-900 dark:text-white duration-200`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Example theme={theme} />
      {/* <Hero /> */}
      <Services />
      {/* <Banner /> */}
      {/* <CoverBanner /> */}
      {/* <AppStore /> */}
      {/* <Testimonial /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
