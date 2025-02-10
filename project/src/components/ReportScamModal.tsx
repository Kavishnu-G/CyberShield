import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportScamModal: React.FC<ReportScamModalProps> = ({ isOpen, onClose }) => {
  const [scamUrl, setScamUrl] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Report a Scam</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="scamUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Suspicious Website URL
            </label>
            <input
              type="url"
              id="scamUrl"
              value={scamUrl}
              onChange={(e) => setScamUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description of the Scam
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please describe what happened..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportScamModal;