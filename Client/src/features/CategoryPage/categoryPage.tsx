import Header from "../../utils/UtilsComponents/Header";
import React from "react";
import Categories from "../Feed/FeedComponents/Categories";
import Grid from "./CategoryPageComponents/Grid";

const CategoryPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Grid />
      <Categories />
    </div>
  );
};

export default CategoryPage;
