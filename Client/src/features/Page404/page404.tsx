import Button from "../../utils/UtilsComponents/Button"
import { useNavigate } from "react-router-dom";

export default function Page404() {
    const navigate = useNavigate();
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mt-4 mb-4">Page Not Found</p>
          <Button onClick={()=> navigate("/")} >Go back to feed</Button>
        </div>
      </div>
    );
  }
  