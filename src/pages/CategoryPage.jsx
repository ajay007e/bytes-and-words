import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";

import { categories } from "../../utils/database/database"

export default function CategoryPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Navbar />
      <CategorySection heading="Top Categories">
        <Feature blogs={categories} />
      </CategorySection>
      <Footer />
    </div>
  );
}
