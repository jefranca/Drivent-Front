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

  async makeReservation(hotelId, roomId) {
    return await api.post(
      `/hotelReservation/hotels/${hotelId}/rooms/${roomId}`,
      {},
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
  }

  async getHotelReservation(id) {
    return await api.get(`/hotelReservation/${id}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
