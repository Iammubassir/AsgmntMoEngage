import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookies.get("pa_token");
  if (token === null || token === undefined) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
};

export default ProtectedRoute;
