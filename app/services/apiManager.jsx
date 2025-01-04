import axios from "axios";
import dayjs from "dayjs";

const getBookings = async (date, time) => {
  try {
    const selectedDateTime = dayjs(`${date} ${time}`, "YYYY-MM-DD h:mm A");
    const currentTime = dayjs();

    if (selectedDateTime.isBefore(currentTime)) {
      return {
        success: false,
        message: "Selected date and time are in the past",
      };
    }

    if (!date || !time) {
      return {
        success: false,
        message: "Missing date or time",
      };
    }

    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL);

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    if (response.data.data) {
      const checkBookingSlot = response.data.data.some((booking) => {
        const bookingDate = booking.date.split("T")[0]; // Extract the date part (YYYY-MM-DD)
        const bookingTime = booking.time;

        return bookingDate === date && bookingTime === time;
      });

      if (checkBookingSlot) {
        return {
          success: false,
          message: "Slot already Booked",
        };
      } else {
        return {
          data: response.data.data,
          success: true,
        };
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const fetchAllBookings = async () => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const makeBooking = async (data) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL, {
      bookingDetails: data,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const apiManager = {
  getBookings,
  makeBooking,
  fetchAllBookings,
  deleteBooking,
};

export default apiManager;
