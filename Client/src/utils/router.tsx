import { createBrowserRouter } from "react-router-dom";
import MainLoginAndRegistration from "../features/LoginAndRegistration/LoginAndRegistration";
import Feed from "../features/Feed/Feed";
import Profile from "../features/Profile/Profile";
import EditProfile from "../features/Profile/EditProfile";

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
]);

export default router;
