import React from "react";
import Button from "../ReusableComponents/Button";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button
            text="Cancel"
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onCancel}
          />
          <Button
            text="Confirm"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
