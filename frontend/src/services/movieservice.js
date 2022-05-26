import http from "./http-common";
import { getAuthHeader } from "./serviceutility";

class MovieWebClientService {
  urlResource = "/movies";
  searchUrlResource = "/search";

  getMovieById(movieId, userId) {
    return http.get(`${this.urlResource}/${movieId}?user_id=${userId}`);
  }

  getDiscoverMovies(page, filter, genres, userId) {
    return http.get(
      `${this.urlResource}/discover?page=${page}&filter=${filter}&genres=${genres}&user_id=${userId}`
    );
  }

  getTrendingMovies(page, userId) {
    return http.get(
      `${this.urlResource}/trending?page=${page}&user_id=${userId}`,
      getAuthHeader()
    );
  }

  getSearchResult(queryString) {
    return http.get(`${this.searchUrlResource}?query_string=${queryString}`);
  }

  addMovieLike(movieLike) {
    return http.post(`${this.urlResource}/likes`, movieLike, getAuthHeader());
  }

  addMovieComment(moviecomment) {
    return http.post(
      `${this.urlResource}/comments`,
      moviecomment,
      getAuthHeader()
    );
  }

  deleteMovieComment(commentId) {
    return http.delete(
      `${this.urlResource}/comments/${commentId}`,
      getAuthHeader()
    );
  }

  getMoviesYearAverage() {
    return http.get(`${this.urlResource}/years_average`, getAuthHeader());
  }
}

export default new MovieWebClientService();
