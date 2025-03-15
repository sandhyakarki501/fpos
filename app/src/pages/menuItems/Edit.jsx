import { BiLeftArrowAlt } from "react-icons/bi";
import { getMenuItemById } from "../../api/menuItem";
import { Link, useParams } from "react-router-dom";
import { LIST_MENU_ITEM_ROUTE } from "../../constants/routes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MenuItemForm from "../../components/menuItems/Form";
import Spinner from "../../components/Spinner";
import Title from "../../components/Title";

const EditMenuItem = () => {
  const [menuItem, setMenuItem] = useState(null);

  const params = useParams();

  useEffect(() => {
    getMenuItemById(params.id)
      .then((res) => setMenuItem(res.data))
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 1500,
        });
      });
  }, [params.id]);

  return (
    <section className="py-5 min-h-[90vh]">
      <div className="max-w-screen-2xl mx-auto">
        <Link to={LIST_MENU_ITEM_ROUTE} className="px-5 py-2 flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>

        <div className="md:w-2/3 xl:w-1/2 mx-auto px-4">
          <Title label="Edit Menu Item" />
          {menuItem ? (
            <MenuItemForm isEditing={true} menuItem={menuItem} />
          ) : (
            <div className="p-10 flex items-center justify-center w-full">
              <Spinner width="w-10" height="h-10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditMenuItem;
