import axios from "axios";

const API_URL = "/api/tickets";

interface ITicketData {
  product: string;
  description: string;
}
const createTicket = async (ticketData: ITicketData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const ticketService = {
  createTicket,
};
export default ticketService;
