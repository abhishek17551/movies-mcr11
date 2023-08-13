import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MoviesProvider } from "./Context/MoviesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
