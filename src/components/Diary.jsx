import React, { useState } from "react";
import "../app/globals.css";

const Diary = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [diaryEntry, setDiaryEntry] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentMonthIndex(11);
      handlePrevYear();
    }
    resetSelectedEntry();
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < 11) {
      setCurrentMonthIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentMonthIndex(0);
      handleNextYear();
    }
    resetSelectedEntry();
  };

  const handlePrevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
    resetSelectedEntry();
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
    resetSelectedEntry();
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);

    const entryForDay = diaryEntries.find(
      (entry) =>
        entry.day === day &&
        entry.month === currentMonthIndex &&
        entry.year === currentYear
    );

    setSelectedEntry(entryForDay || null);
  };

  const handleInputChange = (event) => {
    setDiaryEntry(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedDay !== null && diaryEntry.trim() !== "") {
      const newEntry = {
        day: selectedDay,
        month: currentMonthIndex,
        year: currentYear,
        entry: diaryEntry.trim(),
      };

      setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
      setDiaryEntry("");
      setSelectedEntry(newEntry);
    }
  };

  const resetSelectedEntry = () => {
    setSelectedEntry(null);
  };

  const lastDayOfMonth = new Date(
    currentYear,
    currentMonthIndex + 1,
    0
  ).getDate();

  const dayButtons = Array.from({ length: lastDayOfMonth }, (_, index) => {
    const day = index + 1;
    const entryForDay = diaryEntries.find(
      (entry) =>
        entry.day === day &&
        entry.month === currentMonthIndex &&
        entry.year === currentYear
    );

    return (
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        className={`day-button ${selectedDay === day ? "selected" : ""}`}>
        <span role='img' aria-label='heart' style={{ marginRight: "4px" }}>
          {entryForDay ? "❤️" : null}
        </span>
        {day}
      </button>
    );
  });

  return (
    <div className='diary-container'>
      <h1>Diary</h1>
      <div className='month-year-container'>
        <div className='month-buttons'>
          <button onClick={handlePrevMonth}>&larr;</button>
          <span>{months[currentMonthIndex]}</span>
          <button onClick={handleNextMonth}>&rarr;</button>
        </div>
        <div className='year-buttons'>
          <button onClick={handlePrevYear}>&larr;</button>
          <span>{currentYear}</span>
          <button onClick={handleNextYear}>&rarr;</button>
        </div>
      </div>
      <div className='day-buttons'>{dayButtons}</div>
      <div className='entry-container'>
        {selectedEntry && (
          <div className='entry'>
            <input
              type='text'
              value={selectedEntry.entry}
              readOnly
              className='entry-input'
            />
          </div>
        )}
        {!selectedEntry && (
          <form onSubmit={handleFormSubmit} className='entry-form'>
            <input
              type='text'
              value={diaryEntry}
              onChange={handleInputChange}
              className='entry-input'
            />
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Diary;
