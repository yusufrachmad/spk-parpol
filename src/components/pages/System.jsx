import React, { useState, useRef } from "react";
import Form from "../Form.jsx";
import Result from "../Result.jsx";
import "../../style/System.css";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { topsis } from "../../utils/topsis";
import { supabase } from "../../utils/supabaseClient.js";

const System = () => {
  const [sliderValues, setSliderValues] = useState([]);
  const [toShow, setToShow] = useState({});
  const [resultData, setResultData] = useState([]);
  const resultRef = useRef(null);

  const handleSliderChange = (criteria, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [criteria]: value,
    }));
  };

  const handleSubmit = async () => {
    const toShow = {};
    const target = sliderValues;
    const { data: subcriteria } = await supabase
      .from("subkriteria")
      .select("subkriteria, kode")
      .order("id_subkriteria", { ascending: true });

    for (const index in target) {
      if (subcriteria.find((item) => item.kode === index)) {
        const result = subcriteria.find(
          (item) => item.kode === index
        ).subkriteria;
        toShow[result] = target[index];
      }
    }

    setToShow(toShow);

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
        <div className="d-flex justify-content-center align-items-center mb-4 text-center">
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
          <div className="d-flex justify-content-center align-items-center mb-4 text-center">
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
          <Result result={resultData} target={sliderValues} profile={toShow} />
        </Container>
      )}
    </div>
  );
};

export default System;
