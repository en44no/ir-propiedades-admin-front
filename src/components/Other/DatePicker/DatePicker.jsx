import React, { useState } from "react";
import "./datePicker.css";
import DatePickerReact from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import moment from "moment";

registerLocale("es", es);
setDefaultLocale("es");

const DatePicker = (props) => {
  const { field, placeholderText, id, defaultSelected } = props;
  const [selectedDate, setSelectedDate] = useState();
  const [defaultSelectedDate, setDefaultSelectedDate] =
    useState(defaultSelected);

  return (
    <>
      <DatePickerReact
        autoComplete="off"
        id={id}
        placeholderText={placeholderText}
        className="datePicker"
        dateFormat="dd-MM-yyyy"
        todayButton="Hoy"
        showYearDropdown
        yearDropdownItemNumber={4}
        locale="es"
        onChange={(date) => {
          field.onChange(date);
          setDefaultSelectedDate(null);
          setSelectedDate(date);
        }}
        selected={
          defaultSelectedDate != null ? defaultSelectedDate : selectedDate
        }
      />
    </>
  );
};

export default DatePicker;
