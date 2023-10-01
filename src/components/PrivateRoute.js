// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authorizedRoles, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Assuming you have a selector for authentication state
    // const userRole = useSelector(state => state.auth.user.role);
    console.log(useSelector(state => state.auth), 'state');
    console.log(isAuthenticated, authorizedRoles, 'abcde');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        // add user role in the user object after logging in

        // if (!authorizedRoles.includes(userRole)) {
        //   return <Redirect to="/login" />; // Redirect to an unauthorized page or handle unauthorized access appropriately
        // }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
