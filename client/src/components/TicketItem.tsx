import { Link } from "react-router-dom";
import { ITicket } from "../types/stateTypes";

interface ITicketItemProps {
  ticket: ITicket;
}

const TicketItem: React.FC<ITicketItemProps> = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} state={{ ticket }} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};
export default TicketItem;
