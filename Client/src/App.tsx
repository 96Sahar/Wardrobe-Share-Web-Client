import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import Router from "./utils/router";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
