import { RouterProvider } from "react-router-dom";
import "./style/App.css";
import router from "./utils/router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
