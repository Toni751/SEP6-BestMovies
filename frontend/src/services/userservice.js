import http from "./http-common";
import { getAuthHeader } from "./serviceutility";

class UserWebClientService {
  toplistsUrlResource = "/toplists";
  usersUrlResource = "/users";

  getUserGenres(userId) {
    return http.get(
      `${this.toplistsUrlResource}/${userId}/genres`,
      getAuthHeader()
    );
  }

  getUserToplist(userId, page) {
    return http.get(
      `${this.toplistsUrlResource}/${userId}?page=${page}`,
      getAuthHeader()
    );
  }

  addUserToplist(userToplist) {
    return http.post(
      `${this.toplistsUrlResource}`,
      userToplist,
      getAuthHeader()
    );
  }

  deleteUser(userId) {
    return http.delete(`${this.usersUrlResource}/${userId}`, getAuthHeader());
  }
}

export default new UserWebClientService();
