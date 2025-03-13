import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LIST_MENU_ITEM_ROUTE } from "../../constants/routes";
import MenuItemForm from "../../components/menuItems/Form";
import Title from "../../components/Title";

const AddMenuItem = () => {
  return (
    <section className="py-5 min-h-[90vh]">
      <div className="max-w-screen-2xl mx-auto">
        <Link
          to={LIST_MENU_ITEM_ROUTE}
          className="px-5 py-2 flex items-center"
        >
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>

        <div className="md:w-2/3 xl:w-1/2 mx-auto px-4">
          <Title label="Add Menu Item" />
          <MenuItemForm />
        </div>
      </div>
    </section>
  );
};

export default AddMenuItem;
