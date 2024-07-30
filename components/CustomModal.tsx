import React from "react";

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-4 rounded shadow-md w-1/2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                <h2 className="text-lg font-bold mb-4">NOTE:</h2>
                <p className="text-gray-700">
                    To refer patient to other departments like{' '}
                    <span className="text-green-500">Radiology</span> and{' '}
                    <span className="text-green-500">laboratory</span>, the system only recognizes{' '}
                    <span className="text-red-500">Xray</span> and{' '}
                    <span className="text-red-500">scanning</span> for Radiology and{' '}
                    <span className="text-red-500">lab</span> or{' '}
                    <span className="text-red-500">laboratory</span> to refer patient to lab. When you want to refer
                    a patient to radiology in the Treatment column, just enter{' '}
                    <span className="text-red-500">xray</span> or{' '}
                    <span className="text-red-500">scanning</span>. For{' '}
                    <span className="text-red-500">lab</span>, just enter{' '}
                    <span className="text-red-500">lab</span> or{' '}
                    <span className="text-red-500">laboratory</span>. The patient will be referred to that department.
                </p>
                <button
                    className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomModal;
