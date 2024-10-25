import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute({ children, role }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Load the authenticated user
  const { isAuthenticated, roleId } = useSelector((store) => store.user);
  console.log(isAuthenticated);
  // const accessible =
  //   (role === "hospital" && roleId === 1) || (role === "user" && roleId === 0);

  // 2. If NO authenticated user redirect to the /login

  //  || !accessible
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/authenticate", { replace: true });
      }
    },
    [isAuthenticated, navigate, dispatch]
  );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
