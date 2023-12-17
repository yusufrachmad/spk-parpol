import React from "react";
import { Container } from "react-bootstrap";

const About = (props) => {
  return (
    <div className="content-wrapper" style={{ minHeight: "74vh" }}>
      <div className="d-flex justify-content-center text-center mb-5">
        <h1 style={{ fontFamily: "Poppins", fontWeight: 600 }}>
          Tentang Sistem
        </h1>
      </div>
      <Container>
        <h2 style={{ fontFamily: "Poppins" }}>
          Apa itu sistem pendukung keputusan?
        </h2>
        <p>Sistem pendukung keputusan merupakan </p>
      </Container>
    </div>
  );
};

export default About;
