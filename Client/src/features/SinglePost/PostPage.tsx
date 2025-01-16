import React, { useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import PostDetails from "./PostPageComponents/PostDetails";
import CommentSection from "./PostPageComponents/CommentSection";
import { useLocation } from "react-router-dom";

const PostPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [commentsCount, setCommentsCount] = useState(product.comments.length);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-6 mt-4 p-6">
        <PostDetails product={product} commentsCount={commentsCount} />
        <CommentSection
          postId={product._id}
          comments={product.comments}
          setCommentsCount={setCommentsCount}
        />
      </div>
    </div>
  );
};

export default PostPage;
