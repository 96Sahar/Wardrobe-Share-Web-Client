import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import Router from "./utils/Router";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <>
    <GoogleOAuthProvider clientId="576083536312-qit1tkuuf2r6qrt7mu6eresg94jmpisp.apps.googleusercontent.com">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  );
};

export default App;
