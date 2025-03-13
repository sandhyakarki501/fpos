import React from "react";
import { RiDeleteBack2Fill, RiSettings5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { EDIT_MENU_ITEM_ROUTE } from "../../constants/routes";
import { MdDelete } from "react-icons/md";

const MenuItemsTable = ({ menuItems = [] }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Menu item name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-center">
                <RiSettings5Line className="h-5 w-5" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b border-gray-200 hover:bg-gray-50 "
            >
              <td className="px-6 py-4">{item.id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">${item.price}</td>
              <td className="px-6 py-4">
                {item.isActive ? (
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
                    to={`${EDIT_MENU_ITEM_ROUTE}/${item.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <span className="px-1">|</span>
                  <button className="font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItemsTable;
