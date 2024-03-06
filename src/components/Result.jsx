import React, { useState } from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
import WinnerParty from "./WinnerParty";
import ListOtherResult from "./ListOtherResult";
import FeedbackSlider from "./FeedbackSlider";
import NilaiProfil from "./NilaiProfil";

const Result = ({ result, target, profile }) => {
  return (
    <>
      <Container className="justify-content-center align-items-center mb-5">
        <Row>
          <Col lg={6} md={12} xs={16} className="mb-3">
            <Card className="mb-4">
              <WinnerParty data={result} />
            </Card>
            <div className="mb-4">
              <NilaiProfil profile={profile} />
            </div>
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
