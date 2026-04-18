"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calender({ onDateSelect }) {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    if (selectedDate && onDateSelect) {
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      onDateSelect(formattedDate);
    } else if (onDateSelect) {
      onDateSelect("");
    }
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleDateChange}
      inline
      dateFormat="MMMM dd"
      minDate={new Date()}
    />
  );
}
