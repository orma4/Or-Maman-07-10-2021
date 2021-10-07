import { lazy } from "react";

const WeatherDetails = lazy(() =>
  import("./pages/weather-details/WeatherDetails")
);
const Favorites = lazy(() => import("./pages/favorites/Favorites"));

const routes = [
  { path: "/", component: <WeatherDetails /> },
  { path: "/favorites", component: <Favorites /> },
];
export default routes;
