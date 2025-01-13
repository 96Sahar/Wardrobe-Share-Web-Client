import Header from "../../utils/UtilsComponents/Header";
import CreatePost from "./createPostComponents/CreateAPost";

const CreatePostPage = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <CreatePost />
    </main>
  );
};

export default CreatePostPage;
