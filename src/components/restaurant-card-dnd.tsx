import { Restaurant } from "@/models/restaurant";
import React, { forwardRef } from "react";

// You can import an external library to display stars, e.g., 'react-icons' or a custom star system.
import { FaStar } from "react-icons/fa";

interface ItemProps {
  restaurant: Restaurant;
  style?: React.CSSProperties;
}

export const RestaurantCardDND = forwardRef<HTMLDivElement, ItemProps>(
  ({ restaurant, style, ...props }, ref) => {
    const defaultStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    };

    const cardStyle: React.CSSProperties = {
      ...defaultStyle,
      ...style,
    };

    const imageStyle: React.CSSProperties = {
      width: "100px",
      height: "100px",
      marginRight: "15px",
      borderRadius: "8px",
      objectFit: "cover", // Ensures the image covers the space without distortion
    };

    // Function to render stars based on the rating
    const renderRatingStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} color="#FFD700" />);
      }

      if (halfStar) {
        stars.push(
          <FaStar key="half" color="#FFD700" style={{ opacity: 0.5 }} />
        );
      }

      while (stars.length < 5) {
        stars.push(<FaStar key={`empty-${stars.length}`} color="#ddd" />);
      }

      return stars;
    };

    return (
      <div {...props} ref={ref} style={cardStyle}>
        <img
          src={restaurant.photo_url || "/default-image.jpg"} // Default fallback image if photo_url is not provided
          alt={restaurant.name}
          style={imageStyle}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
            {restaurant.name}
          </h3>
          <div style={{ fontSize: "14px", color: "#555" }}></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px", fontSize: "16px" }}>
              Rating:
            </span>
            <div>{renderRatingStars(restaurant.rating || 0)}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default React.memo(RestaurantCardDND);
