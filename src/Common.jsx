import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar";
import useMovies from "./hooks/useMovies";

const Common = () => {
  const { setMovies } = useMovies();
  useEffect(() => {
    const localStorageKey = "MoviesList";
    setMovies(JSON.parse(localStorage.getItem(localStorageKey)));
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Common;
