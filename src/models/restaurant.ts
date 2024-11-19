export interface Restaurant {
  id: number;
  name: string;
  location: string;
  photo_url: string;
  rating: number;
  veto: boolean;
  rank?: number;
  overall_rank?: number;
}
