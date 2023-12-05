import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../NavigationBar.jsx";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Partai from "./Partai.jsx";
import "../../style/Home.css";
import "../../style/Navbar.css";
import Kriteria from "./Kriteria.jsx";

const Home = () => {
  return (
    <>
      <div className="blur-wrapper" id="home">
        <div className="myBG"></div>
        <div className="text-content-wrapper">
          <Container className="text-content">
            <h1
              style={{
                fontFamily: "Poppins",
                fontWeight: 700,
              }}
            >
              Sistem Pendukung Keputusan Pemilihan Partai dalam Pemilu 2024
            </h1>
            <h5 style={{ fontFamily: "Open Sans" }}>
              18 partai bersaing pada Pemilu 2024 untuk memperebutkan jatah
              kursi pada lembaga Dewan Perwakilan Rakyat
            </h5>
            <Button
              className="mt-4"
              variant="contained"
              color="success"
              href="/bantu-aku"
            >
              Coba Sekarang
            </Button>
          </Container>
        </div>
      </div>
      <Partai />
      <Kriteria />
    </>
  );
};

export default Home;
