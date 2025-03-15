import { getAllMenuItems } from "../../api/menuItem";
import { Link, useSearchParams } from "react-router-dom";
import { LIST_MENU_ITEM_ROUTE } from "../../constants/routes";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuItemCard from "../../components/menuItems/Card";
import Spinner from "../../components/Spinner";

const MenuItems = () => {
  const [loading, setLoading] = useState(false);

  const [menuItems, setMenuItems] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();
  const menuItemName = searchParams.get("item-name");

  useEffect(() => {
    setLoading(true);

    let filters = `isActive=true`;

    if (menuItemName) filters = `isActive=true&name=${menuItemName}`;

    getAllMenuItems(filters)
      .then((response) => setMenuItems(response.data))
      .finally(() => setLoading(false));
  }, [menuItemName]);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
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
          {loading ? (
            <div className="p-20 flex items-center justify-center w-full">
              <Spinner width="w-20" height="h-20" />
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {menuItems?.map((menuItem, index) => (
                <MenuItemCard key={index} {...menuItem} />
              ))}
            </div>
          ) : (
            <div className="p-2 rounded bg-blue-200 text-center">
              Menu items empty. Try using different keywords.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
