import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../../constants/orderStatus";
import { getOrdersByUser } from "../../api/order";
import OrdersCard from "../../components/orders/Card";
import Spinner from "../../components/Spinner";

const orderTabs = [
  {
    label: "Pending",
    status: ORDER_STATUS_PENDING,
  },
  {
    label: "Confirmed",
    status: ORDER_STATUS_CONFIRMED,
  },
  {
    label: "Shipped",
    status: ORDER_STATUS_SHIPPED,
  },
  {
    label: "Completed",
    status: ORDER_STATUS_COMPLETED,
  },
];

function OrdersList() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(ORDER_STATUS_PENDING);
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);

    getOrdersByUser(status, user?.id)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [status, user]);

  return (
    <div className="py-8 px-2 sm:p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
          Your orders
        </h2>
      </div>

      <div className="flex justify-between items-around w-full my-5 border-b-1 border-b-blue-100">
        {orderTabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              status == tab.status ? "border-b-2 border-b-blue-500" : ""
            } p-2`}
            onClick={() => setStatus(tab.status)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <>
          <div className="p-20 flex items-center justify-center w-full">
            <Spinner width="w-20" height="h-20" />
          </div>
        </>
      )}

      {orders.length === 0 ? (
        <div className="text-center p-3">No orders</div>
      ) : (
        orders?.map((order, index) => (
          <OrdersCard
            key={index}
            order={order}
            status={status}
            loading={loading}
          />
        ))
      )}
    </div>
  );
}

export default OrdersList;
