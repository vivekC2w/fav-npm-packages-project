import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmModal";

function Favorites({ favorites, onDelete, onEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [packageToView, setPackageToView] = useState(null);
  const [packageToEdit, setPackageToEdit] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedWhy, setEditedWhy] = useState("");

  const handleDeleteClick = (favorite) => {
    setPackageToDelete(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite) => {
    setPackageToView(favorite);
  };

  const handleEditClick = (favorite) => {
    setPackageToEdit(favorite);
    setEditedName(favorite.name);
    setEditedWhy(favorite.why);
  };

  const handleConfirmDelete = () => {
    onDelete(packageToDelete);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSaveEdit = () => {
    // Implement logic to save the edited package here
    const updatedPackage = {
      ...packageToEdit,
      name: editedName,
      why: editedWhy,
    };
    onEdit(updatedPackage); // Call the onEdit function to update the favorite
    setPackageToEdit(null); // Clear editing state
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to Favorite NPM Packages
      </h2>
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li
            key={favorite.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">
                {favorite.name} - {favorite.why}
              </p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => handleViewClick(favorite)}
              >
                <FontAwesomeIcon icon={faEye} /> View
              </button>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => handleEditClick(favorite)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteClick(favorite)}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showDeleteModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${packageToDelete.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {packageToView && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="mb-4">{`Viewing: ${packageToView.name} - ${packageToView.why}`}</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setPackageToView(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {packageToEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="mb-4">{`Editing: ${packageToEdit.name} - ${packageToEdit.why}`}</p>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="editedName">
                Name:
              </label>
              <input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="editedWhy">
                Why is this your favorite?
              </label>
              <textarea
                id="editedWhy"
                value={editedWhy}
                onChange={(e) => setEditedWhy(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setPackageToEdit(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                onClick={handleSaveEdit} // Call handleSaveEdit here
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
