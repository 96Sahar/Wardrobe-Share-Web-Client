import DummyJeans from "../../assets/JeansDummyPic.jpg";

export interface CardData {
  user: string;
  picture: string;
  description: string;
  location: string;
  contact: string;
}

const dummyData: CardData[] = [
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

export default dummyData;
