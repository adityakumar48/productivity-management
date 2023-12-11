import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
}
const DateTimePicker = ({ setStartDate, startDate }: Props) => {
  return (
    <div className="">
      {" "}
      <DatePicker
        className="border border-gray-300 outline-none bg-gray-200 px-2 py-2 text-black rounded-md"
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
