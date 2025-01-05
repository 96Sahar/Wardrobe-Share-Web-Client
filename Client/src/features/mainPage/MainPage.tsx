import React, { useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import HeroSearch from "../../utils/UtilsComponents/HeroSearch";
import Card from "./MainPageComponents/Card";
import CardViewModal from "./MainPageComponents/CardViewModal";
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
