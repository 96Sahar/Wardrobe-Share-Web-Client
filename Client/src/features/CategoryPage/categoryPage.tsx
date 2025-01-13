import { useParams } from "react-router-dom";
import Header from "../../utils/UtilsComponents/Header";
import React from "react";

interface CategoryPage {
  category?: string;
}

const CategoryPage: React.FC<CategoryPage> = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <>
      <Header />
      <div className="text-center py-10">
        {category ? `All ${category}` : `All items`}
      </div>
    </>
  );
};

export default CategoryPage;
