import React, { useState, useEffect } from "react";
import '../App.css';

function AddFavorite({ packages, onAddFavourites }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [why, setWhy] = useState("");
  const [error, setError] = useState(null);

  const handleAddFavorite = () => {
    // Validation: Check if a package and reason are provided
    if (!selectedPackage && !why) {
      alert("Please select a package and provide a reason.");
      return;
    }

    // Validation: Check if the selected package is already in favorites
    if (packages.some((pkg) => pkg.name === selectedPackage)) {
      alert("This package is already in your favorites.");
      return;
    }

    // Add to favorites
    onAddFavourites({
      id: Date.now(), // Generate a unique ID
      name: selectedPackage,
      why,
    });

    // Clear form fields
    setSelectedPackage("");
    setWhy("");
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setError(null); // Clear any previous errors

        if (searchText.trim() === "") {
          setSearchResults([]);
          return;
        }

        const response = await fetch(
          `https://api.npms.io/v2/search?q=${searchText}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data && data.results) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setSearchResults([]);
      }
    };

    fetchPackages();
  }, [searchText]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Add to Favorites</h2>
      <label htmlFor="searchInput" className="block mb-2">
        Search for NPM Packages:
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Type to search packages..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 mb-2">Results:</p>
      <ul>
        {searchResults.map((pkg) => (
          <li key={pkg.package.name} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="selectedPackage"
                value={pkg.package.name}
                onChange={() => setSelectedPackage(pkg.package.name)}
                className="mr-2"
              />
              {pkg.package.name}
            </label>
          </li>
        ))}
      </ul>

      <label htmlFor="favoriteReason" className="block mt-4 mb-2">
        Why is this your favorite?
      </label>
      <textarea
        id="favoriteReason"
        placeholder="Enter your reason here..."
        value={why}
        onChange={(e) => setWhy(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />

      <button
        onClick={handleAddFavorite}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

export default AddFavorite;
