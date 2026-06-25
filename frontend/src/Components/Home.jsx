import CoverageMap from "./Home/CoverageMap";
import Footer from "./Home/Footer";
import HeroSection from "./Home/HeroSection";
import ServicesSection from "./Home/ServicesSection";
import TestimonialsSection from "./Home/TestimonialsSection";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <CoverageMap />
      <Footer />
    </>
  );
};

export default Home;
