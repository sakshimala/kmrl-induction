"use client";
import React, { useState } from "react";

type Train = {
  id: string;
  code: string;
  status: "idle" | "in-transit" | "maintenance";
};

const SAMPLE_TRAINS: Train[] = [
  { id: "1", code: "KM-101", status: "idle" },
  { id: "2", code: "KM-102", status: "in-transit" },
  { id: "3", code: "KM-103", status: "maintenance" },
];

export default function Dashboard() {
  const [trains, setTrains] = useState<Train[]>(SAMPLE_TRAINS);

  // Change train status in a cycle
  const changeStatus = (id: string) => {
    setTrains((prev) =>
      prev.map((train) =>
        train.id === id
          ? {
              ...train,
              status:
                train.status === "idle"
                  ? "in-transit"
                  : train.status === "in-transit"
                  ? "maintenance"
                  : "idle",
            }
          : train
      )
    );
  };

  // Add a new train
  const addTrain = () => {
    const newId = (trains.length + 1).toString();
    const newTrain: Train = {
      id: newId,
      code: `KM-10${newId}`,
      status: "idle",
    };
    setTrains((prev) => [...prev, newTrain]);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">KMRL Train Dashboard</h1>

      <button
        onClick={addTrain}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ➕ Add Train
      </button>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {trains.map((train) => (
          <div
            key={train.id}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-xl">{train.code}</h2>
            <p>
              Status:{" "}
              <span className="capitalize font-medium">{train.status}</span>
            </p>
            <button
              onClick={() => changeStatus(train.id)}
              className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🔄 Change Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
