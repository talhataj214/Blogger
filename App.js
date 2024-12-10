import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
// import DynamicImage from "./dynamicCards/DynamicImage";
import DynamicNews from "./dynamicCards/BreakingNews";
// import RecentNews from "./dynamicCards/RecentNews";
import DynamicNewsLetter from  "./dynamicCards/DynamicNewsLetter";
import FetchNews from "./pages/FetchNews";
import CategoryPage from "./dynamicCards/CategoryPage";
import CombineLayout from "./dynamicCards/HomePage";
import AboutUs from "./dynamicCards/AboutUs";
import ContactUs from "./dynamicCards/ContactUs"; 
import SectionNews from "./dynamicCards/SectionNews";
import DynamicRecentNews from "./dynamicCards/DynamicRecentNews";
import DynamicSearch from "./dynamicCards/DynamicSearch";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        <Route path="/:slug" element={<NewsDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-letter" element={<DynamicNewsLetter />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/" element={<><DynamicNews /><CombineLayout /><DynamicRecentNews  />< SectionNews/><FetchNews /></>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs  />} />
        <Route path="/search" element={<DynamicSearch  />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
