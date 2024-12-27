import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../features/SplashScreen/Component/SplashScreen";
import TextScreen from "../features/SplashScreen/Component/TextScreen";

const router = createBrowserRouter([
  {
    path: "/splashScreen",
    element: <SplashScreen />,
  },
  {
    path: "/textScreen",
    element: <TextScreen />,
  },
]);

export default router;
