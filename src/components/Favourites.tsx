import React, { useState } from "react";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import TextArea from "../ReusableComponents/TextArea";

interface Favorite {
  id: number;
  name: string;
  why: string;
}

interface FavoritesProps {
  favorites: Favorite[];
  onDelete: (favorite: Favorite) => void;
  onEdit: (favorite: Favorite) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<Favorite | null>(null);
  const [packageToView, setPackageToView] = useState<Favorite | null>(null);
  const [packageToEdit, setPackageToEdit] = useState<Favorite | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedWhy, setEditedWhy] = useState<string>("");

  const handleDeleteClick = (favorite : Favorite) => {
    setPackageToDelete(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite : Favorite) => {
    setPackageToView(favorite);
  };

  const handleEditClick = (favorite : Favorite) => {
    setPackageToEdit(favorite);
    setEditedName(favorite.name);
    setEditedWhy(favorite.why);
  };

  const handleConfirmDelete = () => {
    if (packageToDelete) {
      onDelete(packageToDelete);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSaveEdit = () => {
    if (packageToEdit) {
      const updatedPackage: Favorite = {
        ...packageToEdit,
        name: editedName,
        why: editedWhy,
      };
      onEdit(updatedPackage);
      setPackageToEdit(null);
    }
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
              <Button
                text="View"
                icon={faEye}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => handleViewClick(favorite)}
              />
              <Button
                text="Edit"
                icon={faEdit}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => handleEditClick(favorite)}
              />
              <Button
                text="Delete"
                icon={faTrashAlt}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteClick(favorite)}
              />
            </div>
          </li>
        ))}
      </ul>
      {showDeleteModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${packageToDelete?.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {packageToView && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="mb-4">{`Viewing: ${packageToView.name} - ${packageToView.why}`}</p>
            <div className="flex justify-end">
              <Button
                text="Close"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setPackageToView(null)}
              />
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
              <Input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedName(e.target.value)}
                placeholder="Enter your favorite package name..."
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="editedWhy">
                Why is this your favorite?
              </label>
              <TextArea
                id="editedWhy"
                value={editedWhy}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedWhy(e.target.value)}
                placeholder="Enter your reason here..."
                rows={4}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end">
              <Button
                text="Cancel"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setPackageToEdit(null)}
              />
              <Button
                text="Save"
                className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                onClick={handleSaveEdit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
