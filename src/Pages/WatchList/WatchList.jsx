import { Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import useMovies from "../../hooks/useMovies";
import moviesStyles from "../Movies/Movies.module.css";
import MoviesCard from "../Movies/MoviesCard";

const WatchList = () => {
  const { movies, setMovies } = useMovies();
  const [displayMovies, setDisplayMovies] = useState([]);

  useEffect(() => {
    setDisplayMovies(movies.filter((x) => x?.wished));
  }, [movies]);

  return (
    <div className={moviesStyles.moviesList}>
      {displayMovies?.length == 0 ? (
        <Heading>No movies in watch List</Heading>
      ) : (
        displayMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            imageURL={movie.imageURL}
            title={movie.title}
            summary={movie.summary}
            ID={movie.id}
            wished={movie?.wished}
            isWatchList={true}
          />
        ))
      )}
    </div>
  );
};

export default WatchList;
