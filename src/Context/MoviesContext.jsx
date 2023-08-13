import React, { createContext, useState } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, searchText, setSearchText }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
