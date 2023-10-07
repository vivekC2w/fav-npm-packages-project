import React, { useState, useEffect } from "react";
import "../App.css";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import TextArea from "../ReusableComponents/TextArea";

const LOCAL_STORAGE_KEY = "favoritePackages";

interface Package {
  id: number;
  name: string;
  why: string;
}

interface AddFavoriteProps {
  packages: Package[];
  onAddFavourites: (favorite: Package) => void;
}

const AddFavorite: React.FC<AddFavoriteProps> = ({
  packages,
  onAddFavourites,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [why, setWhy] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFavorites) {
      setSearchResults(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAddFavorite = () => {
    if (!selectedPackage || !why) {
      alert("Please select a package and provide a reason.");
      return;
    }

    //Checking if the selected package is already in favorites
    if (packages.some((pkg) => pkg.name === selectedPackage)) {
      alert("This package is already in your favorites.");
      return;
    }

    // Add to favorites
    const newFavorite: Package = {
      id: Date.now(), // Generate a unique ID
      name: selectedPackage,
      why,
    };

    const updatedFavorites = [...packages, newFavorite];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));

    onAddFavourites(newFavorite);

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
          sessionStorage.setItem(
            "favoritePackages",
            JSON.stringify(data.results)
          );
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
      <Input
        type="text"
        value={searchText}
        id="searchInput"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        placeholder="Type to search packages..."
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 mb-2">Results:</p>
      <ul>
        {searchResults.map((pkg) => (
          <li key={pkg?.package?.name} className="mb-2">
            <label className="flex items-center">
              <Input
                type="radio"
                value={pkg?.package?.name}
                // name="selectedPackage"
                onChange={() => setSelectedPackage(pkg?.package?.name)}
                className="mr-2"
              />
              {pkg?.package?.name}
            </label>
          </li>
        ))}
      </ul>

      <label htmlFor="favoriteReason" className="block mt-4 mb-2">
        Why is this your favorite?
      </label>
      <TextArea
        id="favoriteReason"
        value={why}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setWhy(e.target.value)
        }
        placeholder="Enter your reason here..."
        rows={4}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />

      <Button
        text="Submit"
        onClick={handleAddFavorite}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
      />
    </div>
  );
};

export default AddFavorite;
