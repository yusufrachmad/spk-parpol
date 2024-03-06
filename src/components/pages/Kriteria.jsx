import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Collapse } from "react-bootstrap";
import CriteriaButton from "../CriteriaButton";
import { supabase } from "../../utils/supabaseClient";
import "../../style/Kriteria.css";

const Kriteria = () => {
  const [dataCriteria, setDataCriteria] = useState([]);
  const [dataSubCriteria, setDataSubCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: criteria, error } = await supabase
          .from("kriteria")
          .select("nama_kriteria, id_kriteria")
          .order("id_kriteria", { ascending: true });
        const { data: subcriteria } = await supabase
          .from("subkriteria")
          .select("subkriteria, faktor, kode, id_kriteria, deskripsi")
          .order("id_subkriteria", { ascending: true });

        if (error) {
          console.log(error);
          return null;
        } else {
          setDataCriteria(criteria);
          setDataSubCriteria(subcriteria);
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="align-items-center"
      style={{ minHeight: "100vh", paddingTop: "160px" }}
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
      <Container style={{ maxWidth: "900px" }}>
        <Row xs={1} md={2} className="g-3">
          {dataCriteria.map((item, index) => (
            <Col key={index}>
              <CriteriaButton
                criteria={item.nama_kriteria}
                subcriteria={dataSubCriteria.filter(
                  (subcriteria) => subcriteria.id_kriteria === item.id_kriteria
                )}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Kriteria;
