import { deleteUser, getStaffs } from "../../../api/user";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiSettings5Line,
} from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "../../Modal";
import StaffsTableData from "./TableData";

const columns = [
  {
    label: "S.N",
    slug: "id",
  },
  {
    label: "Name",
    slug: "name",
    sortable: true,
  },
  {
    label: "Email",
    slug: "email",
    sortable: true,
  },
  {
    label: "Phone",
    slug: "phone",
    sortable: true,
  },
  {
    label: "Address",
    slug: "address",
    sortable: true,
  },
  {
    label: "Created At",
    slug: "createdAt",
    sortable: true,
  },
  {
    label: "Status",
    slug: "status",
  },
];

const StaffsTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshTable, setRefreshTable] = useState(true);
  const [sort, setSort] = useState({ createdAt: -1 });

  async function confirmDelete() {
    setRefreshTable(false);

    try {
      await deleteUser(selectedItem?.id);

      toast(`${selectedItem?.name} deleted successfully.`, {
        type: "success",
        autoClose: 1500,
        onClose: () => setSelectedItem(null),
      });
    } catch (error) {
      toast(error.response.data, {
        type: "error",
        autoClose: 1500,
      });
    } finally {
      setIsOpen(false);
      setRefreshTable(true);
    }
  }

  function updateSort(field) {
    setSort({ [field]: sort[field] == 1 ? -1 : 1 });
  }

  useEffect(() => {
    getStaffs({ sort })
      .then((data) => setStaffs(data))
      .catch((error) => toast.error(error.response?.data, { autoClose: 1500 }));
  }, [refreshTable, sort]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.slug}
                scope="col"
                className="px-6 py-3 hover:cursor-pointer hover:text-gray-800"
                title="sort"
                onClick={() => column.sortable && updateSort(column.slug)}
              >
                <p className="flex items-center">
                  <span className="mr-1">{column.label}</span>
                  {sort[column.slug] ? (
                    sort[column.slug] == 1 ? (
                      <RiArrowUpLine />
                    ) : (
                      <RiArrowDownLine />
                    )
                  ) : column.sortable ? (
                    <RiArrowUpDownLine />
                  ) : null}
                </p>
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-center">
                <RiSettings5Line className="h-5 w-5" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {staffs.length > 0 ? (
            staffs.map((item, index) => (
              <StaffsTableData
                key={index}
                index={index}
                {...item}
                deleteAction={
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsOpen(true);
                    }}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                }
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-2 px-10">
                <p className="text-center">Loading...</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        label={`Delete ${selectedItem?.name}`}
        body={
          <p className="text-left">
            Are you sure you want to delete{" "}
            <strong>{selectedItem?.name}</strong>?
          </p>
        }
        actions={
          <div className="flex justify-between w-full">
            <button
              className="bg-zinc-600 text-white px-3 py-1 rounded hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:underline"
              onClick={confirmDelete}
            >
              Confirm
            </button>
          </div>
        }
      />
      <ToastContainer />
    </div>
  );
};

export default StaffsTable;
