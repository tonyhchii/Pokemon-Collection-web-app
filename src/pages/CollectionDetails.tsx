import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardsInCollection } from "../services/api";
import { Card } from "../models/types";
import CardComponent from "../components/cardComponent";

const CollectionDetails: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");

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

  // Filter and sort cards based on search query and sort option
  const filteredCards = cards
    .filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "price") {
        return a.prices[0].price - b.prices[0].price;
      }
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">{collectionName}</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <CardComponent
              key={`${card.id}-${card.collection_id}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
