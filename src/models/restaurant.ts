export interface Restaurant {
  id: number;
  name: string;
  photo_url: string;
  rating: number;
  veto: number;
  rank?: number;
  overall_rank?: number;
}
