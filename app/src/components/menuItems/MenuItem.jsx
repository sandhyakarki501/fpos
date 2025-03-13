import { Link } from "react-router-dom";
import { MENU_ITEMS_ROUTE } from "../../constants/routes";

const MenuItem = ({ id, category, description, imageUrls, name, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link to={`${MENU_ITEMS_ROUTE}/${id}`}>
        <img className="rounded-t-lg" src={imageUrls[0]} alt={name} />
      </Link>
      <div className="p-5">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
          {category}
        </span>

        <Link to={`${MENU_ITEMS_ROUTE}/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-xl">${price}</h3>

          <Link
            to="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
