import React from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import navStyles from "./Navbar.module.css";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { searchText, setSearchText } = useMovies();
  return (
    <div className={navStyles.nav}>
      <Heading size="lg">IMDB</Heading>
      <Input
        type="text"
        placeholder="Search movies by title,cast or director"
        width="30%"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className={navStyles.navSearch}
      />
      <div className={navStyles.navItems}>
        <Text className={navStyles.navChildItems}>
          <Link to="/movies">Movies</Link>
        </Text>
        <Text className={navStyles.navChildItems}>
          <Link to="/watchlist">WatchList</Link>
        </Text>
        {/* <Text className={navStyles.navChildItems}>Starred Movies</Text> */}
      </div>
    </div>
  );
};

export default Navbar;
