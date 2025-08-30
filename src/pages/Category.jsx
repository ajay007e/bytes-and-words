import { useParams } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import CategoryCard from "../components/CategoryCard";
import WideBlogCard from "../components/WideBlogCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/Pagination";

import { categories, getFeaturedBlogsByCategory, getBlogsByCategory } from "../../utils/database/database"

export default function Category() {
  let { category } = useParams();
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Featured">
        <Feature blogs={getFeaturedBlogsByCategory(category)} />
      </CategorySection>
      <Pagination data = { getBlogsByCategory(category) } RenderComponent = {WideBlogCard}/>
      <Carousel blogs={categories} heading="Browse by Categories" CardComponent={CategoryCard}/>
      <Footer />
    </div>
  );
}
