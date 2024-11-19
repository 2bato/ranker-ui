import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCardSwipe from "@/components/restaurant-card-swipe"; // Import the RestaurantCardSwipe component
import { Restaurant } from "@/models/restaurant";
import { vetoRestaurant } from "@/redux/restaurantSlice";

// SwipeVeto component for restaurant cards
const SwipeVeto = () => {
  const dispatch = useDispatch();
  const restaurants: Restaurant[] = useSelector(
    (state: any) => state.restaurants.active_restaurants
  );
  const [gone, setGone] = useState(new Set()); // Track flicked-out cards

  const to = (i: number) => ({
    x: 0,
    y: i * -4, // Cards stacked vertically with a little offset
    scale: 1, // Set scale to 1 initially to avoid the "too big" issue
    rot: Math.sin(i * 20) * 6, // Random rotation only on client-side
    delay: i * 100,
  });

  const from = (_i: number) => ({
    x: 0,
    y: _i * -4, // Cards stacked vertically with a little offset
    scale: 1, // Set scale to 1 initially to avoid the "too big" issue
    rot: Math.sin(_i * 20) * 6,
  });

  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

  const [props, api] = useSprings(restaurants.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2;
      if (!active && trigger) {
        dispatch(vetoRestaurant(restaurants[index].id));
        console.log(restaurants[index].id);
        gone.add(index);
        setGone(new Set(gone));
      }

      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (window.innerWidth + 200) * xDir : active ? mx : 0;

        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0);
        const scale = active ? 1.1 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!active && gone.size === restaurants.length) {
        setTimeout(() => {
          setGone(new Set());
          api.start((i) => to(i));
        }, 600);
      }
    }
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="relative w-screen h-96 overflow-hidden flex justify-center items-center"
        style={{ position: "relative" }}
      >
        {props.map(({ x, y, rot, scale }, i) => {
          const restaurant = restaurants[i];

          const style = {
            x,
            y,
            transform: interpolate([rot, scale], trans),
            position: "absolute",
            willChange: "transform",
            touchAction: "none",
          };

          return (
            <RestaurantCardSwipe
              key={i}
              restaurant={restaurant}
              style={style}
              bind={bind(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwipeVeto;
