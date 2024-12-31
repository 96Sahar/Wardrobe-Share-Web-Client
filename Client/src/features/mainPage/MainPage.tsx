import React from "react";
import Header from "../../utils/Components/Header";
import Card from "./Components/Card";
import DummyJeans from "../../assets/JeansDummyPic.jpg";

const dummyData = [
  {
    user: "Sahar Yosef",
    picture: DummyJeans,
    description: "Good quality jeans",
    location: "Tel Aviv",
    contact: "053-4031211",
  },
  {
    user: "Ori Levi",
    picture: DummyJeans,
    description: "Barely used jeans",
    location: "Jerusalem",
    contact: "054-6781234",
  },
  {
    user: "Sahar Yosef",
    picture: DummyJeans,
    description: "Good quality jeans",
    location: "Tel Aviv",
    contact: "053-4031211",
  },
  {
    user: "Ori Levi",
    picture: DummyJeans,
    description: "Barely used jeans",
    location: "Jerusalem",
    contact: "054-6781234",
  },
  {
    user: "Sahar Yosef",
    picture: DummyJeans,
    description: "Good quality jeans",
    location: "Tel Aviv",
    contact: "053-4031211",
  },
  {
    user: "Ori Levi",
    picture: DummyJeans,
    description: "Barely used jeans",
    location: "Jerusalem",
    contact: "054-6781234",
  },
  {
    user: "Sahar Yosef",
    picture: DummyJeans,
    description: "Good quality jeans",
    location: "Tel Aviv",
    contact: "053-4031211",
  },
  {
    user: "Ori Levi",
    picture: DummyJeans,
    description: "Barely used jeans",
    location: "Jerusalem",
    contact: "054-6781234",
  },
];

const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        {dummyData.map((item, index) => (
          <Card
            key={index}
            picture={item.picture}
            user={item.user}
            description={item.description}
            location={item.location}
            contact={item.contact}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
