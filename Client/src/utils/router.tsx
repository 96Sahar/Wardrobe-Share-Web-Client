import { Routes, Route } from "react-router-dom";
import Feed from "../features/Feed/Feed";
import LoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import CategoryPage from "../features/CategoryPage/categoryPage";
import CreatePost2 from "../features/CreatePostPage/createPostComponents/CreateAPost2";
import CreatePost from "../features/CreatePostPage/createPostComponents/CreateAPost";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="/LoginAndRegistration" element={<LoginAndRegistration />} />
      <Route path="/categoryPage" element={<CategoryPage />} />
      <Route path="/profilePage" element={<Profile />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/createAPost2" element={<CreatePost2 />} />
      <Route path="/createAPost" element={<CreatePost />} />
    </Routes>
  );
};

export default Router;
