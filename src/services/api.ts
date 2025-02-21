import axios from "axios";
import { Collection, Card } from "../models/types";
import { getUserIdFromToken } from "../utils/auth";

const API_URL = "http://localhost:3001/";

export const getProtectedData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await axios.get(`${API_URL}protected-endpoint`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error logging in:",
        error.response?.data?.error || error.message
      );
      throw new Error("Failed to fetch protected data");
    }
  }
};

// Create a new collection
export const createCollection = async (
  collectionName: string
): Promise<Collection> => {
  const userId = getUserIdFromToken();
  try {
    const response = await axios.post<Collection>(
      `${API_URL}users/${userId}/collections`,
      { name: collectionName }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
};

// Get all collections for a user
export const getUserCollections = async (): Promise<Collection[]> => {
  const userId = getUserIdFromToken();
  console.log(userId);
  if (!userId) {
    throw new Error("User ID not found in token.");
  }
  try {
    const response = await axios.get<Collection[]>(
      `${API_URL}users/${userId}/collections`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

// Add a card to a collection
export const addCardToCollection = async (
  collectionId: number,
  card: Card
): Promise<Card> => {
  try {
    const response = await axios.post<Card>(
      `${API_URL}collections/${collectionId}/cards`,
      card
    );
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const getCards = async (
  name: string,
  set: string,
  series: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await axios.get(`${API_URL}cards`, {
      params: {
        name,
        set,
        series,
        page,
        pageSize,
      },
    });

    const { data, pagination } = response.data;

    return {
      data, // Array of cards
      pagination, // Pagination metadata
    };
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch cards");
  }
};

export const getCardsInCollection = async (collectionId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}collections/${collectionId}/cards`
    );

    const cards: Card[] = response.data;
    return cards;
  } catch (error) {
    console.error("Error fetching cards from collection:", error);
    throw new Error("Failed to fetch cards from collection");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}users/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error logging in:",
        error.response?.data?.error || error.message
      );
      throw new Error(error.response?.data?.error || "Login failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Login failed due to an unknown error");
    }
  }
};
