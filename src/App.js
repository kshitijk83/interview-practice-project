import React from 'react';
import './style.css';

const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const date = dateObj.getDate().toString().padStart(2, '0');
  return [year, month, date].join('-'); //YYYY-MM-DD
};

export default function App() {
  const [selectedOption, setSelectionOption] = React.useState('one-way');
  const [startDate, setStartDate] = React.useState(
    formatDate(new Date(Date.now() + 1000 * 60 * 60 * 24))
  );
  const [endDate, setEndDate] = React.useState(startDate);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('asdf');
          alert(
            `type: ${selectedOption} date: ${startDate} ${
              selectedOption === '2-way' && endDate
            }`
          );
        }}
      >
        <select
          id="select"
          onChange={(e) => {
            setSelectionOption(e.target.value);
          }}
        >
          <option value="one-way">One Way</option>
          <option value="2-way">2 way</option>
        </select>
        <input
          type="date"
          aria-label="start"
          min={formatDate(new Date())}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        {selectedOption === '2-way' && (
          <input
            type="date"
            aria-label="return date"
            value={endDate}
            min={startDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        )}
        <button type="submit">Book</button>
      </form>
    </div>
  );
}
