import React from "react";
import { Card as CardType } from "../models/types"; // Import the Card type

interface CardProps {
  card: CardType;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  if (!card || !card.image_url || !card.name) {
    return <div>Error: Invalid card data</div>; // Render a fallback if card data is invalid
  }

  // Calculate the total price (check if prices exist and fall back to 0 if not)
  const price = card.prices.length > 0 ? card.prices[0].price : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto p-2 hover:shadow-lg transition-shadow duration-300 flex items-center w-full">
      {/* Card Image */}
      <img
        src={card.image_url}
        alt={card.name}
        className="w-32 h-48 object-cover rounded-l-lg"
      />

      {/* Card Content */}
      <div className="p-4 ml-4 flex-1">
        {/* Card Name */}
        <h2 className="text-xl font-bold mb-2">{card.name}</h2>

        {/* Card Info */}
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Set:</span> {card.set_name}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Number:</span> {card.set_number}
        </p>

        {/* Total Price */}
        <p className="text-lg font-bold">
          <span className="font-medium">Price:</span> ${price}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
