import React from "react";
import { Card as CardType } from "../models/types"; // Import the Card type

interface CardProps {
  card: CardType;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  // Calculate the total price
  const totalPrice = card.prices[0].price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Card Image */}
      <img
        src={card.image_url}
        alt={card.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Card Name */}
        <h2 className="text-xl font-bold mb-2">{card.name}</h2>

        {/* Card Info */}
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Set:</span> {card.set_name}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Series:</span> {card.series}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Number:</span> {card.set_number}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Quantity:</span> {card.quantity}
        </p>

        {/* Total Price */}
        <p className="text-lg font-bold">
          <span className="font-medium">Total Price:</span> ${totalPrice}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
