import MenuItemCard from "../../components/menuItems/Card";
import { useEffect, useState } from "react";
import { getAllMenuItems } from "../../api/menuItem";

const MenuItemsList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getAllMenuItems().then((response) => setMenuItems(response.data));
  }, []);

  return (
    <section className="py-12 bg-slate-100 min-h-svh">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="py-8">
          <div className="grid gap-6 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {menuItems.map((menuItem, index) => (
              <MenuItemCard key={index} {...menuItem} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuItemsList;
