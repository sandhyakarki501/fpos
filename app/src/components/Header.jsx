import { BiCart, BiLogOut, BiMenu } from "react-icons/bi";
import {
  CART_ITEMS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../constants/routes";
import { clearCart } from "../redux/cart/cartSlice";
import { IoRestaurant } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import navMenu from "../constants/navMenu";
import Search from "./Search";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { menuItems } = useSelector((state) => state.cart);

  const isAuth = user ? true : false;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "block py-2 pr-4 pl-3 text-white rounded bg-blue-600 lg:bg-transparent lg:text-blue-600 lg:p-0"
      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0";

  function logout() {
    dispatch(logoutUser());
    dispatch(clearCart());
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <Link to={HOME_ROUTE} className="flex items-center">
            <IoRestaurant className="text-2xl mr-2" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Foodify
            </span>
          </Link>
          <div className="hidden md:block">
            <Search />
          </div>
          <div className="flex items-center lg:order-2">
            {isAuth ? (
              <div className="flex">
                <div className="relative flex items-center mr-1">
                  <button
                    className="mr-2 rounded hover:bg-blue-100 p-2 cursor-pointer"
                    onClick={() => navigate(CART_ITEMS_ROUTE)}
                  >
                    <BiCart className="text-xl" />
                  </button>
                  {menuItems.length > 0 && (
                    <span className="absolute top-0 right-2 text-[0.6rem] rounded-full text-white bg-red-600 px-1">
                      {menuItems.length}
                    </span>
                  )}
                </div>
                <button
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2focus:outline-none flex items-center"
                  onClick={logout}
                >
                  <span>Logout</span>
                  <BiLogOut className="text-xl ml-2" />
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to={LOGIN_ROUTE}
                  className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </NavLink>
                <NavLink
                  to={REGISTER_ROUTE}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none "
                >
                  Sign Up
                </NavLink>
              </>
            )}
            <button
              className="inline-flex items-center p-2 ml-1 text-sm bg-slate-900 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <BiMenu className="text-2xl" />
            </button>
          </div>
          <div
            className={`${
              showMobileMenu ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            {isAuth ? (
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {navMenu
                  .filter((menu) => menu.auth === isAuth)
                  .map((menu) => {
                    return (
                      <li key={menu.label}>
                        <NavLink to={menu.route} className={linkClass}>
                          {menu.label}
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="block md:hidden mt-2">
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default Header;
