import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import WideBlogCard from "../components/WideBlogCard";

import { getFeaturedSeries, getBlogSeries } from "../../utils/database/database"

export default function SeriesPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Featured">
        <Feature blogs={getFeaturedSeries()} />
      </CategorySection>
      <Pagination data = { getBlogSeries() } RenderComponent = {WideBlogCard}/>
      <Footer />
    </div>
  );
}
