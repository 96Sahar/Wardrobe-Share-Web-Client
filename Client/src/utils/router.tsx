import { createBrowserRouter } from "react-router-dom";
import MainLoginAndRegistration from "../features/LoginAndRegistration/LoginAndRegistration";
import MainPage from "../features/MainPage/MainPage";
import CreateAPost from "../features/AddPost/CreateAPost";
import Feed from "../features/Feed/Feed";

const router = createBrowserRouter([
  {
    path: "/LoginAndRegistration",
    element: <MainLoginAndRegistration />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/CreateAPost",
    element: <CreateAPost />,
  },
  {
    path: "/Feed",
    element: <Feed />,
  },
]);

export default router;
