import CategoryShowcase from "../home/CategoryShowcase";
import FeaturedProducts from "../home/FeaturedProducts";
import HeroSection from "../home/HeroSection";
import NewArrivals from "../home/NewArrivals";
import TrustBadges from "../home/TrustBadges";

function HomePage() {
  return (
    <>
      <HeroSection />
      <NewArrivals />
      <CategoryShowcase />
      <FeaturedProducts />
      <TrustBadges />
    </>
  );
}

export default HomePage;
