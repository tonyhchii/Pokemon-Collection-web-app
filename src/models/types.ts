export interface Collection {
  id: number;
  name: string;
  created_at: string;
  user_id: number;
}

export interface Card {
  id: string;
  collection_id: number;
  name: string;
  quantity: number;
  series: string;
  set_name: string;
  set_number: string;
  image_url: string;
  tcgplayer_url: string;
  prices: Record<string, number>[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  created_at: string;
}
