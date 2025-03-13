import { ADD_MENU_ITEM_ROUTE } from "../../constants/routes";
import { getAllMenuItems } from "../../api/menuItem";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import MenuItemsTable from "../../components/menuItems/Table";

const MenuItemsList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getAllMenuItems().then((response) => setMenuItems(response.data));
  }, []);

  return (
    <section className="py-10 mb-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mb-5 justify-end">
          <Link
            to={ADD_MENU_ITEM_ROUTE}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center"
          >
            Add menu item
            <RiAddLargeLine className="ml-2" />
          </Link>
        </div>

        <MenuItemsTable menuItems={menuItems} />
      </div>
    </section>
  );
};

export default MenuItemsList;
