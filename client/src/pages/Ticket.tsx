import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset as ticketReset, closeTicket } from "../redux/features/tickets/ticketSlice";
import { getNotes, reset as noteReset } from "../redux/features/notes/noteSlice";
import { toast } from "react-toastify";
import Modal, { Styles } from "react-modal";
import { FaPlus } from "react-icons/fa";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { IRootState } from "../types/stateTypes";
import NoteItem from "../components/NoteItem";

const customStyles: Styles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

type TicketParams = {
  ticketId: string;
};

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const t = useSelector((state: IRootState) => state.ticket);
  const { ticket } = t;
  const n = useSelector((state: IRootState) => state.note);
  const { notes } = n;

  const dispatch = useAppDispatch();
  const { ticketId } = useParams<TicketParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (t.isSuccess) {
      dispatch(ticketReset());
    }
    if (n.isSuccess) {
      dispatch(noteReset());
    }
  }, [dispatch, t.isSuccess, n.isSuccess]);

  useEffect(() => {
    if (t.isError) {
      toast.error(t.message);
    }
    if (!ticket || ticket._id !== ticketId) {
      dispatch(getTicket(ticketId!));
      dispatch(getNotes(ticketId!));
    }
  }, [t.isError, t.message, ticketId, dispatch, ticket]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId!));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  if (t.isLoading || n.isLoading) {
    return <Spinner />;
  }

  if (t.isError) {
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
          <h2>Notes</h2>
        </header>

        {ticket.status !== "closed" && (
          <button onClick={openModal} className="btn">
            <FaPlus /> Add Note
          </button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}

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
