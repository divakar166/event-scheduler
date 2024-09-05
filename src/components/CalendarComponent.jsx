import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, onChangeDate }) => {
  return (
    <div>
      <Calendar onChange={onChangeDate} value={selectedDate} />
    </div>
  );
};

export default CalendarComponent;
