import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../style/Slider.css";

const FormSlider = ({ criteria, subcriteria, onChange }) => {
  const [value, setValue] = useState(3);
  let step = 1;
  let maxText = "Sangat mempertimbangkan";
  let minText = "Sangat tidak mempertimbangkan";
  let boxWidth = 600;
  let marginLeft = "0px";
  let marginRight = "0px";

  useEffect(() => {
    setValue(3);
    onChange(subcriteria, value);
  }, []);

  const handleSliderChange = (_, newValue) => {
    setValue(newValue);
    onChange(subcriteria, newValue);
  };

  if (criteria.includes(" - ")) {
    step = 0.01;
    boxWidth = 600;
    if (criteria.includes("Pancasila")) {
      maxText = "Ideologi Keislaman";
      minText = "Ideologi Pancasila";
      marginLeft = "72px";
      marginRight = "64px";
    } else if (criteria.includes("Progresif")) {
      maxText = "Ideologi Konservatif";
      minText = "Ideologi Progresif";
      marginLeft = "72px";
      marginRight = "56px";
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label style={{ width: "fit-content", fontWeight: 600 }}>
          <p>{criteria}</p>
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: boxWidth,
          }}
        >
          <Typography
            variant="body5"
            className="slider-text"
            style={{ marginLeft: marginLeft }}
          >
            {minText}
          </Typography>
          <Slider
            aria-label={criteria}
            defaultValue={3}
            value={value}
            valueLabelDisplay="auto"
            step={step}
            min={1}
            max={5}
            color="primary"
            onChange={handleSliderChange}
            sx={{ flexGrow: 1, marginX: "20px" }}
          />
          <Typography
            variant="body5"
            className="slider-text"
            sx={{ marginRight: marginRight }}
          >
            {maxText}
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default FormSlider;
