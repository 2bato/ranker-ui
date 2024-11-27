"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/sortable-item";
import RestaurantCardDND from "@/components/restaurant-card-dnd";
import { setRestaurants, setUserRank } from "@/redux/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { Restaurant } from "@/models/restaurant";

const DragAndDropRank = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state: any) => {
    const activeRestaurants = state.restaurants.active_restaurants;
    return activeRestaurants
      ? activeRestaurants.filter(
          (restaurant: Restaurant) => restaurant.veto === 0
        )
      : [];
  });

  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [reorderedRestaurants, setReorderedRestaurants] = useState<
    Restaurant[]
  >([]);

  const restaurantIds = restaurants.map(
    (restaurant: Restaurant) => restaurant.id
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      const initialOrder = restaurants;
      setReorderedRestaurants(initialOrder);

      initialOrder.forEach((restaurant: Restaurant, index: number) => {
        dispatch(setUserRank({ restaurantId: restaurant.id, rank: index + 1 }));
      });
    }
  }, [mounted, restaurants, dispatch]);

  useEffect(() => {
    if (reorderedRestaurants.length > 0) {
      dispatch(setRestaurants(reorderedRestaurants));

      reorderedRestaurants.forEach((restaurant, index) => {
        dispatch(setUserRank({ restaurantId: restaurant.id, rank: index + 1 }));
      });
      console.log(reorderedRestaurants);
    }
  }, [reorderedRestaurants, dispatch]);

  const handleDragStart = useCallback((event: { active: any }) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: { active: any; over: any }) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const newOrder = arrayMove(
          restaurantIds,
          restaurantIds.indexOf(active.id),
          restaurantIds.indexOf(over.id)
        );

        const updatedRestaurants = newOrder.map((id) =>
          restaurants.find((r: Restaurant) => r.id === id)
        );

        setReorderedRestaurants(updatedRestaurants.filter(Boolean));
      }

      setActiveId(null);
    },
    [restaurantIds, restaurants]
  );

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ touchAction: "none" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={restaurantIds}
          strategy={verticalListSortingStrategy}
        >
          {restaurantIds.map((id: number) => {
            const restaurant = restaurants.find((r: Restaurant) => r.id === id);
            return (
              <SortableItem key={id} restaurant={restaurant}>
                <RestaurantCardDND restaurant={restaurant} />
              </SortableItem>
            );
          })}
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <RestaurantCardDND
              restaurant={restaurants.find(
                (restaurant: Restaurant) => restaurant.id === activeId
              )}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragAndDropRank;
