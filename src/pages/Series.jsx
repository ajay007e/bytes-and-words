import { useParams } from "react-router";

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

import { getFeaturedSeries, getBlogSeriesByName, getSeries } from "../../utils/database/database"

export default function Series() {
  let { name } = useParams();
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <StoryCard data = {getSeries(name)}/>
      <Pagination headingRequired={false} data = { getBlogSeriesByName(name) } RenderComponent = {WideBlogCard}/>
      <Carousel blogs={getFeaturedSeries(6)} heading="You may also like these" CardComponent={BlogCard}/>
      <Footer />
    </div>
  );
}
