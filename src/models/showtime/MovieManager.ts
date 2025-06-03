import { Movie } from "./Movie";
import { ShowTime } from "./ShowTime";

export class MovieManager {
    constructor(private movies: Movie[] = []) {}

    addMovie(movie: Movie): void {
        if (!movie) {
            throw new Error("Movie is required");
        }
        this.movies.push(movie);
    }

    filterMoviesByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }

    filterMoviesAndShowtimes(criteria: {
    genre?: string;
    date?: string;
    cinemaId?: string;
    timeRange?: { start: string; end: string };
  }): { movie: Movie; showtimes: ShowTime[] }[] {
    // Filter movies by genre if provided
    let filteredMovies = this.movies;
    if (criteria.genre) {
      filteredMovies = this.filterMoviesByGenre(criteria.genre);
    }

    // Collect showtimes for each movie based on criteria
    const result: { movie: Movie; showtimes: ShowTime[] }[] = [];
    for (const movie of filteredMovies) {
      let showtimes = movie.getShowTimes();
      
      // Filter by date if provided
      if (criteria.date) {
        showtimes = showtimes.filter(showtime => {
          const showDate = new Date(showtime.getStartTime()).toDateString();
          return showDate === new Date().toDateString();
        });
      }

      // Filter by cinemaId if provided
      if (criteria.cinemaId) {
        showtimes = showtimes.filter(showtime =>
          showtime.getMovieRoom().getCinema().getCinemaId() === criteria.cinemaId
        );
      }

      // Filter by time range if provided
      if (criteria.timeRange) {
        showtimes = showtimes.filter(showtime => {
          const showStart = new Date(showtime.getStartTime()).getTime();
          const rangeStart = new Date(criteria.timeRange!.start).getTime();
          const rangeEnd = new Date(criteria.timeRange!.end).getTime();
          return showStart >= rangeStart && showStart <= rangeEnd;
        });
      }

      // Only include movies with matching showtimes
      if (showtimes.length > 0) {
        result.push({ movie, showtimes });
      }
    }

    return result;
  }
    

    getMovies(): Movie[] {
        return [...this.movies];
    }
}