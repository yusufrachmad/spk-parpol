import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { supabase } from "../../utils/supabaseClient.js";
import "../../style/Partai.css";

const Partai = () => {
  const [dataPartai, setDataPartai] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const getPartai = async () => {
      try {
        const { data, error } = await supabase
          .from("detail_partai")
          .select("*");

        if (error) {
          setFetchError("Could not fetch the data!");
          setDataPartai(null);
          console.log(error);
        }

        if (data) {
          setDataPartai(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    getPartai();
  }, []);

  const images = [];
  for (const partai of dataPartai) {
    images.push(require(`../../assets/partai/${partai.singkatan}.png`).default);
  }

  useEffect(() => {
    setImage(images);
  });

  return (
    <div
      className="align-items-center"
      style={{ minHeight: "100vh", paddingTop: "160px" }}
      id="partai"
    >
      <div className="d-flex justify-content-center mb-4 text-center">
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: 700,
          }}
          className="text-responsive"
        >
          Daftar Partai Peserta Pemilu 2024
        </h1>
      </div>
      {fetchError && <p>{fetchError}</p>}
      <Container className="d-flex align-items-center justify-content-center">
        <Card style={{ border: "none" }}>
          <Row>
            {image.map((item, index) => (
              <Col lg={2} md={3} xs={4}>
                <div className="d-flex justify-content-center" key={index}>
                  <Card className="partai-logo" style={{ border: "none" }}>
                    <Card.Body className="image-wrapper">
                      <Card.Title className="align-items-center">
                        <Image src={item} alt={item} className="logo-partai" />
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <div
          className="d-flex justify-content-center align-items-center text-center"
          style={{ width: "800px", paddingTop: "50px" }}
        >
          <h4 style={{ fontFamily: "Open Sans" }}>
            18 partai bersaing pada Pemilu 2024 untuk memperebutkan jatah kursi
            pada lembaga Dewan Perwakilan Rakyat
          </h4>
        </div>
      </Container>
    </div>
  );
};

export default Partai;
