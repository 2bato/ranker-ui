import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RestaurantCardDND from "@/components/restaurant-card-dnd";
import { Restaurant } from "@/models/restaurant";

interface SortableItemProps {
  restaurant: Restaurant;
  children: React.ReactNode;
}

const SortableItem = ({ restaurant, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: restaurant.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <RestaurantCardDND
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      restaurant={restaurant}
    ></RestaurantCardDND>
  );
};

export default SortableItem;
