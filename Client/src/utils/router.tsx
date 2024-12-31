import { createBrowserRouter } from "react-router-dom";
import MainLoginAndRegistration from "../features/loginAndRegistration/LoginAndRegistration";
import MainPage from "../features/mainPage/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLoginAndRegistration />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
]);

export default router;
