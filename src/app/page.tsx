"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import CreateButton from "@/components/create-button";
import JoinButton from "@/components/join-button";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter session code"
            className="border p-2 rounded text-black"
          />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
            className="border p-2 rounded text-black"
          />

          <CreateButton code={code} username={username} />
          <JoinButton code={code} username={username} />
        </div>
      </main>
    </Provider>
  );
}
