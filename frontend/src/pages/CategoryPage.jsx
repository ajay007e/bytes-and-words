import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";

import { getCategories } from "../../utils/database/database"

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _categories = await getCategories();
        setCategories(_categories);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);
 

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Top Categories">
        <Feature blogs={ categories } />
      </CategorySection>
      <Footer />
    </div>
  );
}
