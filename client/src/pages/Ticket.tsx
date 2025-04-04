import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../redux/features/tickets/ticketSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { IRootState } from "../types/stateTypes";

type TicketParams = {
  ticketId: string;
};

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state: IRootState) => state.ticket);
  const dispatch = useAppDispatch();
  const { ticketId } = useParams<TicketParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!ticket || ticket._id !== ticketId) {
      dispatch(getTicket(ticketId!));
    }
  }, [isError, message, ticketId, dispatch, ticket]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId!));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    ticket && (
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url={"/tickets"} />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status}</span>
          </h2>
          <h3>Date Submitted: {new Date(ticket!.createdAt).toLocaleString("en-us")}</h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Desription of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== "closed" && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
      </div>
    )
  );
};
export default Ticket;
