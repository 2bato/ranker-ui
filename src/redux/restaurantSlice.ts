import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  photo_url: string;
  rank?: number;
  overall_rank?: number;
}

interface RestaurantState {
  restaurants: Restaurant[];
  vetoed: number[];
}

const initialState: RestaurantState = {
  restaurants: [],
  vetoed: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    addVetoedRestaurant: (state, action: PayloadAction<number>) => {
      if (!state.vetoed.includes(action.payload)) {
        state.vetoed.push(action.payload);
      }
    },
    removeVetoedRestaurant: (state, action: PayloadAction<number>) => {
      state.vetoed = state.vetoed.filter((id) => id !== action.payload);
    },
    setUserRank: (
      state,
      action: PayloadAction<{ restaurantId: number; rank: number }>
    ) => {
      const restaurant = state.restaurants.find(
        (r) => r.id === action.payload.restaurantId
      );
      if (restaurant) {
        restaurant.rank = action.payload.rank;
      }
    },
    setVetoedRestaurants: (state, action: PayloadAction<number[]>) => {
      state.vetoed = action.payload;
    },
    setOverallRank: (
      state,
      action: PayloadAction<{ [restaurantId: number]: number }>
    ) => {
      Object.entries(action.payload).forEach(([restaurantId, overall_rank]) => {
        const restaurant = state.restaurants.find(
          (r) => r.id === Number(restaurantId)
        );
        if (restaurant) {
          restaurant.overall_rank = overall_rank;
        }
      });
    },
  },
});

export const {
  setRestaurants,
  addVetoedRestaurant,
  removeVetoedRestaurant,
  setUserRank,
  setOverallRank,
  setVetoedRestaurants,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
