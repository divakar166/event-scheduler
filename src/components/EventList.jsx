import React, { useState } from 'react';
import EditEventModal from './EditEventModal';
import DeleteEventModal from './DeleteEventModal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const EventList = ({ events, loading, error, selectedDate, handleEventChange }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (eventId) => {
    setSelectedEvent({ id: eventId });
    setIsDeleteModalOpen(true);
  };
  const handleSave = async (event) => {
    try {
      const response = await fetch(`/backend/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to update event');
      toast.success("Edited Successfully!")
      handleEventChange();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/backend/api/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      toast.error("Deleted Successfully!")
      handleEventChange();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  return (
    <div className='p-5 w-full'>
      <h3 className='text-lg font-bold mb-4'>Event List</h3>
      <div className="text-center mb-4">
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {events.length === 0 && !loading && !error && (
          <p>No events scheduled for {selectedDate}.</p>
        )}
      </div>
      {events.map((event) => (
        <div key={event.id} className='py-2 px-4 border border-slate-500 w-full my-2 flex justify-between items-center'>
          <div>
            <div>{event.startTime} - {event.endTime}</div>
            <p>{event.title}</p>
          </div>
          <div className='flex justify-around w-40 items-center'>
            <button 
              value={event.id}
              onClick={() => handleEditClick(event)}
              className='border border-blue-600 bg-blue-500 py-2 px-4 rounded-lg text-white'
            >
              Edit
            </button>
            <button 
              value={event.id}
              onClick={() => handleDeleteClick(event.id)}
              className='border border-red-600 bg-red-500 py-2 px-4 rounded-lg text-white'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSave}
      />
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        eventId={selectedEvent?.id}
        onDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default EventList;
