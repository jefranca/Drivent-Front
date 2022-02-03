import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ActivityApi extends AuthenticatedApi {
  getActivitiesByDate(date) {
    return api.get(`/activities?date=${date}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getDates() {
    return api.get("/activities/dates", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getActivitiesData() {
    return api.get("/activities/data", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getActivitiesReservation() {
    return api.get("/activities-reservation", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  makeReservation(id) {
    return api.post(
      `/activities-reservation/subscription/${id}`,
      {},
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
  }
}
