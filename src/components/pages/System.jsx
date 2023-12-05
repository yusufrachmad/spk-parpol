import React, { useState, useRef } from "react";
import Form from "../Form.jsx";
import Result from "../Result.jsx";
import "../../style/System.css";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { topsis } from "../../utils/topsis";

const System = () => {
  const [sliderValues, setSliderValues] = useState([]);
  const [resultData, setResultData] = useState([]);
  const resultRef = useRef(null);

  const handleSliderChange = (criteria, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [criteria]: value,
    }));
  };

  const handleValueWarning = (target) => {
    if (
      target[0] + target[1] === 10 ||
      target[0] + target[1] === 1 ||
      target[5] + target[6] === 10 ||
      target[5] + target[6] === 1 ||
      target[8] + target[9] === 10 ||
      target[8] + target[9] === 1
    ) {
      alert("Nilai tidak boleh 0 atau 10");
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    const target = Object.values(sliderValues);
    if (handleValueWarning(target)) {
      return;
    }

    try {
      const data = await topsis(target);

      if (data) {
        setResultData(data);
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error calculating data: ", error.message);
    }
  };

  return (
    <div className="content-wrapper">
      <Container>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h1
            style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "30pt" }}
          >
            Tentukan Pertimbanganmu
          </h1>
        </div>
        <Form onChange={handleSliderChange} />
        <div className="d-flex justify-content-center align-items-center mt-1 mb-3">
          <Button variant="outlined" size="medium" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Container>
      <div ref={resultRef}></div>
      {resultData.length > 0 && (
        <Container style={{ marginTop: "144px" }}>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h1
              style={{
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "30pt",
              }}
            >
              Hasil Perhitungan
            </h1>
          </div>
          <Result result={resultData} />
        </Container>
      )}
    </div>
  );
};

export default System;
