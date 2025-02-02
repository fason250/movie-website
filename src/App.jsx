import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Home from "../pages/Home"
import MovieDetail from "../pages/MovieDetails"

function App(){

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "movie/:movie_id", element: <MovieDetail />}
      ]
    }
  ])

  return(
    <RouterProvider router={router} />
  )
}

export default App