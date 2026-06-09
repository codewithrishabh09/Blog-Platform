import Navbar from "../components/navbar/Navbar";

import HeroSection from "../components/home/HeroSection";
import FeaturedPost from "../components/home/FeaturedPost";
import TrendingSection from "../components/home/TrendingSection";
import CategoriesSection from "../components/home/CategoriesSection";
import PopularAuthors from "../components/home/PopularAuthors";
import Newsletter from "../components/home/Newsletter";

import LatestBlogs from "../components/home/LatestBlogs";
import Testimonials from "../components/home/Testimonials";
import StatsSection from "../components/home/StatsSection";
import FeaturedCategories from "../components/home/FeaturedCategories";
import BlogCarousel from "../components/home/BlogCarousel";
import CallToAction from "../components/home/CallToAction";

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <FeaturedPost />

      <TrendingSection />

      <FeaturedCategories />

      <LatestBlogs />

      <BlogCarousel />

      <StatsSection />

      <CategoriesSection />

      <PopularAuthors />

      <Testimonials />

      <Newsletter />

      <CallToAction />
    </>
  );
}

export default Home;