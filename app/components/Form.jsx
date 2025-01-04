"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import apiManager from "../services/apiManager";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const sharedStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
};

const Form = ({ date, time }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiManager.makeBooking(formData);
      if (res.success === false) {
        setError(res.message);
        return;
      }
      if (res.success) {
        setError("");
        setFormData({
          name: "",
          phoneNumber: "",
          date: "",
          time: "",
          numberOfGuests: "",
        });

        toast.success("Booking made successfully");

        router.push(
          `/myBookings?data=${encodeURIComponent(JSON.stringify(res))}`
        );
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      date: date,
      time: time,
    });
  }, [date, time]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form-container rounded-lg shadow-md"
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={sharedStyles}
        />
        <TextField
          id="phoneNumber"
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          sx={sharedStyles}
        />
        <TextField
          id="date"
          value={date}
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          //   InputProps={{ readOnly: true }}
          sx={sharedStyles}
        />
        <TextField
          id="time"
          value={time}
          variant="outlined"
          fullWidth
          margin="normal"
          //   type="time"
          //   InputProps={{ readOnly: true }}
          sx={sharedStyles}
        />
        <TextField
          id="numberOfGuests"
          label="Number of Guests"
          placeholder="Max 10"
          variant="outlined"
          fullWidth
          onChange={(e) =>
            setFormData({ ...formData, numberOfGuests: e.target.value })
          }
          margin="normal"
          sx={sharedStyles}
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={handleSubmit}
      >
        Book Table
      </Button>
      <div className="mt-4">
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </>
  );
};

export default Form;
