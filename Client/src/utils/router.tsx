import { Routes, Route } from "react-router-dom";
import Feed from "../features/Feed/Feed";
import LoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import CategoryPage from "../features/CategoryPage/categoryPage";
import CreatePost from "../features/CreatePostPage/createPostComponents/CreateAPost";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="/LoginAndRegistration" element={<LoginAndRegistration />} />
      <Route path="/categoryPage" element={<CategoryPage />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/profilePage" element={<Profile />} />
      <Route path="/editProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default Router;
