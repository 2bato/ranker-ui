import { SpringValue } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { animated, Interpolation } from "react-spring";
import { Restaurant } from "@/models/restaurant";
type RestaurantCardSwipeProps = {
  restaurant: Restaurant; // The restaurant object that contains image and name
  style: {
    x: SpringValue<number>; // Spring value for x position
    y: SpringValue<number>; // Spring value for y position
    transform: Interpolation<string>; // Spring value for transform (rotation, scaling, etc.)
  };
  bind: ReactDOMAttributes; // Bind function from useDrag for drag events
};

const RestaurantCardSwipe: React.FC<RestaurantCardSwipeProps> = ({
  restaurant,
  style,
  bind,
}) => {
  return (
    <animated.div
      {...bind} // Apply drag binding
      style={style} // Apply spring styles (transform, position, etc.)
      className="w-40 h-60 rounded-lg bg-black flex justify-center items-center"
    >
      <div className="bottom-0 bg-gradient-to-t from-black text-white w-full p-2 text-center text-lg font-semibold">
        {restaurant.name} {/* Display restaurant name */}
      </div>
    </animated.div>
  );
};

export default RestaurantCardSwipe;
