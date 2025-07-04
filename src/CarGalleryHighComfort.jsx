import React, { useState } from 'react';
import CarCard from './components/CarCards';

const carData = [
    { name: "Mercedes-Benz S-Class", image: "https://www.topgear.com/sites/default/files/cars-car/image/2024/11/1-AMG-S63-2024-review.jpg", price: "1.7 CR", link: "https://www.mercedes-benz.com/s-class" },
    { name: "BMW 7 Series", image: "https://images.prismic.io/carwow/74b411e3-4e2c-458a-97a4-8e51e745f610_2024+BMW+7+Series+front+quarter+driving+2.jpg", price: "1.8 CR", link: "https://www.bmw.in/en/all-models/7-series/sedan/2022/bmw-7-series-sedan-overview.html" },
    { name: "Audi A8L", image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Audi_A8_L_Horch_003.jpg", price: "1.6 CR", link: "https://www.audi.in/a8l" },
    { name: "Lexus LS 500h", image: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-ls500h-awd-639-664b69dcce246.jpg?crop=0.716xw:0.603xh;0.143xw,0.336xh&resize=640:*", price: "2.2 CR", link: "https://www.lexus.com/models/LS" },
    { name: "Jaguar XJL", image: "https://imgd.aeplcdn.com/1920x1080/cw/ec/21686/Jaguar-XJ-L-Right-Front-Three-Quarter-64990.jpg?v=201711021421&q=80&q=80", price: "1.2 CR", link: "https://www.jaguar.in/jaguar-range/xj/models/index.html" },
    { name: "Volvo S90", image: "https://s3.amazonaws.com/cka-dash/001-0124-CVC837/mainimage.jpg", price: "75 Lakhs", link: "https://www.volvocars.com/in/cars/new-models/s90/" },
    { name: "Genesis G90", image: "https://media.ed.edmunds-media.com/genesis/g90/2025/oem/2025_genesis_g90_sedan_35t-e-supercharger_fq_oem_1_1600.jpg", price: "85 Lakhs", link: "https://www.genesis.com/worldwide/en/models/g90.html" },
    { name: "Rolls-Royce Ghost", image: "https://mediapool.bmwgroup.com/cache/P9/202403/P90543292/P90543292-rolls-royce-ghost-prism-gunmetal-grey-with-turchese-599px.jpg", price: "7 CR", link: "https://www.rolls-roycemotorcars.com/en-GB/showroom/ghost.html" },
    { name: "Bentley Flying Spur", image: "https://newdelhi.bentleymotors.com/userdata/31596/files/25my_new_flying_spur_mulliner-dsc_2158_performace_754x377.jpg", price: "5 CR", link: "https://www.bentleymotors.com/en/models/flying-spur.html" },
    { name: "Porsche Panamera", image: "https://gld-creative.s3.us-west-2.amazonaws.com/2025-porsche-panamera-4-deffd5669cca-600x300.png", price: "1.6 CR", link: "https://www.porsche.com/international/models/panamera/" },
    { name: "Tesla Model S", image: "https://media.ed.edmunds-media.com/tesla/model-s/2025/oem/2025_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg", price: "1.5 CR", link: "https://www.tesla.com/models" },
    { name: "Lincoln Continental", image: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/jpg/201503/lincoln-continental--15.jpg", price: "80 Lakhs", link: "https://www.lincoln.com/luxury-cars/continental/" },
    { name: "Hyundai Grandeur", image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/133719/hyundai-right-front-three-quarter2.jpeg?isig=0&wm=0", price: "55 Lakhs", link: "https://www.hyundai.com/worldwide/en/cars/grandeur" },
    { name: "Cadillac CT6", image: "https://i.gaw.to/vehicles/photos/40/19/401968-2020-cadillac-ct6.jpg?1024x640", price: "1 CR", link: "https://www.cadillac.com/sedans/ct6-sedan" },
    { name: "Infiniti Q70L", image: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/15q2/657948/2015-infiniti-q70l-37-awd-test-review-car-and-driver-photo-660291-s-original.jpg?fill=1:1&resize=1200:*", price: "90 Lakhs", link: "https://www.infinitiusa.com/vehicles/sedans/q70.html" },
    { name: "Chrysler 300", image: "https://di-uploads-pod21.dealerinspire.com/southerngreenbriarchryslerjeep/uploads/2021/02/2021-Chrysler-300-Southern.jpeg", price: "70 Lakhs", link: "https://www.chrysler.com/300.html" },
    { name: "Kia K900", image: "https://ik.imagekit.io/girnar/sayaratbay/large/gallery/exterior/19/1165/kia-k900-front-angle-low-view-898518.jpg", price: "85 Lakhs", link: "https://www.kia.com/worldwide/vehicles/k900.do" },
    { name: "Genesis G80", image: "https://vehicle-photos-published.vauto.com/0b/d5/0e/fe-8094-422b-8866-3beb89c81d0e/image-1.jpg", price: "65 Lakhs", link: "https://www.genesis.com/worldwide/en/models/g80.html" },
    { name: "Toyota Crown", image: "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-crown-nightshade-01-66310e67df250.jpg?crop=0.572xw:0.429xh;0.228xw,0.318xh&resize=2048:*", price: "55 Lakhs", link: "https://www.toyota.com/crown/" },
    { name: "Skoda Superb", image: "https://cdn.skoda-storyboard.com/2023/11/Superb_LaK_Front_20231018_bcbb763b.png", price: "45 Lakhs", link: "https://www.skoda-auto.com/models/range/superb" },
  ];
  

const CarGalleryHighComfort = () => {
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
      <h2 className="section-title text-center my-4">High Comfort Collection</h2>

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

export default CarGalleryHighComfort;
