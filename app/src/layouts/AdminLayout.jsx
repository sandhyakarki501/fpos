import { useSelector } from "react-redux";
import { HOME_ROUTE } from "../constants/routes";
import { ROLE_ADMIN } from "../constants/userRoles";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user && user?.roles.includes(ROLE_ADMIN) ? (
        <Outlet />
      ) : (
        <Navigate to={HOME_ROUTE} />
      )}
    </>
  );
};

export default AdminLayout;
