import React from 'react';
import Slider from 'react-slick';
import './SlidingSection.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SlidingReviewSection = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="sliding-section">
      <h2>Featured Items</h2>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="slide-item">
            <div className=' w-[100px]'>
            <img src={item.image} alt={item.title}  />
            </div>
            <div className="slide-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SlidingReviewSection;