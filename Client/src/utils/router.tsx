import { Routes, Route } from "react-router-dom";
import LoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import CategoryPage from "../features/CategoryPage/categoryPage";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";
import CreatePostPage from "../features/CreatePostPage/CreatePostPage";
import LikedPostsPage from "../features/LikedPostsPage/LikedPostsPage";
import PostPage from "../features/SinglePost/PostPage";
import Feed from "../features/Feed/Feed";
import Page404 from "../features/Page404/page404"

const Router = () => {
  return (
    <Routes>
      <Route path="/" index element={<Feed />} />
      <Route path="/LoginAndRegistration" element={<LoginAndRegistration />} />
      <Route path="/LikedItems" element={<LikedPostsPage />} />
      <Route path="/CategoryPage/:category" element={<CategoryPage />} />
      <Route path="/CategoryPage" element={<CategoryPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/CreatePost/:postId?" element={<CreatePostPage />} />
      <Route path="/Item/:postId" element={<PostPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
