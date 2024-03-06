import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import FormSlider from "./FormSlider";
import { Card, Col, Container, Row } from "react-bootstrap";

const Form = ({ onChange }) => {
  const [subCriteria, setSubCriteria] = useState([]);
  const [lastSubCriteria, setLastSubCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: subcriteria, error } = await supabase
          .from("subkriteria")
          .select("subkriteria, kode, kriteria(kode_kriteria), deskripsi")
          .order("id_subkriteria", { ascending: true });

        if (subcriteria) {
          setSubCriteria(subcriteria.slice(0, 7));
          setLastSubCriteria(subcriteria.slice(7, 13));
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container style={{ fontFamily: "Open Sans" }}>
        <Row>
          <Col>
            {subCriteria.map((item, index) => (
              <div className="mb-4" key={index}>
                <Card>
                  <FormSlider
                    criteria={item.subkriteria}
                    subcriteria={item.kode}
                    onChange={onChange}
                    deskripsi={item.deskripsi}
                  />
                </Card>
              </div>
            ))}
          </Col>
          <Col>
            {lastSubCriteria.map((item, index) => (
              <div className="mb-4" key={index}>
                <Card>
                  <FormSlider
                    criteria={item.subkriteria}
                    subcriteria={item.kode}
                    onChange={onChange}
                    deskripsi={item.deskripsi}
                  />
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Form;
