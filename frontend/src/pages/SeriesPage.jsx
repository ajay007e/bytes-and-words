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

import { getFeaturedSeries, getSeries } from "../../utils/database/database"

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _featuredSeries = await getFeaturedSeries();
        setFeaturedSeries(_featuredSeries);

        const _series = await getSeries();
        setSeries(_series);

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
        <Feature blogs={ featuredSeries} />
      </CategorySection>
      <Pagination data = { series } RenderComponent = {WideBlogCard}/>
      <Footer />
    </div>
  );
}
