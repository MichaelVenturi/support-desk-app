import axios from "axios";
import { ITicketPayload } from "../../../types/apiTypes";

const API_URL = "/api/tickets";

const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const createTicket = async (ticketData: ITicketPayload, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const ticketService = {
  getTickets,
  createTicket,
};
export default ticketService;
