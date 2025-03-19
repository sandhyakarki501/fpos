import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routes";
import { ROLE_ADMIN } from "../../constants/userRoles";

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

      {/* <OrdersTable /> */}
    </div>
  );
}

export default OrdersList;
