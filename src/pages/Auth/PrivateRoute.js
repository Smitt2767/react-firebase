import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
