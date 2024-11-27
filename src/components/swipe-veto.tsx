import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCardSwipe from "@/components/restaurant-card-swipe";
import { Restaurant } from "@/models/restaurant";
import { vetoRestaurant } from "@/redux/restaurantSlice";
import useVeto from "@/hooks/useVeto";

const SwipeVeto = ({ code, username }: { code: string; username: string }) => {
  const dispatch = useDispatch();
  const restaurants: Restaurant[] = useSelector(
    (state: any) => state.restaurants.active_restaurants
  );
  const { submitAndFetchVeto, loading, error } = useVeto();
  const [gone, setGone] = useState(new Set()); // Track flicked-out cards
  const [flashColor, setFlashColor] = useState<string | null>(null); // Track screen flash color

  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: Math.sin(i * 20) * 6,
    delay: i * 100,
  });

  const from = (_i: number) => ({
    x: 0,
    y: _i * -4,
    scale: 1,
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
      const trigger = vx > 0.2; // Trigger only if the swipe is fast enough
      const isLeftSwipe = xDir === -1;
      const isRightSwipe = xDir === 1;

      if (!active && trigger) {
        setFlashColor(isLeftSwipe ? "red" : "green");

        setTimeout(() => setFlashColor(null), 200);

        if (isLeftSwipe) {
          dispatch(vetoRestaurant(restaurants[index].id));
        } else if (isRightSwipe) {
        }

        gone.add(index);
        setGone(new Set(gone));
      }

      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (window.innerWidth + 120) * xDir : active ? mx : 0;
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
        setTimeout(() => {
          submitAndFetchVeto(code, username);
        }, 3200);
      }
    }
  );

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      {flashColor && (
        <div
          className={`absolute inset-0 ${
            flashColor === "red" ? "bg-red-500" : "bg-green-500"
          } opacity-20`}
          style={{
            transition: "opacity 0.3s ease",
            zIndex: 10,
          }}
        />
      )}

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
