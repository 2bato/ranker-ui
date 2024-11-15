"use client";
import React, { MouseEvent } from "react";
import useJoinSession from "@/hooks/useJoinSession";

const JoinButton = ({ code }: { code: string }) => {
  const { joinSession, data, loading, error } = useJoinSession();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    joinSession(code);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading || !code}>
        Join
      </button>
    </div>
  );
};

export default JoinButton;
