import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/models/restaurant";

interface RestaurantState {
  active_restaurants: Restaurant[];
  vetoed: number[];
}

const initialState: RestaurantState = {
  active_restaurants: [
    {
      id: 1,
      name: "r1",
      location: "??",
      photo_url: "??",
      rating: 5,
      veto: false,
    },
    {
      id: 2,
      name: "r2",
      location: "??",
      photo_url: "??",
      rating: 2,
      veto: false,
    },{
      id: 3,
      name: "r3",
      location: "??",
      photo_url: "??",
      rating: 2,
      veto: false,
    },{
      id: 4,
      name: "r4",
      location: "??",
      photo_url: "??",
      rating: 2,
      veto: false,
    },{
      id: 25,
      name: "r5",
      location: "??",
      photo_url: "??",
      rating: 2,
      veto: false,
    },
  ],
  vetoed: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.active_restaurants = action.payload;
    },
    vetoRestaurant: (state, action: PayloadAction<number>) => {
      if (!state.vetoed.includes(action.payload)) {
        state.vetoed.push(action.payload);
        const restaurant = state.active_restaurants.find(
          (r) => r.id === action.payload
        );
        if (restaurant) {
          restaurant.veto = true;
        }
      }
    },
    removeVetoedRestaurants: (state, action: PayloadAction<number>) => {
      state.vetoed = state.vetoed.filter((id) => id !== action.payload);
    },
    setUserRank: (
      state,
      action: PayloadAction<{ restaurantId: number; rank: number }>
    ) => {
      const restaurant = state.active_restaurants.find(
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
        const restaurant = state.active_restaurants.find(
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
  vetoRestaurant,
  removeVetoedRestaurants,
  setUserRank,
  setOverallRank,
  setVetoedRestaurants,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
