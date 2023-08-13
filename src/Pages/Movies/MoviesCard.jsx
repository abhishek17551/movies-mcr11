import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import useMovies from "../../hooks/useMovies";

const MoviesCard = ({ imageURL, title, summary, ID, wished, isWatchList }) => {
  const [watch, setWatch] = useState(wished);
  const { movies, setMovies } = useMovies();

  const updateWishList = () => {
    const movieIndex = movies.findIndex((movie) => movie.id === ID);

    if (movieIndex !== -1) {
      const updatedMovie = { ...movies[movieIndex], wished: true };
      const updatedMovies = [
        ...movies.slice(0, movieIndex),
        updatedMovie,
        ...movies.slice(movieIndex + 1),
      ];
      setMovies(updatedMovies);
      localStorage.setItem("MoviesList", JSON.stringify(updatedMovies));
      setWatch(true);
    }
  };

  const removeWishList = () => {
    const movieIndex = movies.findIndex((movie) => movie.id === ID);

    if (movieIndex !== -1) {
      const updatedMovie = { ...movies[movieIndex], wished: false };
      const updatedMovies = [
        ...movies.slice(0, movieIndex),
        updatedMovie,
        ...movies.slice(movieIndex + 1),
      ];
      setMovies(updatedMovies);
      localStorage.setItem("MoviesList", JSON.stringify(updatedMovies));
    }
  };

  return (
    <Card maxW="sm" style={{ padding: "1rem", margin: "1rem" }}>
      <CardBody>
        <Image src={imageURL} alt="Movie Card" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{summary}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {/* <Button
            onClick={(e) => {
              console.log(ID);
            }}
            variant="solid"
            colorScheme="blue"
          >
            Star

          </Button> */}
          {!isWatchList ? (
            <Button
              isDisabled={watch}
              variant="ghost"
              colorScheme="blue"
              onClick={updateWishList}
            >
              {watch ? "Added to Watchlist" : "Add to Watchlist"}
            </Button>
          ) : (
            <Button variant="ghost" colorScheme="red" onClick={removeWishList}>
              {"Remove from Watchlist"}
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default MoviesCard;
