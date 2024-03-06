import React from "react";

const ErrorPage = (props) => {
  return (
    <div style={errorContainer}>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
    </div>
  );
};

const errorContainer = {
  textAlign: "center",
  marginTop: "50px",
};

export default ErrorPage;
