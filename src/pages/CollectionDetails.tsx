import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardsInCollection } from "../services/api";
import { Card } from "../models/types";

const CollectionDetails: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCardsInCollection(collectionId!);
        setCards(data.cards);
        setCollectionName(data.collectionName);
      } catch (err) {
        setError("Failed to fetch cards. Please try again.");
        console.error(err);
      }
    };

    fetchCards();
  }, [collectionId]);

  return (
    <div>
      <h1>{collectionName}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="cards-list">
        {cards.map((card) => (
          <li key={`${card.id}-${card.collection_id}`} className="card-item">
            <h2>{card.name}</h2>
            <p>Quantity: {card.quantity}</p>
            <img src={card.image_url} alt={card.name} />
            <p>Set: {card.set_name}</p>
            <p>Number: {card.set_number}</p>
            <div>
              <h3>Prices:</h3>
              <ul>
                {card.prices.map((price, index) => (
                  <li key={index}>
                    <strong>Condition:</strong> {price.condition},{" "}
                    <strong>Price:</strong> ${price.price}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionDetails;
