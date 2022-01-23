import api from "./api";

export default class TicketPriceApi {
  getTicketPrice() {
    return api.get("/ticket/prices");
  }
}
