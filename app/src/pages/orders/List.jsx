import OrdersTable from "../../components/orders/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROLE_ADMIN } from "../../constants/userRoles";
import { HOME_ROUTE } from "../../constants/routes";

function OrdersList() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.roles.includes(ROLE_ADMIN)) navigate(HOME_ROUTE);
  }, [navigate, user]);

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
