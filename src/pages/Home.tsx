import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserCollections,
  getCards,
  createCollection,
} from "../services/api";
import CardComponent from "../components/CardComponent";
import { Card } from "../models/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<
    { id: number; name: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newCollectionName, setNewCollectionName] = useState<string>("");

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (!token) return;

    const fetchCollections = async () => {
      try {
        const data = await getUserCollections();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  // Fetch cards when searchTerm or page changes
  useEffect(() => {
    if (!searchQuery) return;

    const fetchCards = async () => {
      try {
        const result = await getCards(searchQuery, page, 9); // Pass correct page & limit
        setCards(result.data);
        setTotalPages(result.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [searchQuery, page]); // Runs when searchTerm or page changes

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setSearchQuery(searchTerm); // Set the query for searching
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page to 1 when search term changes
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCollection = await createCollection(newCollectionName);
      setCollections([...collections, newCollection]); // Add the new collection to the list
      setNewCollectionName(""); // Clear the input field
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-full">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded text-xl"
          >
            Log In
          </button>
        </div>
      ) : (
        <aside className="w-1/5 bg-gray-800 text-white p-4 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold mb-4">Collections</h2>
            <ul>
              {collections.map((collection) => (
                <li
                  key={collection.id}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  {collection.name}
                </li>
              ))}
            </ul>
            <form onSubmit={handleCreateCollection}>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name"
                className="bg-white-500 px-4 py-2 rounded"
                required
              />
              <button
                onClick={handleCreateCollection}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-auto"
              >
                Create Collection
              </button>
            </form>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-auto"
          >
            Logout
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="w-3/4 p-6">
        {isAuthenticated && (
          <>
            <div className="flex mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for cards..."
                className="p-2 border rounded w-full"
              />

              <button
                onClick={handleSearch}
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>

            {/* Display Cards */}
            <div className="grid grid-cols-3 gap-2">
              {cards.map((card) => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>

            {/* Pagination Controls */}
            {searchTerm && totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
