import React from "react";

const Footer = () => {
  const isLogin = location.pathname === "/login";
  const isAdmin = location.pathname.startsWith("/adminpage");

  // Styles for the footer and inner content
  const footerStyle = {
    display: isLogin || isAdmin ? "none" : "",
    backgroundColor: "#30304a",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
    marginTop: "144px",
  };

  const innerFooterStyle = {
    fontFamily: "Poppins",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <footer style={footerStyle}>
      <div style={innerFooterStyle}>
        <p>Copyright © 2023; Bantu Aku Memilih</p>
      </div>
    </footer>
  );
};

export default Footer;
