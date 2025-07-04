import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiSearch, FiMenu, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { carBrands } from '../data/FullCardata';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [carCategoriesOpen, setCarCategoriesOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { currentLanguage, changeLanguage, languages, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-theme');
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const matches = carBrands
        .map(b => typeof b === 'string' ? b : b.name)
        .filter(name => name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchActive(false);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (brand) => {
    setSearchQuery(brand);
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(brand)}`);
    setSearchActive(false);
  };

  const handleSearchToggle = () => setSearchActive((prev) => !prev);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
        <div className="navbar-brand">
          <span className="brand-highlight">Moto</span>Guide
        </div>
        <div className="navbar-container desktop-only">
          <div className="navbar-left navbar-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              {t('home')}
            </Link>
          </div>
          <div className="navbar-categories navbar-links">
            <div className={`car-categories ${carCategoriesOpen ? 'active' : ''}`}>
              <button
                className="nav-link"
                onClick={() => setCarCategoriesOpen(!carCategoriesOpen)}
                onBlur={() => setTimeout(() => setCarCategoriesOpen(false), 200)}
              >
                {t('carCategories')}
              </button>
              <div className="car-categories-menu">
                <Link
                  to="/featured"
                  className="car-categories-option"
                  onClick={() => setCarCategoriesOpen(false)}
                >
                  {t('featured')}
                </Link>
                <Link
                  to="/highpower"
                  className="car-categories-option"
                  onClick={() => setCarCategoriesOpen(false)}
                >
                  {t('highPower')}
                </Link>
                <Link
                  to="/highcomfort"
                  className="car-categories-option"
                  onClick={() => setCarCategoriesOpen(false)}
                >
                  {t('highComfort')}
                </Link>
                <Link
                  to="/compare"
                  className="car-categories-option"
                  onClick={() => setCarCategoriesOpen(false)}
                >
                  {t('compareCars')}
                </Link>
              </div>
            </div>
          </div>
          <div className="navbar-right navbar-links">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              {t('aboutUs')}
            </Link>
            <button
              type="button"
              className="search-icon"
              onClick={handleSearchToggle}
              title={t('search')}
            >
              <FiSearch size={22} />
            </button>
            {searchActive && (
              <form onSubmit={handleSearchSubmit} className="search-form active" autoComplete="off">
                <input
                  type="text"
                  className="search-input"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                {suggestions.length > 0 && (
                  <ul className="search-suggestions">
                    {suggestions.map((brand, idx) => (
                      <li
                        key={idx}
                        className="suggestion-item"
                        onMouseDown={() => handleSuggestionClick(brand)}
                      >
                        {t(brand)}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            )}
            <div className="language-selector">
              <button
                className="language-toggle"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                title={t('changeLanguage')}
              >
                <FiGlobe size={22} />
                <span className="current-language">{currentLanguage.code.toUpperCase()}</span>
              </button>
              {languageMenuOpen && (
                <div className="language-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${lang.code === currentLanguage.code ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="theme-toggle" onClick={toggleTheme} title={t('toggleTheme')}>
              {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </div>
            {user ? (
              <button
                className="nav-link login-btn"
                onClick={handleLogout}
                style={{ marginLeft: '10px' }}
                title={t('logout') || 'Logout'}
              >
                {t('logout') || 'Logout'}
              </button>
            ) : (
              <Link
                to="/login"
                className="nav-link login-btn"
                style={{ marginLeft: '10px' }}
                title={t('login') || 'Login'}
              >
                {t('login') || 'Login'}
              </Link>
            )}
          </div>
        </div>
        <button
          className="sidebar-toggle mobile-only"
          onClick={toggleSidebar}
          title={t('toggleSidebar')}
          aria-label={t('toggleSidebar')}
        >
          <FiMenu size={22} />
        </button>
      </nav>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={toggleSidebar} aria-label="Close Sidebar">&times;</button>
        <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
          {t('home')}
        </Link>
        <div className="sidebar-categories">
          <div className="sidebar-link sidebar-categories-title">{t('carCategories')}</div>
          <Link to="/featured" className="sidebar-link" onClick={toggleSidebar}>
            {t('featured')}
          </Link>
          <Link to="/highpower" className="sidebar-link" onClick={toggleSidebar}>
            {t('highPower')}
          </Link>
          <Link to="/highcomfort" className="sidebar-link" onClick={toggleSidebar}>
            {t('highComfort')}
          </Link>
          <Link to="/compare" className="sidebar-link" onClick={toggleSidebar}>
            {t('compareCars')}
          </Link>
        </div>
        <Link to="/about" className="sidebar-link" onClick={toggleSidebar}>
          {t('aboutUs')}
        </Link>
        <Link to="/contact" className="sidebar-link" onClick={toggleSidebar}>
          {t('contactUs')}
        </Link>
        <div className="sidebar-actions">
          <button
            className="sidebar-lang-btn"
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          >
            <FiGlobe size={22} /> {t('changeLanguage')}
          </button>
          {languageMenuOpen && (
            <div className="language-menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-option ${lang.code === currentLanguage.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setLanguageMenuOpen(false);
                    setSidebarOpen(false);
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
          <div className="sidebar-theme-toggle" onClick={toggleTheme} title={t('toggleTheme')}>
            {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
          </div>
          {user ? (
            <button
              className="nav-link login-btn"
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              style={{ marginLeft: '10px' }}
              title={t('logout') || 'Logout'}
            >
              {t('logout') || 'Logout'}
            </button>
          ) : (
            <Link
              to="/login"
              className="nav-link login-btn"
              style={{ marginLeft: '10px' }}
              title={t('login') || 'Login'}
              onClick={() => setSidebarOpen(false)}
            >
              {t('login') || 'Login'}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
