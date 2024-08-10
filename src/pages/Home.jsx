import React from "react";
import HeroSection from "../components/core/Homepage/HeroSection";
import ServicesSection from "../components/core/Homepage/ServicesSection";
import AboutSection from "../components/core/Homepage/AboutSection";
import SlidingReviewSection from "../components/core/Homepage/SlidingReviewSection";

function Home(){
    const featuredItems = [
        {
          image: '/path-to-image1.jpg',
          title: 'Featured Crop 1',
          description: 'Description of the featured crop 1.'
        },
        {
          image: '/path-to-image2.jpg',
          title: 'Featured Crop 2',
          description: 'Description of the featured crop 2.'
        },
        {
          image: '/path-to-image3.jpg',
          title: 'Featured Crop 3',
          description: 'Description of the featured crop 3.'
        },
      ];
    return(
        <div>
        <HeroSection />
        <AboutSection />
        <SlidingReviewSection items={featuredItems} />
        </div>
    )
}

export default Home;