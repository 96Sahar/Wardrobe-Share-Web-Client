import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Heart, UserRound } from "lucide-react";
import Button from "./Button";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import { toast } from "react-toastify";
import { UserData } from "../../services/interfaceService";
import { getUserById as getUserByIdAPI } from "../../services/userService";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = Cookies.get("authToken");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleCreatePostNavigation = () => {
    const checkToken = Cookies.get("authToken");

    if (!checkToken && checkToken === token) {
      toast.error("Only members can list an item");
    }
    navigate(checkToken ? "/createPost" : "/loginAndRegistration");
  };

  useEffect(() => {
    const id = Cookies.get("userInfo");
    if (id) {
      const parsedId = JSON.parse(id);
      getUserByIdAPI(parsedId._id)
        .then((userInfo) => {
          console.log("Fetched user data:", userInfo); // Add this for debugging
          setUser(userInfo);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-6 border-b-[3px] border-slate-700 sticky top-0 z-50 bg-gray-200 text-black">
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-14 hover:cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-5">
          <Button
            onClick={() => {
              handleCreatePostNavigation();
            }}
          >
            List your item
          </Button>
          <div className="items-center cursor-pointer">
            <Heart className="h-7 inline-flex m-1" />
            <h2 className="text-xl inline-flex m-1 items-center">
              Your liked items
            </h2>
          </div>
          <div
            className="items-center cursor-pointer"
            onClick={() => navigate("/LoginAndRegistration")}
          >
            <UserRound className="h-7 inline-flex m-1" />
            <h2 className="text-xl inline-flex m-1 items-center">
              {user ? `${user?.fullname}` : "Sign in"}
            </h2>
          </div>
        </div>

        {/* Burger Menu Icon */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-300 shadow-md z-40 md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  navigate("/LoginAndRegistration");
                  setIsMenuOpen(false);
                }}
              >
                <UserRound className="h-7 inline-flex m-1" />
                <h2 className="text-lg inline-flex m-1 items-center">
                  {user ? `${user.f_name}` : "Sign in"}
                </h2>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <Heart className="h-7 inline-flex m-1" />
                <h2 className="text-lg inline-flex m-1 items-center">
                  Your liked items
                </h2>
              </div>
              <Button
                onClick={() => {
                  handleCreatePostNavigation();
                  setIsMenuOpen(false);
                }}
              >
                List your item
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
