import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopPickBanner from "../components/TopPickBanner";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";

import { getEditorsPick, getFeaturedBlogs, getBlogsByCategory, categories } from "../../utils/database/database";

function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <TopPickBanner {...getEditorsPick()} />
      <CategorySection heading="Featured">
        <Feature blogs={getFeaturedBlogs()} />
      </CategorySection>
      <Carousel blogs={categories} heading="Browse by Categories" CardComponent={CategoryCard}/>
      <Carousel blogs={getBlogsByCategory('Romance')} heading="Romance" CardComponent={BlogCard}/>
      <Footer />
    </div>
  );
}

export default Home;
