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
  const [showWarning, setShowWarning] = useState(false);
  const [warningIndex, setWarningIndex] = useState([]);
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
      target[0] + target[1] === 2 ||
      target[5] + target[6] === 10 ||
      target[5] + target[6] === 2 ||
      target[8] + target[9] === 10 ||
      target[8] + target[9] === 2
    ) {
      return true;
    }

    return false;
  };

  const getWarningIndex = (target) => {
    const warningIndex = [];

    if (target[0] + target[1] === 10 || target[0] + target[1] === 2) {
      warningIndex.push(0, 1);
    }

    if (target[5] + target[6] === 10 || target[5] + target[6] === 2) {
      warningIndex.push(5, 6);
    }

    if (target[8] + target[9] === 10 || target[8] + target[9] === 2) {
      warningIndex.push(8, 9);
    }

    return warningIndex;
  };

  const handleSubmit = async () => {
    // const target = Object.values(sliderValues);
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
      // setShowWarning(false);
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
        <Form
          onChange={handleSliderChange}
          setWarning={showWarning}
          index={warningIndex}
        />
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
          <Result result={resultData} target={sliderValues} profile={toShow} />
        </Container>
      )}
    </div>
  );
};

export default System;
