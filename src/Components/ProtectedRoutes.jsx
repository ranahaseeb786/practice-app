import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const data = useSelector((state) => state.auth);
  if (data.isLoggedIn === false) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/">Login</NavLink> to gain access
        </span>
      </div>
    );
  }
  return <Outlet />;
};
export default ProtectedRoutes;
