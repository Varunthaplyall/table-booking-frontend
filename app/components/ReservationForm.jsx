"use client";

import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
import apiManager from "../services/apiManager";
import { Alert, Button } from "@mui/material";
import Form from "./Form";

const ReservationForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [dateTime, setDateTime] = useState(dayjs());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    time: "",
    date: "",
  });
  const [booked, setBooked] = useState(false);

  const handleChange = (newValue) => {
    setDateTime(newValue);
    setFormData((prevData) => ({
      ...prevData,
      date: dayjs(newValue).format("YYYY-MM-DD"),
      time: dayjs(newValue).format("h:mm A"),
    }));
  };

  const handleAvailability = async () => {
    try {
      const bookings = await apiManager.getBookings(
        formData.date,
        formData.time
      );
      if (bookings.success === false) {
        setBooked(true);
        setMessage(bookings.message);
        return;
      }
      setBooked(false);
      setOpen(true);
      // console.log("bookings", bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("formData", formData);
  }, [formData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="reservation-container flex flex-col justify-center items-center">
      <div className="calendar-container p-8 rounded-lg flex flex-col justify-center items-center max-w-4xl w-full">
        <h2 className="calendar-title text-2xl sm:text-xl font-semibold text-center text-white mb-8">
          Reserve Your Table
        </h2>
        {!open ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              value={dateTime}
              onChange={handleChange}
              className="custom-datetime-picker"
              orientation="landscape"
              displayStaticWrapperAs="desktop"
              ampm={false}
              showDaysOutsideCurrentMonth={true}
            />
          </LocalizationProvider>
        ) : (
          <Form date={formData.date} time={formData.time} />
        )}
      </div>
      {!open && (
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleAvailability}
        >
          Check Availability
        </Button>
      )}
      {booked && (
        <div className="mt-4">
          <Alert variant="filled" severity="error">
            {message}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
