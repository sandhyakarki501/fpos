import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./routes";

const navMenu = [
  {
    label: "Home",
    route: HOME_ROUTE,
    auth: true,
  },

  {
    label: "Login",
    route: LOGIN_ROUTE,
    auth: false,
  },
  {
    label: "Register",
    route: REGISTER_ROUTE,
    auth: false,
  },
];

export default navMenu;
