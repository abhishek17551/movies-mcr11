import { useContext } from "react";
import MoviesContext from "../Context/MoviesContext";

const useMovies = () => {
  return useContext(MoviesContext);
};
export default useMovies;
