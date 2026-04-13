import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock dataset
const DATA = [
  {
    id: 1,
    type: "Cloth Shop",
    name: "Trendz Fashion",
    city: "Muzaffarpur",
    state: "Bihar",
    phone: "9876543210",
    photo: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    location: "https://maps.google.com",
  },
  {
    id: 2,
    type: "School",
    name: "Bright Future School",
    city: "Muzaffarpur",
    state: "Bihar",
    phone: "9123456780",
    photo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    location: "https://maps.google.com",
  },
  {
    id: 3,
    type: "Shoes Shop",
    name: "Urban Shoes Hub",
    city: "Patna",
    state: "Bihar",
    phone: "9988776655",
    photo: "https://images.unsplash.com/photo-1528701800489-20be3c2eaebf",
    location: "https://maps.google.com",
  },
];

export default function App() {
  const [step, setStep] = useState("splash");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = DATA.filter(
    (item) =>
      item.city.toLowerCase() === city.toLowerCase() &&
      item.state.toLowerCase() === state.toLowerCase() &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()))
  );

  // Splash
  if (step === "splash") {
    return (
      <div
        className="h-screen flex items-center justify-center bg-black text-white text-2xl font-bold animate-pulse"
        onClick={() => setStep("onboard")}
      >
        Locify
      </div>
    );
  }

  // Onboarding
  if (step === "onboard") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to Locify</h1>

        <input
          className="p-2 m-2 text-black rounded"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 m-2 text-black rounded"
          placeholder="Enter your state"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          className="p-2 m-2 text-black rounded"
          placeholder="Enter your city"
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="bg-white text-black px-6 py-2 mt-4 rounded"
          onClick={() => setStep("home")}
        >
          Enter Locify
        </button>
      </div>
    );
  }

  // Detail page
  if (selected) {
    return (
      <div className="p-4">
        <button onClick={() => setSelected(null)}>⬅ Back</button>

        <img
          src={selected.photo}
          className="w-full h-60 object-cover rounded"
        />

        <h2 className="text-2xl font-bold mt-2">{selected.name}</h2>
        <p>{selected.type}</p>
        <p>
          {selected.city}, {selected.state}
        </p>

        <a href={`tel:${selected.phone}`} className="block mt-3 text-blue-600">
          Call: {selected.phone}
        </a>

        <a
          href={selected.location}
          target="_blank"
          className="block mt-2 text-green-600"
        >
          Open in Map
        </a>
      </div>
    );
  }

  // Home
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Hi {name || "User"} 👋</h1>

      <input
        className="w-full p-2 border rounded mt-3"
        placeholder="Search shops, schools, etc."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-4 space-y-3">
        {filtered.length === 0 && (
          <p className="text-gray-500">No results found</p>
        )}

        {filtered.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="border p-3 rounded shadow cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.type}</p>
            <p className="text-xs">
              {item.city}, {item.state}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
      }
