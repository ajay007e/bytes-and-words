import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import WideBlogCard from "../components/WideBlogCard";

import { getFeaturedStories, getStories } from "../../utils/database/database"

export default function StoryPage() {
  const [stories, setStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _featuredStories = await getFeaturedStories();
        setFeaturedStories(_featuredStories);

        const _stories = await getStories();
        setStories(_stories);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Featured">
        <Feature blogs={ featuredStories } />
      </CategorySection>
      <Pagination data = { stories } RenderComponent = {WideBlogCard}/>
      <Footer />
    </div>
  );
}
