import { Routes, Route } from "react-router-dom";
import Feed from "../features/Feed/Feed";
import LoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import CategoryPage from "../features/CategoryPage/categoryPage";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";
import CreatePostPage from "../features/CreatePostPage/CreatePostPage";
import LikedPostsPage from "../features/LikedPostsPage/LikedPostsPage";
import PostPage from "../features/SinglePost/PostPage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="/LoginAndRegistration" element={<LoginAndRegistration />} />
      <Route path="/likedItems" element={<LikedPostsPage />} />
      <Route path="/categoryPage/:category" element={<CategoryPage />} />
      <Route path="/categoryPage" element={<CategoryPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/CreatePost/:postId?" element={<CreatePostPage />} />
      <Route path="/post/:postId" element={<PostPage />} />
    </Routes>
  );
};

export default Router;
