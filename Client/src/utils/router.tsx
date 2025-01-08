import { createBrowserRouter } from "react-router-dom";
import MainLoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import Feed from "../features/Feed/Feed";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";
import CreatePost from "../features/CreatePostPage/app_page";
import PostPage from "../features/SinglePost/PostPage";

const router = createBrowserRouter([
  {
    path: "/LoginAndRegistration",
    element: <MainLoginAndRegistration />,
  },
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit",
    element: <EditProfile />,
  },
  {
    path: "/createPost",
    element: <CreatePost />,
  },
  {
    path: "/postPage",
    element: <PostPage />,
  },
]);

export default router;
