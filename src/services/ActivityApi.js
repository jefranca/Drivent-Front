import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ActivityApi extends AuthenticatedApi {
  getActivitiesByDate(date) {
    return api.get(`/activities?date=${date}`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
