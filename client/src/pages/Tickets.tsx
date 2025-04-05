import { useEffect } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../redux/store";
import { getTickets, reset } from "../redux/features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { tickets, isLoading, isSuccess, hasChanged } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    // only fetch tickets if they havent been fetched, or if a change has occurred (ex: closing or adding a ticket)
    if (tickets.length === 0 || hasChanged) {
      dispatch(getTickets());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="header">
        <BackButton url="/" />
        <button onClick={() => dispatch(getTickets())} className="btn btn-back">
          Refresh
        </button>
      </div>

      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};
export default Tickets;
