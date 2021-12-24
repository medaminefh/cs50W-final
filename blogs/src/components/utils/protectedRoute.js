import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const token = localStorage.token;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token && path === "/admin") {
          return <Component {...rest} {...props} />;
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
