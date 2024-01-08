import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { supabase } from "../../utils/supabaseClient.js";
import "../../style/Partai.css";

const Partai = () => {
  const [dataPartai, setDataPartai] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [image, setImage] = useState([]);
  const [link, setLink] = useState([]);

  const links = [
    "https://www.bijakmemilih.id/partaiprofil/partai-kebangkitan-bangsa",
    "https://www.bijakmemilih.id/partaiprofil/partai-gerakan-indonesia-raya",
    "https://www.bijakmemilih.id/partaiprofil/partai-demokrasi-indonesia-perjuangan-(pdi-p)",
    "https://www.bijakmemilih.id/partaiprofil/partai-golongan-karya-(golkar)",
    "https://www.bijakmemilih.id/partaiprofil/partai-nasdem",
    "https://www.bijakmemilih.id/partaiprofil/partai-buruh",
    "https://www.bijakmemilih.id/partaiprofil/partai-gelombang-rakyat-indonesia",
    "https://www.bijakmemilih.id/partaiprofil/partai-keadilan-sejahtera-(pks)",
    "https://www.bijakmemilih.id/partaiprofil/partai-kebangkitan-nusantara-(pkn)",
    "https://www.bijakmemilih.id/partaiprofil/partai-hati-nurani-rakyat",
    "https://www.bijakmemilih.id/partaiprofil/partai-garda-perubahan-indonesia-(garuda)",
    "https://www.bijakmemilih.id/partaiprofil/partai-amanat-nasional-(pan)",
    "https://www.bijakmemilih.id/partaiprofil/partai-bulan-bintang-(pbb)",
    "https://www.bijakmemilih.id/partaiprofil/partai-demokrat",
    "https://www.bijakmemilih.id/partaiprofil/partai-solidaritas-indonesia-(psi)",
    "https://www.bijakmemilih.id/partaiprofil/partai-perindo",
    "https://www.bijakmemilih.id/partaiprofil/partai-persatuan-pembangunan-(ppp)",
    "https://www.bijakmemilih.id/partaiprofil/partai-ummat-(pu)",
  ];

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
    setLink(links);
  }, [images, links]);

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
                        <a href={link[index]}>
                          <Image
                            src={item}
                            alt={item}
                            className="logo-partai"
                          />
                        </a>
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
