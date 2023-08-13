import { Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import moviesStyles from "./Movies.module.css";
import { Select } from "@chakra-ui/select";
import { GENRE } from "../../Data/Data";
import useMovies from "../../hooks/useMovies";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";

const Movies = () => {
  const navigate = useNavigate();
  const { movies, searchText } = useMovies();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [genre, setGenre] = useState("ALL");
  const [releaseDate, setReleaseData] = useState("ALL");
  const [rating, setRating] = useState("ALL");

  useEffect(() => {
    if (movies.length > 0) {
      let filteredMovies = movies;
      if (genre !== "ALL") {
        filteredMovies = filteredMovies.filter((x) => x.genre.includes(genre));
      }

      if (releaseDate !== "ALL") {
        filteredMovies = filteredMovies.filter((x) => x.year == releaseDate);
      }

      if (rating !== "ALL") {
        filteredMovies = filteredMovies.filter((x) => x.rating == rating);
      }
      if (searchText || searchText.length !== 0) {
        filteredMovies = filteredMovies.filter(
          (x) =>
            x.title.toLowerCase().includes(searchText.toLowerCase()) ||
            x.director.toLowerCase().includes(searchText.toLowerCase()) ||
            x.cast.includes(searchText)
        );
      }
      setDisplayMovies(filteredMovies);
    }
  }, [movies, genre, releaseDate, rating, searchText]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "1rem",
        }}
      >
        <Heading>Movies</Heading>
        <Select
          width="10%"
          style={{ border: "1px solid black", padding: "1px" }}
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        >
          <option value="ALL">ALL Genre</option>
          {GENRE.map((x, idx) => (
            <option key={idx} value={x}>
              {x}
            </option>
          ))}
        </Select>

        <Select
          width="10%"
          style={{ border: "1px solid black", padding: "1px" }}
          value={releaseDate}
          onChange={(e) => {
            setReleaseData(e.target.value);
          }}
        >
          <option value="ALL">ALL</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <Select
          width="10%"
          style={{ border: "1px solid black", padding: "1px" }}
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        >
          <option value="ALL">ANY</option>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} stars
            </option>
          ))}
        </Select>

        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/addproduct");
          }}
        >
          Add Movie
        </Button>
      </div>
      <div className={moviesStyles.moviesList}>
        {displayMovies?.length == 0 ? (
          <Heading>No movies present</Heading>
        ) : (
          displayMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              imageURL={movie.imageURL}
              title={movie.title}
              summary={movie.summary}
              ID={movie.id}
              wished={movie?.wished}
              isWatchList={false}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Movies;
