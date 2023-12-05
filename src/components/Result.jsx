import React, { useState } from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
import WinnerParty from "./WinnerParty";
import ListOtherResult from "./ListOtherResult";

const Result = ({ result }) => {
  return (
    <>
      <Container className="justify-content-center align-items-center mb-5">
        <Row>
          <Col md={6} sm={12} xs={16} className="mb-3">
            <Card>
              <WinnerParty data={result} />
            </Card>
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
