import React, { useEffect, useState } from "react";
import { Collection } from "../models/types";
import { getUserCollections, createCollection } from "../services/api";
import { Link } from "react-router-dom";

const Collections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string>("");
  const [newCollectionName, setNewCollectionName] = useState<string>("");

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await getUserCollections();

      setCollections(response);

      if (response.length === 0) {
        setError("No collections found.");
      }
    } catch (err) {
      setError("Failed to fetch collections. Please try again.");
      console.error(err);
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCollectionName.trim()) {
      setError("Collection name cannot be empty.");
      return;
    }

    try {
      const newCollection = await createCollection(newCollectionName);
      setCollections([...collections, newCollection]); // Add the new collection to the list
      setNewCollectionName(""); // Clear the input field
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to create collection. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Your Collections</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCreateCollection}>
        <input
          type="text"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          placeholder="Enter collection name"
          required
        />
        <button type="submit">Create Collection</button>
      </form>

      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
