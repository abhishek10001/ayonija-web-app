import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home"; // Assuming a Home page
import LifeAtCompany from "./pages/LifeAtComp";
import Blog from "./pages/Blog";
import Products from "./pages/Products";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/life-at-company" element={<LifeAtCompany/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/Products" element={<Products/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
