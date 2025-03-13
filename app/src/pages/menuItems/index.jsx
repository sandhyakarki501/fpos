import { getAllMenuItems } from "../../api/menuItem";
import { Link } from "react-router-dom";
import { LIST_MENU_ITEM_ROUTE } from "../../constants/routes";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuItemCard from "../../components/menuItems/Card";
import Spinner from "../../components/Spinner";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllMenuItems('isActive=true').then((response) => setMenuItems(response.data));
  }, []);

  return (
    <section className="py-12 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        {user?.roles.includes("EMPLOYEE") && (
          <div className="flex justify-end">
            <Link
              to={LIST_MENU_ITEM_ROUTE}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center"
            >
              Update menu items
              <MdOutlineModeEditOutline className="ml-1" />
            </Link>
          </div>
        )}
        <div className="py-8">
          {menuItems.length > 0 ? (
            <div className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {menuItems?.map((menuItem, index) => (
                <MenuItemCard key={index} {...menuItem} />
              ))}
            </div>
          ) : (
            <div className="p-20 flex items-center justify-center w-full">
              <Spinner width="w-20" height="h-20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
