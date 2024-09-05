import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddEventModal = ({ isOpen, onClose, initialDate, handleEventChange }) => {
  const [error,setError] = useState('');
  const [formData, setFormData] = useState({
    date: initialDate || '',
    startTime: '',
    endTime: '',
    title: ''
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: initialDate
    }));
  }, [initialDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/backend/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.status !== 201) {
        setError(result.error)
        throw new Error('Network response was not ok');
      }
      toast.success("Event added!")
      setFormData({
        date: initialDate || '',
        startTime: '',
        endTime: '',
        title: ''
      })
      onClose();
      handleEventChange();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-2">
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          <label className="block mb-4">
            Title:
            <input
              type='text'
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-slate-500 rounded"
            />
          </label>
          {error && (<p className='text-red-500 my-2'>{error}</p>)}
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
      <ToastContainer />
    </div>
  );
};

export default AddEventModal;
