import React, { useState } from "react";
import Header from "../../utils/Components/Header";
import HeroSearch from "../../utils/Components/HeroSearch";
import Card from "./Components/Card";
import CardViewModal from "./Components/CardViewModal";
import dummyData, { CardData } from "./DummyData";

const MainPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cardData: CardData) => {
    setSelectedCard(cardData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <Header />
      <HeroSearch />
      <div className="p-4">
        {dummyData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item)}
            className="cursor-pointer"
          >
            <Card
              picture={item.picture}
              user={item.user}
              description={item.description}
              location={item.location}
              contact={item.contact}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedCard && (
        <CardViewModal cardDetails={selectedCard} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MainPage;
