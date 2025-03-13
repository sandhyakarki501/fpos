import { getAllMenuItems } from "../../api/menuItem";
import { useEffect, useState } from "react";
import MenuItemCard from "../../components/menuItems/Card";
import Spinner from "../../components/Spinner";

const MenuItemsList = () => {
  const [loading, setLoading] = useState(false);

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems()
      .then((response) => setMenuItems(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-20 flex items-center justify-center w-full">
        <Spinner width="w-20" height="h-20" />
      </div>
    );

  return (
    <section className="py-12 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="py-8">
          <div className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
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
