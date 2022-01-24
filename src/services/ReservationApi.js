import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ReservationApi extends AuthenticatedApi {
  getReservationInfo() {
    return api.get("/reservation/", {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  postNewReservation({ ticketId }) {
    return api.post(
      "/reservation/new",
      { ticketId },
      { headers: { ...this.getAuthorizationHeader() } }
    );
  }
}
