import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ Component, protectCondition, redirectTo }) {
  return (
    <div>{protectCondition ? Component : <Navigate to={redirectTo} />}</div>
  );
}

export default PrivateRoute;
