import { useParams } from "react-router-dom";
import Header from "../../utils/UtilsComponents/Header";
import React from "react";
import Categories from "../Feed/FeedComponents/Categories";
import Grid from "./CategoryPageComponents/grid";

interface CategoryPage {
  category?: string;
}

const CategoryPage: React.FC<CategoryPage> = () => {
  const { category } = useParams<{ category: string }>();
  const normalizedCategory = category ? category.toLowerCase() : "All";


  return (
    <>
      <Header />
      <Grid key={normalizedCategory} category={normalizedCategory} />
      <Categories />
    </>
  );
};

export default CategoryPage;


