import http from "./http-common";
import { getAuthHeader } from "./serviceutility";

class PeopleWebClientService {
  urlResource = "/people";

  getPersonById(personId) {
    return http.get(`${this.urlResource}/${personId}`);
  }

  getPersonMovies(personId) {
    return http.get(`${this.urlResource}/${personId}/movies`);
  }

  getHighestRatedPeople() {
    return http.get(`${this.urlResource}/highest_rated`, getAuthHeader());
  }
}

export default new PeopleWebClientService();
