import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";
import ReservationForm from "./components/ReservationForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Introduction />
      <ReservationForm />
      <Footer />
    </div>
  );
}
