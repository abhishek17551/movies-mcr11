import { createBrowserRouter } from "react-router-dom";
import Common from "./Common";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Movies from "./Pages/Movies/Movies";
import WatchList from "./Pages/WatchList/WatchList";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Common />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "watchlist",
        element: <WatchList />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "*",
        element: <Movies />,
      },
    ],
  },
]);

export default AppRouter;
