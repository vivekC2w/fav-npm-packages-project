import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AddFavorite from "./components/AddFavorite";
import Favorites from "./components/Favourites";
function App() {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (favorite) => {
    setFavorites([...favorites, favorite]);
  };

  const handleDeleteFavorite = (favoriteToDelete) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== favoriteToDelete.id
    );
    setFavorites(updatedFavorites);
  };

  const handleEditFavorite = (editedFavorite) => {
    const updatedFavorites = favorites.map((favorite) =>
      favorite.id === editedFavorite.id ? editedFavorite : favorite
    );
    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      <div className="App">
        <nav className="bg-blue-500 p-4">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:underline">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <AddFavorite
                packages={favorites}
                onAddFavourites={handleAddFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onDelete={handleDeleteFavorite}
                onEdit={handleEditFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
