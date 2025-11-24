import { useParams } from "react-router";
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
import StoryCard from "../components/StoryCard";

import { getFeaturedSeries, getStoriesBySeriesName, getSeriesByName } from "../../utils/database/database"

export default function Series() {
  let { name } = useParams();

  const [series, setSeries] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _featuredSeries = await getFeaturedSeries();
        setFeaturedSeries(_featuredSeries);

        const _series = await getSeriesByName(name);
        setSeries(_series);

        const _chapters = await getStoriesBySeriesName(name);
        setChapters(_chapters);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);
 

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <StoryCard data = { series }/>
      <Pagination headingRequired={false} data = { chapters } RenderComponent = {WideBlogCard}/>
      <Carousel blogs={ featuredSeries } heading="You may also like these" CardComponent={BlogCard}/>
      <Footer />
    </div>
  );
}
