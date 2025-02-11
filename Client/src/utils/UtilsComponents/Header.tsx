import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Heart, UserRound } from "lucide-react";
import Button from "./Button";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import { toast } from "react-toastify";
import { UserData } from "../../services/interfaceService";
import { getUserById, logout } from "../../services/userService";
import userPlaceholder from "../../assets/user.png";
import { formatPictureUrl } from "../../services/httpClient";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavigation = (navigation: string) => {
    const checkToken = Cookies.get("authToken");

    if (!checkToken) {
      if (navigation !== "LoginAndRegistration") {
        toast.error(`Must be logged in for that action!`);
      }
      navigate("/LoginAndRegistration");
      return;
    }

    navigate(`/${navigation}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out see you soon!");
      navigate("/");
      setUser(null);
    } catch (error: unknown) {
      console.error("Logout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during logout"
      );
    }
  };

  useEffect(() => {
    const id = Cookies.get("userInfo");
    if (id) {
      const parsedId = JSON.parse(id);
      getUserById(parsedId._id)
        .then((userInfo) => {
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

        <div className="hidden md:flex space-x-5">
          <Button
            onClick={() => {
              handleNavigation("CreatePost");
            }}
          >
            List your item
          </Button>
          <div
            className="items-center cursor-pointer"
            onClick={() => handleNavigation("LikedItems")}
          >
            <Heart className="h-7 inline-flex m-1 color-red" />
            <h2 className="text-xl inline-flex m-1 items-center">
              Your liked items
            </h2>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={
              user
                ? toggleDropdown
                : () => handleNavigation("LoginAndRegistration")
            }
          >
            {user ? (
              <img
                className="h-7 w-7 inline-flex m-1 rounded-full"
                src={
                  user.picture
                    ? formatPictureUrl(user.picture)
                    : userPlaceholder
                }
                alt={user.fullname}
              />
            ) : (
              <UserRound className="h-7 inline-flex m-1" />
            )}
            <h2 className="text-xl inline-flex m-1 items-center">
              {user ? `${user.fullname}` : "Sign in"}
            </h2>
          </div>

          {dropdownOpen && user && (
            <div className="absolute right-0 mt-10 bg-white border rounded shadow-lg w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/Profile")}
              >
                Profile Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

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

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-300 shadow-md z-40 md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={
                  user
                    ? toggleDropdown
                    : () => navigate("/LoginAndRegistration")
                }
              >
                <img
                  className="h-7 w-7 inline-flex m-1 rounded-full"
                  src={
                    user?.picture
                      ? formatPictureUrl(user.picture)
                      : userPlaceholder
                  }
                  alt={user ? user.fullname : "User"}
                />
                <h2 className="text-lg inline-flex m-1 items-center">
                  {user ? `${user.fullname}` : "Sign in"}
                </h2>
              </div>

              {dropdownOpen && user && (
                <div className="mt-2 bg-white border rounded shadow-lg w-40">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/Profile");
                      setDropdownOpen(false);
                    }}
                  >
                    Profile Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  handleNavigation("LikedItems");
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
                  handleNavigation("CreatePost");
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
