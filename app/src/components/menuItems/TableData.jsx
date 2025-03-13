import { Link } from "react-router-dom";
import { EDIT_MENU_ITEM_ROUTE } from "../../constants/routes";

const MenuItemTableData = ({
  id,
  name,
  category,
  price,
  isActive,
  deleteAction,
}) => {
  return (
    <>
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
        <td className="px-6 py-4">{id}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {name}
        </th>
        <td className="px-6 py-4">{category}</td>
        <td className="px-6 py-4">${price}</td>
        <td className="px-6 py-4">
          {isActive ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
              Inactive
            </span>
          )}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center justify-center">
            <Link
              to={`${EDIT_MENU_ITEM_ROUTE}/${id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <span className="px-1">|</span>
            {deleteAction}
          </div>
        </td>
      </tr>
    </>
  );
};

export default MenuItemTableData;
