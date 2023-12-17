import React, { useState } from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
import WinnerParty from "./WinnerParty";
import ListOtherResult from "./ListOtherResult";
import FeedbackSlider from "./FeedbackSlider";

const Result = ({ result, target }) => {
  return (
    <>
      <Container className="justify-content-center align-items-center mb-5">
        <Row>
          <Col lg={6} md={12} xs={16} className="mb-3">
            <Card className="mb-4 d-flex">
              <div className="d-flex justify-content-center mb-4 mt-3">
                <h1
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "20pt",
                  }}
                >
                  Nilai Profil
                </h1>
              </div>
              <div className="d-flex justify-content-center">
                <Row>
                  {Object.entries(target).map(([key, value]) => (
                    <Col
                      className="d-flex justify-content-center"
                      lg={2}
                      md={3}
                      xs={4}
                    >
                      <p style={{ fontFamily: "Poppins" }} key={key}>
                        {key}: {value}
                      </p>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
            <Card className="mb-4">
              <WinnerParty data={result} />
            </Card>
            <div>
              <FeedbackSlider target={target} result={result} />
            </div>
          </Col>
          <Col>
            <Card>
              <ListOtherResult data={result} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Result;
