import React, { useState, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  VStack,
  ChakraProvider,
  Select,
  Center,
} from "@chakra-ui/react";
import { GENRE, moviesData } from "../../Data/Data";
import useMovies from "../../hooks/useMovies";

const AddProduct = () => {
  const { setMovies, movies } = useMovies();
  const initialMovie = {
    id: 1,
    title: "",
    year: 1994,
    genre: [],
    rating: 0,
    director: "",
    writer: "",
    cast: [],
    summary: "",
    imageURL: "",
  };

  const generateGUID = useCallback(() => {
    const crypto = window.crypto || window.msCrypto; // For compatibility with older browsers
    if (crypto) {
      const buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);

      buffer[6] = (buffer[6] & 0x0f) | 0x40; // Version 4
      buffer[8] = (buffer[8] & 0x3f) | 0x80; // Variant

      const hexDigits = (value) => (value < 16 ? "0" : "") + value.toString(16);
      return (
        hexDigits(buffer[0]) +
        hexDigits(buffer[1]) +
        hexDigits(buffer[2]) +
        hexDigits(buffer[3]) +
        "-" +
        hexDigits(buffer[4]) +
        hexDigits(buffer[5]) +
        "-" +
        hexDigits(buffer[6]) +
        hexDigits(buffer[7]) +
        "-" +
        hexDigits(buffer[8]) +
        hexDigits(buffer[9]) +
        "-" +
        hexDigits(buffer[10]) +
        hexDigits(buffer[11]) +
        hexDigits(buffer[12]) +
        hexDigits(buffer[13]) +
        hexDigits(buffer[14]) +
        hexDigits(buffer[15])
      );
    } else {
      // Fallback for browsers without crypto support
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }, []);

  const [movie, setMovie] = useState(initialMovie);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    if (name === "cast") {
      value = [value];
    }
    if (name === "genre") {
      value = [value];
    }

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let temp = { ...movie, id: generateGUID() };
    setMovies((prev) => [...prev, temp]);
    localStorage.setItem("MoviesList", JSON.stringify([...movies, temp]));
  };

  return (
    <Center>
      <form onSubmit={handleSubmit} style={{ width: "50%", padding: "1rem" }}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input
            type="number"
            name="year"
            value={movie.year}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Genre</FormLabel>
          <Select value={movie.genre[0]} onChange={handleInputChange}>
            <option value="ALL">ALL Genre</option>
            {GENRE.map((x, idx) => (
              <option key={idx} value={x}>
                {x}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Input
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Director</FormLabel>
          <Input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Writer</FormLabel>
          <Input
            type="text"
            name="writer"
            value={movie.writer}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Cast</FormLabel>
          <Input
            type="text"
            name="cast"
            value={movie.cast.join(",")}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Summary</FormLabel>
          <Textarea
            name="summary"
            value={movie.summary}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="url"
            name="imageURL"
            value={movie.imageURL}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={4}>
          Submit
        </Button>
      </form>
    </Center>
  );
};

export default AddProduct;
