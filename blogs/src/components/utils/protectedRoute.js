import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const token = localStorage.token;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token && path === "/admin") {
          return <Component {...rest} {...props} />;
        } else if (token && path !== "/admin") {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
