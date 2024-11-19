"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import CreateButton from "@/components/create-button";
import JoinButton from "@/components/join-button";
import { useState } from "react"; // Import useState for handling input state
import DragAndDropRank from "@/components/drag-and-drop-rank";
import Deck from "@/components/swipe-veto";

export default function Home() {
  const [code, setCode] = useState<string>(""); // State to hold the code input

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <Provider store={store}>
      <Deck></Deck>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter session code"
            className="border p-2 rounded text-black"
          />

          <CreateButton code={code} />
          <JoinButton code={code} />
        </div>
        <DragAndDropRank />
      </main>
    </Provider>
  );
}
