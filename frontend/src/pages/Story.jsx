import { useParams, useNavigate } from "react-router";
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
import StoryContent from "../components/StoryContent";
import StoryNavigation from "../components/StoryNavigation";

import { getStoryById, getStoryIdBySeriesInfo } from "../../utils/database/database"

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const onNavigate = async (chapter) => {
    const id = await getStoryIdBySeriesInfo(story.series?.id, chapter);
    navigate(`/story/${id}`);
  };

  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const _story = await getStoryById(id);
        setStory(_story);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, [id]);


  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <StoryCard data = { story }>
        <StoryContent content = { story.content }/>
        {story.series && (<StoryNavigation currentChapter ={story.series.chapter} totalChapters={story.series.noOfChapters} onNavigate={onNavigate}/>)}
      </StoryCard>
      <Footer />
    </div>
  );
}
