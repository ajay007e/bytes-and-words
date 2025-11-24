import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopPickBanner from "../components/TopPickBanner";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";

import { getEditorsPick, getFeaturedStories, getStoriesByCategory, getCategories } from "../../utils/database/database";

function Home() {
  const [editorsPick, setEditorsPick] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _editorsPick = await getEditorsPick();
        setEditorsPick(_editorsPick);

        const _categories = await getCategories();
        setCategories(_categories);

        const _featuredStories = await getFeaturedStories();
        setFeaturedStories(_featuredStories);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);
 
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <TopPickBanner { ...editorsPick } />
      <CategorySection heading="Featured">
        <Feature blogs={ featuredStories } />
      </CategorySection>
      <Carousel blogs={ categories } heading="Browse by Categories" CardComponent={CategoryCard}/>
      {/*<Carousel blogs={ romanceStories } heading="Romance" CardComponent={BlogCard}/>*/}
      <Footer />
    </div>
  );
}

export default Home;
