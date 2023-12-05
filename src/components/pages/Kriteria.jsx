import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "../../style/Kriteria.css";

const Kriteria = () => {
  return (
    <div
      className="align-items-center"
      style={{ height: "100vh", paddingTop: "160px" }}
      id="kriteria"
    >
      <div className="d-flex justify-content-center mb-4 text-center">
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: 700,
          }}
          className="text-responsive"
        >
          Kriteria & Sub Kriteria
        </h1>
      </div>
      <Container
        style={{ width: "900px", fontFamily: "Poppins", fontWeight: "500" }}
      >
        <Row>
          <Col>
            <Card className="criteria-card">Program Kerja Partai</Card>
            <Card className="criteria-card">Visi Misi Partai</Card>
            <Card className="criteria-card">Ideologi Partai</Card>
          </Col>
          <Col>
            <Card className="criteria-card">Rekam Jejak Partai</Card>
            <Card className="criteria-card">Ketokohan dalam Partai</Card>
            <Card className="criteria-card">Popularitas Partai</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Kriteria;
