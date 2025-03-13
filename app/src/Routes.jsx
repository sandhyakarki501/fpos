import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import {
  ADD_MENU_ITEM_ROUTE,
  EDIT_MENU_ITEM_ROUTE,
  LIST_MENU_ITEM_ROUTE,
  LOGIN_ROUTE,
  MENU_ITEMS_ROUTE,
  REGISTER_ROUTE,
} from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UnAuthLayout from "./layouts/UnAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import MenuItems from "./pages/menuItems";
import AddMenuItem from "./pages/menuItems/Add";
import EditMenuItem from "./pages/menuItems/Edit";
import MenuItemsList from "./pages/menuItems/List";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path={MENU_ITEMS_ROUTE} element={<MenuItems />} />
          <Route path={LIST_MENU_ITEM_ROUTE} element={<MenuItemsList />} />
          <Route path={ADD_MENU_ITEM_ROUTE} element={<AddMenuItem />} />
          <Route
            path={`${EDIT_MENU_ITEM_ROUTE}/:id`}
            element={<EditMenuItem />}
          />
        </Route>

        <Route element={<UnAuthLayout />}>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
