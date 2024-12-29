import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../features/SplashScreen/SplashScreen";
import MainLoginAndRegistration from "../features/mainLogin/MainLoginAndRegistration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/mainLogin",
    element: <MainLoginAndRegistration />,
  },
]);

export default router;
