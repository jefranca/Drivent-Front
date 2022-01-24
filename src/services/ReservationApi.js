import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ReservationApi extends AuthenticatedApi {
  getReservationInfo() {
    return api.get("/reservation/", {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  postNewReservation({ isInPerson, hasHotel }) {
    return api.post(
      "/reservation/new",
      { isInPerson, hasHotel },
      { headers: { ...this.getAuthorizationHeader() } }
    );
  }
}
