import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class HotelApi extends AuthenticatedApi {
  async getAllHotels() {
    return await api.get("/hotels", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
