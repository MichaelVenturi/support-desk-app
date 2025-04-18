import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute redirectPath="/login" />}>
              <Route path="/new-ticket" element={<NewTicket />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
