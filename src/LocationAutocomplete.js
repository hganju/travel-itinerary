// src/LocationAutocomplete.js
import React, { useState, useEffect } from "react";

const LocationAutocomplete = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Use a 500ms debounce to limit API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => {
                onSelect(s);
                setQuery(s.display_name);
                setSuggestions([]);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
