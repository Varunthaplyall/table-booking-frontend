"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
} from "@mui/material";
import apiManager from "../services/apiManager";
import toast from "react-hot-toast";

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

const BookingDetails = ({ label, value }) => (
  <Typography variant="body1" gutterBottom>
    <Box component="span" fontWeight="bold" color="primary.main">
      {label}:
    </Box>{" "}
    {value}
  </Typography>
);

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiManager.fetchAllBookings();
        if (!res?.data) {
          throw new Error("No data received from API");
        }
        setData(res.data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiManager.deleteBooking(id);
      setData((prevData) => prevData.filter((booking) => booking._id !== id));
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header />
        <Container>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              my: 4,
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            My Bookings
          </Typography>

          {loading ? (
            <Box
              sx={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "error.main",
                my: 4,
              }}
            >
              Error: {error}
            </Typography>
          ) : !data?.length ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              No bookings found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {data.map((booking, index) => (
                <Grid item xs={12} sm={6} lg={4} key={booking._id || index}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "all 0.3s",
                      bgcolor: "background.paper",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) =>
                          `0 6px 12px ${theme.palette.primary.main}30`,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="primary.main"
                        gutterBottom
                      >
                        Booking #{index + 1}
                      </Typography>

                      {[
                        ["ID", booking._id],
                        ["Name", booking.name],
                        ["Contact", booking.phoneNumber],
                        ["Date", booking.date],
                        ["Time", booking.time],
                        ["Guests", booking.numberOfGuests],
                      ].map(([label, value]) => (
                        <BookingDetails
                          key={label}
                          label={label}
                          value={value}
                        />
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleDelete(booking._id)}
                      >
                        Delete Booking
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
