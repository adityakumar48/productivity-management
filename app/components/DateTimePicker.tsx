import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="">
      {" "}
      <DatePicker
        className="border border-gray-300 bg-gray-200 px-2 py-2 text-black rounded-md "
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
    </div>
  );
};

export default DateTimePicker;
