import OrdersTable from "../../components/orders/Table";

function OrdersList() {
  return (
    <div className="py-8 px-2 sm:p-10">
      <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
        All Orders
      </h2>

      <OrdersTable />
    </div>
  );
}

export default OrdersList;
