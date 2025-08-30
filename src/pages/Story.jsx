import { useParams, useNavigate } from "react-router";

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

import { getBlog, getBlogId } from "../../utils/database/database"

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac eros quis lectus fermentum faucibus vel eu neque. Ut scelerisque pulvinar libero, ac gravida nunc mollis sit amet. Vestibulum quis turpis feugiat orci laoreet porta. Duis ornare finibus sodales. Integer gravida eros a commodo euismod. Donec convallis, enim eget pulvinar efficitur, turpis ante maximus leo, ac ultrices dolor justo vel diam. Vivamus luctus euismod magna at malesuada. Curabitur auctor urna nec enim blandit lobortis. Morbi tempus nibh nibh, vestibulum mollis justo dictum at. Vivamus finibus purus quam, et faucibus diam maximus et. Integer vehicula massa a velit euismod, sit amet imperdiet justo vestibulum. Donec ligula tortor, dapibus in ultricies sit amet, gravida at tortor. Quisque ornare ante sed tellus auctor, nec feugiat nisl ultricies. Mauris eleifend consectetur tempus. Nunc et nisi in leo volutpat vestibulum vitae vel diam. Donec maximus ullamcorper egestas. Cras dignissim dui et consequat pharetra. Aliquam eget commodo magna. Nunc mi lectus, egestas sed aliquam id, laoreet id sem. Nulla vulputate dolor lacus, vitae dignissim neque pharetra id. Nunc vitae tellus pretium, placerat mi a, commodo sapien. Sed et orci est. Vestibulum vulputate, lectus et aliquet accumsan, nulla nibh interdum nunc, id varius ex mi ac lectus. Praesent nec mauris in enim aliquam gravida sit amet quis quam. Duis dignissim finibus tristique. Nam lacus nunc, semper vel sodales eget, varius molestie arcu. Sed elementum nunc nec neque lacinia, id viverra mauris facilisis. Maecenas pellentesque dolor vel nunc faucibus venenatis. In hac habitasse platea dictumst. Fusce id est placerat, hendrerit dui vitae, tincidunt ligula. Ut at urna id augue commodo eleifend nec nec ante. Nulla bibendum libero purus, ac placerat purus scelerisque eget. Phasellus id sapien id lacus interdum luctus consequat ac mauris. Sed porttitor, eros at sollicitudin vehicula, massa justo feugiat felis, eu faucibus leo quam ut tortor. Suspendisse gravida felis et pellentesque mattis. In facilisis metus ultrices, gravida ante ut, ultricies ipsum. Aenean interdum tortor vitae interdum mollis. Sed id elit leo. Aliquam placerat, arcu a placerat scelerisque, sem lacus interdum eros, vel dignissim ex augue nec purus. Aenean dui lectus, porttitor in nulla sit amet, pharetra ultricies magna. Integer sagittis dignissim laoreet. Vestibulum vestibulum sagittis aliquam. Integer rhoncus tortor vitae cursus efficitur. Sed in nunc in eros rhoncus volutpat. Sed pellentesque quis nibh ut aliquam. Vivamus in dolor vitae tellus posuere laoreet pellentesque sed velit. Nunc ut tincidunt lectus. In leo urna, tristique quis sapien id, faucibus mattis justo. Donec tincidunt sapien eu consequat tincidunt. Aenean in varius quam, ut finibus dui. Sed cursus eget dolor sed lobortis. Fusce ac urna sed enim elementum accumsan et ac neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec facilisis elit quis auctor viverra. Etiam ut dignissim libero. Suspendisse non mi purus.";
  const blog = getBlog(id);
  const onNavigate = (chapter) => navigate(`/story/${getBlogId(blog.series?.id, chapter)}`);
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <StoryCard data = {blog}>
        <StoryContent content = {story}/>
        {blog.series && (<StoryNavigation currentChapter ={blog.series.chapter} totalChapters={blog.series.noOfChapters} onNavigate={onNavigate}/>)}
      </StoryCard>
      <Footer />
    </div>
  );
}
