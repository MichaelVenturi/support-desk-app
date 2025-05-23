import { useState, useEffect } from "react";
// redux imports
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../redux/store";
import {
  getTicket,
  reset as ticketReset,
  closeTicket,
  setTicket,
  deleteTicket,
} from "../redux/features/tickets/ticketSlice";
import { getNotes, reset as noteReset, createNote } from "../redux/features/notes/noteSlice";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Modal, { Styles } from "react-modal";
import { FaPlus } from "react-icons/fa";
// components
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const t = useSelector((state) => state.ticket);

  const n = useSelector((state) => state.note);
  const { notes } = n;

  const dispatch = useDispatch();
  const { ticketId } = useParams<TicketParams>();
  const navigate = useNavigate();
  const localTicket = useLocation().state?.ticket;

  const ticket = localTicket ?? t.ticket;

  useEffect(() => {
    if (t.isSuccess) {
      dispatch(ticketReset());
    }
    if (n.isSuccess) {
      dispatch(noteReset());
    }
  }, [dispatch, t.isSuccess, n.isSuccess]);

  useEffect(() => {
    if (t.isError || n.isError) {
      toast.error(t.message);
    }
    if (localTicket) {
      dispatch(setTicket(localTicket));
    }

    // only ping api to get the ticket if A: ticket was not passed thru props, B: the currently set ticket's id doesnt match the params
    if (!localTicket || localTicket._id !== ticketId) {
      dispatch(getTicket(ticketId!));
    }
    // dont fetch notes again if the same notes are already in state
    if (!notes || n.ticketId !== ticketId) {
      dispatch(getNotes(ticketId!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.isError, n.isError, t.message, ticketId, dispatch, localTicket]);

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
    setDeleteModal(false);
  };

  const openDeleteWarning = () => {
    setDeleteModal(true);
    openModal();
  };

  const onDeleteTicket = () => {
    dispatch(deleteTicket(ticketId!));
    toast.success("Ticket deleted");
    navigate("/tickets");
  };

  const onNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId: ticketId! }));
    closeModal();
  };

  if (t.isLoading) {
    return <Spinner />;
  }

  if (t.isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    ticket && (
      <>
        <div className="ticket-page">
          <header className="ticket-header">
            <div className="header">
              <BackButton url={"/tickets"} />
              <button className="btn btn-danger" onClick={openDeleteWarning}>
                Delete ticket
              </button>
            </div>

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

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={deleteModal ? "Delete Ticket" : "Add Note"}>
            {deleteModal ? (
              <>
                <h2>Delete Ticket</h2>
                <p>Are you sure you want to delete this ticket?</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button className="btn btn-reverse" onClick={onDeleteTicket}>
                    Delete
                  </button>
                  <button className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </Modal>

          {n.isLoading ? <Spinner /> : notes.map((note) => <NoteItem key={note._id} note={note} />)}

          {ticket.status !== "closed" && (
            <button onClick={onTicketClose} className="btn btn-block btn-danger">
              Close Ticket
            </button>
          )}
        </div>
      </>
    )
  );
};
export default Ticket;
