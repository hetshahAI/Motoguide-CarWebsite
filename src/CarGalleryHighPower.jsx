import React, { useState } from 'react';
import CarCard from './components/CarCards';

const carData = [
    { name: "Dodge Challenger SRT Hellcat", image: "https://i.gaw.to/content/photos/30/25/302501_2018_Dodge_Challenger.jpg", price: "90 Lakhs", link: "https://www.dodge.com/challenger.html" },
    { name: "Chevrolet Camaro ZL1", image: "https://www.motortrend.com/uploads/sites/5/2017/06/2018-Chevrolet-Camaro-ZL1-1LE-front-three-quarter-in-motion-04-e1498503636653.jpg", price: "87 Lakhs", link: "https://www.chevrolet.com/performance/camaro/zl1" },
    { name: "Ford Mustang Shelby GT500", image: "https://car-images.bauersecure.com/wp-images/3290/050_shelby_gt500.jpg", price: "1.12 CR", link: "https://www.ford.com/performance/shelby-gt500/" },
    { name: "Lamborghini Aventador SVJ", image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Aventador/9170/1676530772968/front-left-side-47.jpg?impolicy=resize&imwidth=420", price: "6 CR", link: "https://www.lamborghini.com/en-en/models/aventador/aventador-svj" },
    { name: "Ferrari SF90 Stradale", image: "https://f1rstmotors.com/_next/image?url=https%3A%2F%2Ff1rst-motors.s3.me-central-1.amazonaws.com%2Fblog%2F1714734880903-blob&w=3840&q=100", price: "7.5 CR", link: "https://www.ferrari.com/en-EN/auto/sf90-stradale" },
    { name: "Bugatti Chiron", image: "https://images.hindustantimes.com/auto/img/2023/08/12/1600x900/Bugatti-Chiron_Super_Sport_Golden_Era-1_1691827703718_1691827708231.jpg", price: "21 CR", link: "https://www.bugatti.com/en/model-landing/chiron-models" },
    { name: "McLaren 765LT", image: "https://www.thesupercarblog.com/wp-content/uploads/2021/03/Hennssey-McLaren-765LT-HPE1000-1.jpg", price: "6.5 CR", link: "https://cars.mclaren.com/en/super-series/765lt" },
    { name: "Porsche 911 Turbo S", image: "https://paultan.org/image/2021/04/992-Porsche-911-Turbo-S-Malaysia-1-e1618198018590.jpg", price: "3.5 CR", link: "https://www.porsche.com/international/models/911/911-turbo-models/911-turbo-s/" },
    { name: "Aston Martin DBS Superleggera", image: "https://content.carlelo.com/uploads/UpcomingCar_img/aston-martin-dbs-superleggera.webp", price: "5.5 CR", link: "https://www.astonmartin.com/en/models/dbs-superleggera" },
    { name: "Koenigsegg Jesko", image: "https://www.topgear.com/sites/default/files/2024/12/TG_DSC0155.jpg", price: "25 CR", link: "https://www.koenigsegg.com/model/jesko" },
    { name: "Pagani Huayra", image: "https://www.topgear.com/sites/default/files/cars-car/image/2016/08/rh_huayrabc-67.jpg", price: "20 CR", link: "https://www.pagani.com/huayra/" },
    { name: "Ferrari 812 Superfast", image: "https://images.firstpost.com/wp-content/uploads/2021/04/ferrari-812-superfast-special-edition-revealed-with-830hp-v12.jpg", price: "5.75 CR", link: "https://www.ferrari.com/en-EN/auto/812-superfast" },
    { name: "McLaren P1", image: "https://www.thesupercarblog.com/wp-content/uploads/2014/10/McLaren-P1-GTR-1.jpg", price: "14 CR", link: "https://cars.mclaren.com/en/legacy/mclaren-p1" },
    { name: "Lamborghini Huracan STO", image: "https://blog.dupontregistry.com/wp-content/uploads/2022/04/huracan-sto-1.jpg", price: "4.99 CR", link: "https://www.lamborghini.com/en-en/models/huracan/huracan-sto" },
    { name: "Porsche 918 Spyder", image: "https://simonfurlonger.co.uk/wp-content/uploads/2023/cars/164701463663935.jpg", price: "12 CR", link: "https://www.porsche.com/microsite/918-spyder/international.aspx" },
    { name: "Rimac Nevera", image: "https://hips.hearstapps.com/hmg-prod/images/rimac-nevera-r-116-66be2b38b6e35.jpg?crop=0.798xw:0.673xh;0.0673xw,0.197xh&resize=2048:*", price: "18 CR", link: "https://www.rimac-automobili.com/nevera/" },
    { name: "Shelby Super Snake", image: "https://www.shelby.com/portals/0/webdatasheet/2021_ShelbySuperSnake/ShelbySupersnake-21-data.jpg", price: "1.3 CR", link: "https://www.shelby.com/Vehicles/Shelby-Super-Snake" },
    { name: "Zenvo TSR-S", image: "https://www.topgear.com/sites/default/files/cars-car/image/2021/05/zenvo_edit0003.jpg", price: "16 CR", link: "https://zenvoautomotive.com/models/tsr-s/" },
    { name: "Aston Martin Valkyrie", image: "https://media.gq-magazine.co.uk/photos/6405fb643e977a7efb8a7764/master/pass/Aston-Martin-Valkyrie-HED.jpg", price: "27 CR", link: "https://www.astonmartin.com/en/models/valkyrie" },
    { name: "SSC Tuatara", image: "https://www.supercars.net/blog/wp-content/uploads/2024/06/ssc.jpeg", price: "22 CR", link: "https://www.sscnorthamerica.com/tuatara" },
  ];
  

const CarGalleryHighPower = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCars = carData.filter(car => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());

    const priceString = car.price.toUpperCase();
    let numericPrice = 0;

    if (priceString.includes("CR")) {
      numericPrice = parseFloat(priceString) * 100; // Convert CR to Lakhs
    } else if (priceString.includes("LAKH")) {
      numericPrice = parseFloat(priceString);
    } else {
      numericPrice = parseFloat(priceString); // fallback
    }

    const maxPriceNumber = parseFloat(maxPrice);
    const priceMatch = isNaN(maxPriceNumber) || numericPrice <= maxPriceNumber;

    return nameMatch && priceMatch;
  });

  return (
    <div className="container">
      <h2 className="section-title text-center my-4">High Power Collection</h2>

      {/* Search Inputs */}
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
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => <CarCard key={index} car={car} />)
        ) : (
          <p className="text-center text-danger fw-bold">No cars found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default CarGalleryHighPower;
