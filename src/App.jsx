import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./AppRoutes";
import { moviesData } from "./Data/Data";

const App = () => {
  useEffect(() => {
    const localStorageKey = "MoviesList";
    // Check if the key exists in local storage
    if (!localStorage.getItem(localStorageKey)) {
      // If not, set the constant value
      localStorage.setItem(localStorageKey, JSON.stringify(moviesData));
    }
  }, []);

  return <RouterProvider router={AppRouter} />;
};

export default App;
