import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import Router from "./utils/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utils/UtilsComponents/ScrollToTop";

const App = () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
  return (
    <>
      <ToastContainer theme="dark" />
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
