// src/components/CarSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './CarSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarSlider = ({ title, images, isTrending = false, isLarge = false }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '60px',
          arrows: false
        }
      }
    ]
  };

  const handleImageClick = (img) => {
    const carData = {
      name: img.name || "Supercar",
      image: img.image, // Fix: Use img.image (the URL string) instead of the entire img object
      price: img.price || "Price on Request",
      description: "Experience the thrill of this exceptional automobile, combining cutting-edge technology with remarkable performance.",
      specifications: {
        engine: "V8 Twin-Turbo",
        power: "600+ HP",
        transmission: "8-Speed Auto",
        fuelType: "Petrol",
        mileage: "8-10 kmpl"
      }
    };

    navigate(`/car/${encodeURIComponent(carData.name.toLowerCase().replace(/\s+/g, '-'))}`, {
      state: { car: carData }
    });
  };

  return (
    <div className={`slider-container ${isTrending ? 'trending-slider' : ''} ${isLarge ? 'large-slider' : ''}`}>
      <h2 className="slider-title">{title}</h2>
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i} className="slide" onClick={() => handleImageClick(img)}>
            <img src={img.image} alt={img.name} className="slide-image" />
            <div className="car-name">{img.name}</div>
            {isTrending && (
              <div className="trending-badge">
                <span>#{i + 1} Trending</span>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarSlider;
