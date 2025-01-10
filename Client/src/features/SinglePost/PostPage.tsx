import React from "react";
import Header from "../../utils/UtilsComponents/Header";
import PostDetails from "./PostPageComponents/PostDetails";
import CommentSection from "./PostPageComponents/CommentSection";
import { IData } from "../../utils/types/cardData";
import userimage from "../../assets/user.png";
import DummyJeans from "../../assets/JeansDummyPic.jpg";

const PostPage: React.FC = () => {
  const postData: IData = {
    user: "Sahar Yosef",
    userImage: userimage,
    picture: DummyJeans,
    title: "Jeans",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit sectetur adipiscing elit. lorem ipsum dolor sit",
    category: "Bottoms",
    phone: "123-456-7890",
    region: "Tel Aviv",
    city: "Tel Aviv",
    likes: ["John Doe", "Jane Doe"],
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-6 mt-4 p-6">
        <PostDetails data={postData} />
        <CommentSection />
      </div>
    </div>
  );
};

export default PostPage;
