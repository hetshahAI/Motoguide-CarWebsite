import React, { useState } from 'react';
import CarCard from './components/CarCards';
import CarSlider from './components/CarSlider';

const carData = [
  { name: "Toyota GR Supra", image: "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-gr-supra-102-668c519da0fe1.jpg?crop=0.638xw:0.538xh;0.152xw,0.178xh&resize=2048:*", price: "85 Lakhs", link: "https://www.toyota.com/gr-supra/" },
  { name: "Nissan GT-R", image: "https://images.hindustantimes.com/auto/img/2024/03/10/1600x900/Nissan_GTR_1710045842834_1710045851827.webp", price: "2.1 CR", link: "https://www.nissanusa.com/vehicles/sports-cars/gt-r.html" },
  { name: "Chevrolet Corvette Stingray", image: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/763143-21.jpg?q=50&fit=crop&w=825&dpr=1.5", price: "1.5 CR", link: "https://www.chevrolet.com/performance/corvette" },
  { name: "BMW M4", image: "https://www.autopronashville.com/wp-content/uploads/2024-BMW-M4-black-stk-P38615-scaled.webp", price: "1.4 CR", link: "https://www.bmw.in/en/all-models/m-series/m4-coupe/2021/bmw-m4-coupe-overview.html" },
  { name: "Audi RS5 Sportback", image: "https://www.motortrend.com/uploads/sites/5/2021/07/2021-Audi-RS5-Sportbck-31.jpg?w=768&width=768&q=75&format=webp", price: "1.3 CR", link: "https://www.audi.in/in/web/en/models/a5/rs-5-sportback.html" },
  { name: "Jaguar F-Type R", image: "https://www.motortrend.com/uploads/2023/04/2024-Jaguar-F-Type-75-Coupe-Exterior-Driving-Front3Qr-01-e1681258016114.jpg?w=768&width=768&q=75&format=webp", price: "1.2 CR", link: "https://www.jaguar.in/jaguar-range/f-type/models/f-type-r-coupe.html" },
  { name: "Lexus LC 500", image: "https://images.autox.com/uploads/2021/01/2021-Lexus-LC-500-Inspiration-Series-Exterior-Front-Quarter.jpg", price: "2.1 CR", link: "https://www.lexus.com/models/LC" },
  { name: "Porsche Cayman GT4", image: "https://imageio.forbes.com/specials-images/imageserve/60b9cd8158516c3e20068a64/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds", price: "1 CR", link: "https://www.porsche.com/international/models/718/718-cayman-models/718-cayman-gt4/" },
  { name: "Alfa Romeo Giulia Quadrifoglio", image: "https://www.motortrend.com/files/663ba6be6cea3300081ea0f3/001-2024-alfa-romeo-giulia-quarifoglio-lead.jpg", price: "1.1 CR", link: "https://www.alfaromeousa.com/cars/alfa-romeo-giulia" },
  { name: "Maserati Ghibli Trofeo", image: "https://images.overdrive.in/wp-content/odgallery/2021/02/58427_2021_Maserati_Ghibli_468x263.jpg", price: "1.6 CR", link: "https://www.maserati.com/global/en/models/ghibli/trofeo" },
  { name: "Ford Mustang GT", image: "https://car-images.bauersecure.com/wp-images/3290/050_shelby_gt500.jpg", price: "80 Lakhs", link: "https://www.ford.com/cars/mustang/models/gt/" },
  { name: "Chevrolet Camaro SS", image: "https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-camaro-ss-collectors-edition-1-647e1933c6c20.jpg", price: "75 Lakhs", link: "https://www.chevrolet.com/performance/camaro/ss" },
  { name: "Tesla Model 3 Performance", image: "https://www.electrive.com/media/2024/10/tesla-model-3-long-range-2024-01.jpeg", price: "70 Lakhs", link: "https://www.tesla.com/model3" },
  { name: "BMW M2 Competition", image: "https://motoringwebuploads.s3.ap-south-1.amazonaws.com/wp-content/uploads/2018/11/11225809/BMW-M2-Competition-e1542448673174.jpg", price: "85 Lakhs", link: "https://www.bmw.in/en/all-models/m-series/m2-coupe/2021/bmw-m2-coupe-overview.html" },
  { name: "Audi TT RS", image: "https://uploads.audi-mediacenter.com/system/production/media/113813/images/bf3264ff57155733d6c17295857a1cc09e476ea3/A226509_web_2880.jpg?1698519845", price: "1.1 CR", link: "https://www.audi.in/in/web/en/models/tt/tt-rs-coupe.html" },
  { name: "Subaru WRX STI", image: "https://i.gaw.to/content/photos/60/40/604099-subaru-devoile-une-nouvelle-wrx-sti-qui-n-en-est-pas-vraiment-une.jpg", price: "60 Lakhs", link: "https://www.subaru.com/vehicles/wrx/stil.html" },
  { name: "Volkswagen Golf R", image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1oXeau.img?w=768&h=432&m=6", price: "55 Lakhs", link: "https://www.vw.com/en/models/golf-r.html" },
  { name: "Honda Civic Type R", image: "https://global.honda/content/dam/site/global-en/newsroom-new/cq_img/worldnews/2016/4161028/01.jpg", price: "50 Lakhs", link: "https://www.honda.com/civic-type-r" },
  { name: "Hyundai Elantra N", image: "https://e7852c3a.rocketcdn.me/wp-content/uploads/2024/02/2024-Hyundai-Elantra-004-1400x788.jpg", price: "40 Lakhs", link: "https://www.hyundai.com/worldwide/en/cars/elantra-n" },
  { name: "Kia Stinger GT", image: "https://www.motortrend.com/uploads/2022/10/2023-Kia-Stinger-GT-exterior-4.jpg?w=768&width=768&q=75&format=webp", price: "50 Lakhs", link: "https://www.kia.com/worldwide/vehicles/stinger.do" },
];

const CarGalleryFeatured = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const parsePriceToLakhs = (priceString) => {
    const cleanedPrice = priceString.toUpperCase().replace(/[^0-9.CRLAKHS]/g, '');
    const number = parseFloat(cleanedPrice);
    
    if (cleanedPrice.includes("CR")) {
      return number * 100; // Convert crores to lakhs
    }
    return number; // Already in lakhs or plain number
  };

  const filteredCars = carData.filter(car => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numericPrice = parsePriceToLakhs(car.price);
    const maxPriceNumber = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    const priceMatch = numericPrice <= maxPriceNumber;

    return nameMatch && priceMatch;
  });

  return (
    <div className="container">
      <CarSlider title="Featured Cars" cars={carData.slice(0, 6)} isTrending={true} />

      <div className="d-flex justify-content-center mb-4 gap-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Car Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          className="form-control w-25"
          placeholder="Max Price (Lakhs)"
          value={maxPrice}
          min="0"
          step="1"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))
        ) : (
          <p className="text-center text-danger fw-bold">
            No cars found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default CarGalleryFeatured;