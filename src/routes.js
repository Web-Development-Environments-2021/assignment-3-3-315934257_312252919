import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import PlayerCard from "./pages/PlayerCard";
import TeamCard from "./pages/TeamCard"

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/player/:id",
    name: "player",
    component: PlayerCard
  },
  {
    path: "/team/:id",
    name: "team",
    component: TeamCard
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
