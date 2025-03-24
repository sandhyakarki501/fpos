import {
  MENU_ITEM_LIST_ROUTE,
  ORDERS_LIST_ROUTE,
  STAFF_LIST_ROUTE,
} from "./routes";

const adminMenu = [
  {
    label: "Manage Menu",
    route: MENU_ITEM_LIST_ROUTE,
  },
  {
    label: "Manage Orders",
    route: ORDERS_LIST_ROUTE,
  },
  {
    label: "Manage Staff",
    route: STAFF_LIST_ROUTE,
  },
];

export default adminMenu;
