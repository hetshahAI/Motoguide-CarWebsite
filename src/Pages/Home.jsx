// src/Pages/Home.js
import React, { useRef, useState } from 'react';
import CarSlider from '../components/CarSlider';
import { Button } from '@mui/material';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const sliderRef = useRef(null);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const tr = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  const handleExploreClick = () => {
    sliderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAll = () => {
    setShowAllBrands(!showAllBrands);
  };

  const handleBrandClick = (brandName) => {
    // Redirect to search page with brand name as query
    navigate(`/search?query=${encodeURIComponent(brandName)}`);
  };

  const supercarImages = [
    {
      name: "Ferrari F8 Tributo",
      image: 'https://th.bing.com/th/id/R.d548e74164c64b1dd8dc3219928983f8?rik=EFaymbFcpKPWSg&riu=http%3a%2f%2fwww.zacoe.com%2fimages%2fferrari_sf90%2f45%2ffront45_after.png&ehk=j6TeQ8r3JhKXQXSbG4M2lo4nXHtE%2bpDiAE%2fN50D1vcg%3d&risl=&pid=ImgRaw&r=0',
      price: "$1,200,000"
    },
    {
      name: "Lamborghini Aventador SVJ",
      image: 'https://th.bing.com/th/id/R.6ef3772c9166c46b182bb99d16f11677?rik=Z2H9x6wx%2bS5X1A&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2flamborghini-aventador-svj-63-2018-front-k7.jpg&ehk=ccR%2f6if5%2fVyZXuoafnzIvAy5YT4srwq3HoaikhJluP8%3d&risl=&pid=ImgRaw&r=0',
      price: "$900,000"
    },
    {
      name: "McLaren 720S",
      image: 'https://wallpapercave.com/wp/wp2148417.jpg',
      price: "$850,000"
    }
  ];

  const luxuryCarImages = [
    {
      name: "Rolls-Royce Phantom",
      image: 'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2022/09/Rolls-Royce-Phantom-Series-II-Featured.jpg',
      price: "$600,000"
    },
    {
      name: "Mercedes-Maybach S-Class",
      image: 'https://www.hdcarwallpapers.com/walls/2018_vision_mercedes_maybach_ultimate_luxury_interior_4k-HD.jpg',
      price: "$450,000"
    },
    {
      name: "Bentley Continental GT",
      image: 'https://st.automobilemag.com/uploads/sites/5/2018/11/2019-Bentley-Continental-GT-Convertible-front-interior.jpg',
      price: "$350,000"
    }
  ];

  const carBrands = [
    { logo: 'https://www.carlogos.org/car-logos/acura-logo.png', name: 'Acura' },
    { logo: 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png', name: 'Alfa Romeo' },
    { logo: 'https://www.carlogos.org/car-logos/aston-martin-logo.png', name: 'Aston Martin' },
    { logo: 'https://www.carlogos.org/car-logos/audi-logo.png', name: 'Audi' },
    { logo: 'https://www.carlogos.org/car-logos/baic-logo.png', name: 'BAIC' },
    { logo: 'https://www.carlogos.org/car-logos/bentley-logo.png', name: 'Bentley' },
    { logo: 'https://www.carlogos.org/car-logos/bmw-logo.png', name: 'BMW' },
    { logo: 'https://www.carlogos.org/car-logos/buick-logo.png', name: 'Buick' },
    { logo: 'https://www.carlogos.org/car-logos/bugatti-logo.png', name: 'Bugatti' },
    { logo: 'https://www.carlogos.org/car-logos/byd-logo.png', name: 'BYD' },
    { logo: 'https://www.carlogos.org/car-logos/cadillac-logo.png', name: 'Cadillac' },
    { logo: 'https://www.carlogos.org/car-logos/chery-logo.png', name: 'Chery' },
    { logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png', name: 'Chevrolet' },
    { logo: 'https://www.carlogos.org/car-logos/chrysler-logo.png', name: 'Chrysler' },
    { logo: 'https://www.carlogos.org/car-logos/citroen-logo.png', name: 'Citroen' },
    { logo: 'https://www.carlogos.org/car-logos/daewoo-logo.png', name: 'Daewoo' },
    { logo: 'https://www.carlogos.org/car-logos/daihatsu-logo.png', name: 'Daihatsu' },
    { logo: 'https://www.carlogos.org/car-logos/dodge-logo.png', name: 'Dodge' },
    { logo: 'https://www.carlogos.org/car-logos/faw-logo.png', name: 'FAW' },
    { logo: 'https://www.carlogos.org/car-logos/ferrari-logo.png', name: 'Ferrari' },
    { logo: 'https://www.carlogos.org/car-logos/fiat-logo.png', name: 'Fiat' },
    { logo: 'https://www.carlogos.org/car-logos/ford-logo.png', name: 'Ford' },
    { logo: 'https://www.carlogos.org/car-logos/genesis-logo.png', name: 'Genesis' },
    { logo: 'https://www.carlogos.org/car-logos/geely-logo.png', name: 'Geely' },
    { logo: 'https://www.carlogos.org/car-logos/gmc-logo.png', name: 'GMC' },
    { logo: 'https://www.carlogos.org/car-logos/great-wall-logo.png', name: 'Great Wall' },
    { logo: 'https://www.carlogos.org/car-logos/haval-logo.png', name: 'Haval' },
    { logo: 'https://www.carlogos.org/car-logos/honda-logo.png', name: 'Honda' },
    { logo: 'https://www.carlogos.org/car-logos/hyundai-logo.png', name: 'Hyundai' },
    { logo: 'https://www.carlogos.org/car-logos/infiniti-logo.png', name: 'Infiniti' },
    { logo: 'https://www.carlogos.org/car-logos/jaguar-logo.png', name: 'Jaguar' },
    { logo: 'https://www.carlogos.org/car-logos/jeep-logo.png', name: 'Jeep' },
    { logo: 'https://www.carlogos.org/car-logos/kia-logo.png', name: 'Kia' },
    { logo: 'https://www.carlogos.org/car-logos/koenigsegg-logo.png', name: 'Koenigsegg' },
    { logo: 'https://www.carlogos.org/car-logos/lamborghini-logo.png', name: 'Lamborghini' },
    { logo: 'https://www.carlogos.org/car-logos/lancia-logo.png', name: 'Lancia' },
    { logo: 'https://www.carlogos.org/car-logos/land-rover-logo.png', name: 'Land Rover' },
    { logo: 'https://www.carlogos.org/car-logos/lexus-logo.png', name: 'Lexus' },
    { logo: 'https://www.carlogos.org/car-logos/lincoln-logo.png', name: 'Lincoln' },
    { logo: 'https://www.carlogos.org/car-logos/lotus-logo.png', name: 'Lotus' },
    { logo: 'https://www.carlogos.org/car-logos/lynk-co-logo.png', name: 'Lynk & Co' },
    { logo: 'https://www.carlogos.org/car-logos/mahindra-logo.png', name: 'Mahindra' },
    { logo: 'https://www.carlogos.org/car-logos/maserati-logo.png', name: 'Maserati' },
    { logo: 'https://www.carlogos.org/car-logos/maybach-logo.png', name: 'Maybach' },
    { logo: 'https://www.carlogos.org/car-logos/mclaren-logo.png', name: 'McLaren' },
    { logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', name: 'Mercedes-Benz' },
    { logo: 'https://www.carlogos.org/car-logos/mg-logo.png', name: 'MG' },
    { logo: 'https://www.carlogos.org/car-logos/mini-logo.png', name: 'Mini' },
    { logo: 'https://www.carlogos.org/car-logos/nissan-logo.png', name: 'Nissan' },
    { logo: 'https://www.carlogos.org/car-logos/weilai-logo.png', name: 'NIO' },
    { logo: 'https://www.carlogos.org/car-logos/pagani-logo.png', name: 'Pagani' },
    { logo: 'https://www.carlogos.org/car-logos/peugeot-logo.png', name: 'Peugeot' },
    { logo: 'https://www.carlogos.org/car-logos/perodua-logo.png', name: 'Perodua' },
    { logo: 'https://www.carlogos.org/car-logos/porsche-logo.png', name: 'Porsche' },
    { logo: 'https://www.carlogos.org/car-logos/proton-logo.png', name: 'Proton' },
    { logo: 'https://www.carlogos.org/car-logos/ram-logo.png', name: 'RAM' },
    { logo: 'https://www.carlogos.org/car-logos/renault-logo.png', name: 'Renault' },
    { logo: 'https://www.carlogos.org/car-logos/rolls-royce-logo.png', name: 'Rolls Royce' },
    { logo: 'https://www.carlogos.org/car-logos/roewe-logo.png', name: 'Roewe' },
    { logo: 'https://www.carlogos.org/car-logos/saab-logo.png', name: 'Saab' },
    { logo: 'https://www.carlogos.org/car-logos/saic-logo.png', name: 'SAIC' },
    { logo: 'https://www.carlogos.org/car-logos/seat-logo.png', name: 'Seat' },
    { logo: 'https://www.carlogos.org/car-logos/skoda-logo.png', name: 'Skoda' },
    { logo: 'https://www.carlogos.org/car-logos/ssangyong-logo.png', name: 'SsangYong' },
    { logo: 'https://www.carlogos.org/car-logos/subaru-logo.png', name: 'Subaru' },
    { logo: 'https://www.carlogos.org/car-logos/suzuki-logo.png', name: 'Suzuki' },
    { logo: 'https://www.carlogos.org/car-logos/tata-logo.png', name: 'Tata' },
    { logo: 'https://www.carlogos.org/car-logos/tesla-logo.png', name: 'Tesla' },
    { logo: 'https://www.carlogos.org/car-logos/toyota-logo.png', name: 'Toyota' },
    { logo: 'https://www.carlogos.org/car-logos/venucia-logo.png', name: 'Venucia' },
    { logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png', name: 'Volkswagen' },
    { logo: 'https://www.carlogos.org/car-logos/volvo-logo.png', name: 'Volvo' },
    { logo: 'https://www.carlogos.org/car-logos/xpeng-logo.png', name: 'XPeng' },
    { logo: 'https://www.carlogos.org/car-logos/zotye-logo.png', name: 'Zotye' }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text-overlay">
            <h1 className="hero-title">{tr('welcomeTitle', 'WELCOME TO MOTOGUIDE')}</h1>
            <p className="hero-subtitle">{tr('welcomeSubtitle', 'Where Luxury Meets Speed')}</p>
            <p className="hero-description">
              {tr('welcomeDescription', "Experience the thrill of the world's most elite automotive machines, designed for performance and elegance.")}
            </p>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleExploreClick}
              className="explore-button"
            >
              {tr('exploreCollection', 'EXPLORE COLLECTION')}
            </Button>
          </div>
        </div>
      </section>
      {/* CarSlider Section */}
      <section ref={sliderRef} className="slider-section">
        <CarSlider 
          title={tr('supercarCollection', 'Supercar Collection')}
          images={supercarImages} 
        />
        <CarSlider 
          title={tr('luxuryCollection', 'Luxurious Cars Collection')}
          images={luxuryCarImages} 
        />
      </section>

      {/* Shopping by Car Section */}
      <section className="car-brands-section">
        <div className="section-header">
          <h2>{tr('browseByBrands', 'Browse by brands?')}</h2>
          <p>{tr('chooseABrand', 'Choose A Brand.')}</p>
        </div>
        <div className={`brands-grid ${showAllBrands ? 'show-all' : ''}`}>
          {carBrands.map((brand, index) => (
            <div 
              key={index} 
              className="brand-item"
              onClick={() => handleBrandClick(brand.name)}
              role="button"
              tabIndex={0}
              data-brand={brand.name}
            >
              <img src={brand.logo} alt={brand.name} />
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
        <div className="view-all-btn-wrapper">
          <button className="view-all" onClick={handleViewAll}>
            {showAllBrands ? tr('showLess', 'Show Less') : tr('viewAll', 'View All')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;