import { useParams } from "react-router";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import CategoryCard from "../components/CategoryCard";
import WideBlogCard from "../components/WideBlogCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/Pagination";

import { getCategories, getFeaturedStoriesByCategory, getStoriesByCategory } from "../../utils/database/database"

export default function Category() {
  let { category } = useParams();
  const [featuredStories, setFeaturedStories] = useState([]);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _categories = await getCategories();
        setCategories(_categories);

        const _featuredStories = await getFeaturedStoriesByCategory(category);
        setFeaturedStories(_featuredStories);

        const _stories = await getStoriesByCategory(category);
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
      <Carousel blogs={ categories} heading="Browse by Categories" CardComponent={CategoryCard}/>
      <Footer />
    </div>
  );
}
