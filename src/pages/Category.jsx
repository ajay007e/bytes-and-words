import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import Carousel from "../components/Carousel";

export default function Category() {
  const topPickBanner = {
    title: "Velvet Whispers: A Night in Paris",
    description: "A tender, slow-burn encounter set under the Parisian moon—our editor's top pick for this week.",
    imageUrl: "https://images.pexels.com/photos/1001445/pexels-photo-1001445.jpeg",
    ctaLabel: "Read",
    href:"/posts/velvet-whispers"
  }
  const blogs = [
    {
      id: 1,
      title: "Velvet Whispers: A Night in Paris",
      author: "Jane Doe",
      readTime: "6 min read",
      description: "A tender, slow-burn encounter set under the Parisian moon—our editor's top pick for this week.",
      imageUrl: "https://images.pexels.com/photos/3050232/pexels-photo-3050232.jpeg",
      href: "/posts/velvet-whispers",
    },
    {
      id: 2,
      title: "Crimson Petals",
      author: "John Smith",
      readTime: "4 min read",
      description: "An intimate story of longing and passion unfolding in a secret garden.",
      imageUrl: "https://images.pexels.com/photos/285938/pexels-photo-285938.jpeg",
      href: "/posts/crimson-petals",
    },
    {
      id: 3,
      title: "Moonlit Desire",
      author: "Alice Brown",
      readTime: "5 min read",
      description: "A slow dance beneath the moonlight that awakens forgotten desires.",
      imageUrl: "https://images.pexels.com/photos/8370720/pexels-photo-8370720.jpeg",
      href: "/posts/moonlit-desire",
      serirs: "Dark"
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Romance",
      description: "Love-filled stories that touch the heart.",
      imageUrl: "https://images.pexels.com/photos/18396/pexels-photo.jpg",
      href: "/category/romance",
    },
    {
      id: 2,
      name: "Thriller",
      description: "Gripping tales full of suspense and mystery.",
      imageUrl: "https://images.pexels.com/photos/11104885/pexels-photo-11104885.jpeg",
      href: "/category/thriller",
    },
    {
      id: 3,
      name: "Fantasy",
      description: "Enter magical worlds and epic adventures.",
      imageUrl: "https://images.pexels.com/photos/3115525/pexels-photo-3115525.jpeg",
      href: "/category/fantasy",
    },
    {
      id: 4,
      name: "Drama",
      description: "Intense, emotional stories full of depth.",
      imageUrl: "https://images.pexels.com/photos/12932543/pexels-photo-12932543.jpeg",
      href: "/category/drama",
    },
    {
      id: 5,
      name: "Comedy",
      description: "Lighthearted stories to make you smile.",
      imageUrl: "https://images.pexels.com/photos/1890149/pexels-photo-1890149.jpeg",
      href: "/category/comedy",
    },
    {
      id: 6,
      name: "Adventure",
      description: "Exciting journeys and daring challenges.",
      imageUrl: "https://images.pexels.com/photos/6260556/pexels-photo-6260556.jpeg",
      href: "/category/adventure",
    },
  ];

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
      <CategorySection heading="Featured">
        <Feature blogs={blogs} />
      </CategorySection>
      {/* pagination */}
      <Carousel blogs={categories} heading="Browse by Categories" CardComponent={CategoryCard}/>
      <Footer />
    </div>
  );
}
