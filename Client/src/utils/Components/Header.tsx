import { useNavigate } from "react-router-dom";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import ProfileLogo from "../../assets/Profile-Logo.png";
import AddPostLogo from "../../assets/AddPost-Logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="sticky top-0 flex justify-between items-center px-4 mt-4">
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-32 w-80 cursor-pointer mx-4"
          onClick={() => navigate("/main")}
          title="Home"
        />

        <div className="flex mx-4 space-x-12">
          <img
            src={AddPostLogo}
            alt="AddPostLogo"
            className="h-20 w-20 cursor-pointer"
            title="Add Post"
            onClick={() => alert("Navigate to Post Page")}
          />
          <img
            src={ProfileLogo}
            alt="ProfileLogo"
            className="h-20 w-20 cursor-pointer"
            title="Profile"
            onClick={() => alert("Navigate to Profile Page")}
          />
        </div>
      </header>

      <div className="h-[4px] bg-slate-700 mt-10 mb-10"></div>
    </>
  );
};

export default Header;
