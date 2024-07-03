import React from "react";
interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    paymentMethod: string;
    date: string;
    department?: string;
    notes?: string;
  }
interface Props {
  patient: Patient;
  onClose: () => void;
  onAddNotes: () => void;
  notesInput: string;
  setNotesInput: React.Dispatch<React.SetStateAction<string>>;
}

const ChatDrawer = ({ patient, onClose, onAddNotes, notesInput, setNotesInput }:any) => {
  return (
    <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-white shadow-lg border border-gray-200">
      <div className="flex justify-between items-center bg-green-500 text-white p-4">y
        <h2 className="text-lg font-bold">Chat AI</h2>
        <button className="text-lg" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="p-4">
        <p className="mb-4">
          Patient: {patient.firstName} {patient.lastName}
        </p>
        <textarea
          className="w-full h-40 border border-gray-300 p-2 mb-4"
          placeholder="Type your request here..."
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        ></textarea>
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600" onClick={onAddNotes}>
          Add Notes
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
