import React from "react";
import { Button, Container } from "react-bootstrap";
import Partai from "./Partai.jsx";
import "../../style/Home.css";

const Home = (prop) => {
  return (
    <>
      <div className="blur-wrapper">
        <div className="myBG"></div>
        <div className="text-content-wrapper">
          <Container className="text-content">
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800 }}>
              Sistem Pendukung Keputusan Pemilihan Partai dalam Pemilu 2024
            </h1>
            <h5>
              18 partai bersaing pada Pemilu 2024 untuk memperebutkan jatah
              kursi pada lembaga Dewan Perwakilan Rakyat
            </h5>
            <Button className="mt-4 btn btn-success" href="/">
              Coba Sekarang
            </Button>
          </Container>
        </div>
      </div>
      <Partai />
    </>
  );
};

export default Home;
