"use client";
import React, { MouseEvent } from "react";
import useRank from "@/hooks/useRank";

const RankButton = ({ code, username }: { code: string; username: string }) => {
  const { submitRank, loading, error } = useRank();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    submitRank(code, username);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        Submit
      </button>
    </div>
  );
};

export default RankButton;
