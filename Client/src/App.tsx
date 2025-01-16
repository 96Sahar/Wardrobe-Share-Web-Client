import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import Router from "./utils/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utils/UtilsComponents/ScrollToTop";

const App = () => {
  return (
    <>
      <ToastContainer theme="dark" />
      <GoogleOAuthProvider clientId="576083536312-qit1tkuuf2r6qrt7mu6eresg94jmpisp.apps.googleusercontent.com">
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
