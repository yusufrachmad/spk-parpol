import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import FormSlider from "./FormSlider";
import { Card, Col, Container, Row } from "react-bootstrap";

const Form = ({ onChange }) => {
  const [data, setData] = useState([]);
  const [subCriteria, setSubCriteria] = useState([]);
  const [lastSubCriteria, setLastSubCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: subcriteria, error } = await supabase
          .from("subkriteria")
          .select("subkriteria, kriteria(kode_kriteria)");

        if (data) {
          setData(data);
        }

        if (subcriteria) {
          setSubCriteria(subcriteria.slice(0, 5));
          setLastSubCriteria(subcriteria.slice(5, 10));
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            {subCriteria.map((item, index) => (
              <div className="mb-4" key={index}>
                <Card>
                  <FormSlider criteria={item.subkriteria} onChange={onChange} />
                </Card>
              </div>
            ))}
          </Col>
          <Col>
            {lastSubCriteria.map((item, index) => (
              <div className="mb-4" key={index}>
                <Card>
                  <FormSlider criteria={item.subkriteria} onChange={onChange} />
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
