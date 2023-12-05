import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={innerFooterStyle}>
        <p>Copyright © 2023; Bantu Aku Memilih</p>
      </div>
    </footer>
  );
};

// Styles for the footer and inner content
const footerStyle = {
  backgroundColor: "#30304a",
  color: "#fff",
  textAlign: "center",
  padding: "20px 0",
};

const innerFooterStyle = {
  fontFamily: "Poppins",
  maxWidth: "1200px",
  margin: "0 auto",
};

export default Footer;
