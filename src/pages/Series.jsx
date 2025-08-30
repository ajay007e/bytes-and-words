import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Series() {
 const additionalBlogs = [
    {
      id: 1,
      title: "The Secret Garden of Dreams",
      author: "Amelia Clark",
      readTime: "6 min read",
      imageUrl: "https://images.pexels.com/photos/1700765/pexels-photo-1700765.jpeg",
      description: "A soothing escape into nature’s hidden corners...",
      href: "/blog/secret-garden",
    },
    {
      id: 2,
      title: "Chasing Sunsets Across the World",
      author: "James Parker",
      readTime: "5 min read",
      imageUrl: "https://images.pexels.com/photos/6706946/pexels-photo-6706946.jpeg",
      description: "A journey through the most breathtaking sunsets.",
      href: "/blog/chasing-sunsets",
    },
    {
      id: 3,
      title: "The Forgotten Letters",
      author: "Sophia Bennett",
      readTime: "7 min read",
      imageUrl: "https://images.pexels.com/photos/5988265/pexels-photo-5988265.jpeg",
      description: "An old box of letters unravels a hidden past...",
      href: "/blog/forgotten-letters",
    },
    {
      id: 4,
      title: "Whispers of the Ocean",
      author: "Liam Johnson",
      readTime: "4 min read",
      imageUrl: "https://images.pexels.com/photos/3146245/pexels-photo-3146245.jpeg",
      description: "Mystical stories inspired by the sea.",
      href: "/blog/whispers-ocean",
    },
    {
      id: 5,
      title: "Midnight in the City",
      author: "Ella Morgan",
      readTime: "5 min read",
      imageUrl: "https://images.pexels.com/photos/8261180/pexels-photo-8261180.jpeg",
      description: "Discover the hidden beauty of cities after dark.",
      href: "/blog/midnight-city",
    },
    {
      id: 6,
      title: "Echoes of the Mountains",
      author: "Daniel Carter",
      readTime: "8 min read",
      imageUrl: "https://images.pexels.com/photos/6497611/pexels-photo-6497611.jpeg",
      description: "An adventure through the peaks and valleys of life.",
      href: "/blog/echoes-mountains",
    },
    {
      id: 7,
      title: "Dancing with Shadows",
      author: "Isabella Reed",
      readTime: "6 min read",
      imageUrl: "https://images.pexels.com/photos/4759930/pexels-photo-4759930.jpeg",
      description: "Exploring the mysteries hidden in twilight hours.",
      href: "/blog/dancing-shadows",
    },
    {
      id: 8,
      title: "The Bookstore Café",
      author: "Oliver Hayes",
      readTime: "5 min read",
      imageUrl: "https://images.pexels.com/photos/158018/surf-woman-mar-surfer-158018.jpeg",
      description: "Where stories are brewed with every cup of coffee.",
      href: "/blog/bookstore-cafe",
    },
  ];



  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      {/*Series Details*/}
      {/*pagination*/}
      <Footer />
    </div>
  );
}
