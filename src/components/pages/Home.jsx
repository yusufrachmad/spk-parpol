import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../NavigationBar.jsx";
import { Container, Card } from "react-bootstrap";
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
            {/* <Card
              className="d-flex justify-content-center align-items-center text-center"
              style={{
                borderRadius: "12px",
                border: "none",
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <h5
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "14pt",
                  }}
                >
                  Masih bingung memilih partai politik yang sesuai dengan
                  keinginanmu? Cobain sistem ini sekarang juga!
                </h5>
              </div>
            </Card> */}
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
