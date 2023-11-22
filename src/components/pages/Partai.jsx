import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { supabase } from "../../supabaseClient.js";
import "../../style/Partai.css";

const Partai = () => {
  const [dataPartai, setDataPartai] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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

  return (
    <Container className="mt-5 d-flex align-items-center">
      {fetchError && <p>{fetchError}</p>}
      <Row>
        {dataPartai.map((item) => (
          <Col
            md={4}
            sm={12}
            xs={16}
            className="mb-5 offset-md-0 offset-sm-3 offset-xs-3"
          >
            <Card className="partai-logo">
              <div className="image-wrapper">
                <Image
                  key={item.id_partai}
                  src={`/src/assets/partai/${item.singkatan}.png`}
                  alt={item.singkatan}
                  className="images"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Partai;
