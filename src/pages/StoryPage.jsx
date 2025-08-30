import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import WideBlogCard from "../components/WideBlogCard";

import { getFeaturedStories, getBlogStories } from "../../utils/database/database"

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Featured">
        <Feature blogs={getFeaturedStories()} />
      </CategorySection>
      <Pagination data = { getBlogStories() } RenderComponent = {WideBlogCard}/>
      <Footer />
    </div>
  );
}
