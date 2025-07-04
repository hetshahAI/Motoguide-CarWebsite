import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Featured from './Pages/Featured';
import HighComfort from './Pages/HighComfort';
import HighPower from './Pages/HighPower';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs'; // Import the AboutUs page
import CarCompare from './components/CarCompare';
import { CarProvider } from './context/CarContext';
import { LanguageProvider } from './context/LanguageContext';
import SearchResults from './components/SearchResult';
import CarDescription from './components/CarDescription';
import LoginRegister from './components/LoginRegister'; // Import the LoginRegister component

function App() {
  return (
    <CarProvider>
      <LanguageProvider>
        <Router basename="/CARDEX">
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/highpower" element={<HighPower />} />
              <Route path="/highcomfort" element={<HighComfort />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/car/:carName" element={<CarDescription />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} /> {/* Add AboutUs route */}
              <Route path="/compare" element={<CarCompare />} />
              <Route path="/login" element={<LoginRegister />} /> {/* Add LoginRegister route */}
            </Routes>
            <div style={{ background: '#111', minHeight: '0vh' }}>
            </div>
          </main>
          <Footer />
        </div>
        </Router>
      </LanguageProvider>
    </CarProvider>
  );
}

export default App;