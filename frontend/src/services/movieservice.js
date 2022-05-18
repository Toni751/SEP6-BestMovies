import http from "./http-common";

class MovieWebClientService {
  getUrlResource = "/movies";

  getMovies() {
    return http.get(`${this.getUrlResource}`);
  }
}

export default new MovieWebClientService();
