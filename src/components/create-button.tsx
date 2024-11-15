import React, { useState, MouseEvent } from "react";
import useCreateSession from "@/hooks/useCreateSession";

const CreateButton = ({ code }: { code: string }) => {
  const { createSession, data, loading, error } = useCreateSession();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    createSession(code);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading || !code}>
        "Create"
      </button>
    </div>
  );
};
