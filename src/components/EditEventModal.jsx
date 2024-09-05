import React, { useState, useEffect } from 'react';

const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    title: '',
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-2">
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime || ''}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime || ''}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-4">
            Title:
            <input
              type='text'
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
