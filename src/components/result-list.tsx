"use client";
import React from "react";
import { Restaurant } from "@/models/restaurant";
import useGetResult from "@/hooks/useGetResult";

const ResultList = ({ code }: { code: string }) => {
  const { data, loading, error } = useGetResult(code);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.restaurants || data.restaurants.length === 0) {
    return <div>No restaurants found.</div>;
  }

  const filteredAndSortedRestaurants = data.restaurants
    .filter((restaurant: Restaurant) => restaurant.veto <= 0)
    .sort((a: Restaurant, b: Restaurant) => {
      const rankA = a.overall_rank ?? 0;
      const rankB = b.overall_rank ?? 0;

      return rankA - rankB;
    });

  return (
    <div>
      <>Rankings Submitted: {data.ranked}</>
      <ul>
        {filteredAndSortedRestaurants.map(
          (restaurant: Restaurant, index: number) => (
            <li key={index}>
              {index + 1}. {restaurant.name} - Rating: {restaurant.rating}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default ResultList;
