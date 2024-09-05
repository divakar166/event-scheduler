import React, { useEffect, useState } from 'react';
import CalendarComponent from './components/CalendarComponent';
import EventList from './components/EventList';
import AddEventModal from './components/AddEventModal';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(()=> {return new Date().toISOString().split('T')[0]});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/events/date/${selectedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime);
        });
        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedDate, refreshKey]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString('en-CA');
    setSelectedDate(formattedDate);
    console.log(formattedDate)
  };
  const handleEventChange = () => {
    setRefreshKey(prevKey => prevKey + 1); 
  };
  return (
    <div className='w-screen h-screen'>
      <h1 className='text-center text-3xl font-bold'>Event Scheduler</h1>
      <div className='flex'>
        <div className='w-[25vw] p-5'>
          <CalendarComponent selectedDate={selectedDate} onChangeDate={handleDateChange} />
          <div
            className='text-center p-2 bg-blue-500 text-white my-2 cursor-pointer'
            onClick={handleOpenModal}
          >
            Add Event
          </div>
        </div>
        <EventList 
          events={events} 
          loading={loading} 
          error={error} 
          selectedDate={selectedDate} 
          handleEventChange={handleEventChange}
        />
      </div>
      <AddEventModal isOpen={isModalOpen} onClose={handleCloseModal} initialDate={selectedDate} handleEventChange={handleEventChange} />
    </div>
  );
};

export default App;
