import React, { useState, useEffect } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { styled } from "@mui/material";
import { Card, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../utils/supabaseClient";
import Button from "@mui/material/Button";

const FeedbackSlider = ({ target, result }) => {
  const [value, setValue] = useState(3);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(faChevronDown);
  const [feedbackSliderValues, setFeedbackSliderValues] = useState([3, 3]);
  const feedbackObject = [
    {
      feedback: "Seberapa sesuai hasil dengan preferensimu",
      marginLeft: "18px",
      marginRight: "18px",
      minText: "Sangat tidak sesuai",
      maxText: "Sangat sesuai",
    },
    {
      feedback: "Seberapa membantu sistem ini terhadap pilihanmu",
      marginLeft: "",
      marginRight: "",
      minText: "Sangat tidak membantu",
      maxText: "Sangat membantu",
    },
  ];

  const getDate = () => {
    const now = new Date();
    return now.toString();
  };

  const handleFeedbackSliderChange = (index, value) => {
    setFeedbackSliderValues((prevValues) => {
      return {
        ...prevValues,
        [index]: value,
      };
    });
  };

  const handleSliderChange = (_, newValue, feedback) => {
    setValue(newValue);
    handleFeedbackSliderChange(feedback, newValue);
  };

  useEffect(() => {
    for (const feedback of feedbackObject) {
      handleFeedbackSliderChange(feedback.feedback, 3);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("feedback").insert({
        id_feedback: getDate(),
        target: JSON.stringify(Object.values(target)),
        hasil: result[0]["nama_partai"],
        terbantu: feedbackSliderValues[0],
        cocok: feedbackSliderValues[1],
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error inserting data: ", error.message);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setIcon(open ? faChevronDown : faChevronUp);
  };

  const StyledButton = styled(Button)({
    color: "#000",
    justifyContent: "space-between",
    textTransform: "none",
    fontSize: "16px",
    fontFamily: "Poppins",
    fontWeight: 600,
    display: "flex",
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&:active": {
      backgroundColor: "#fff",
      borderColor: "#fff",
    },
  });

  return (
    <Card className="d-flex justify-content-center">
      <StyledButton
        disableRipple
        onClick={handleOpen}
        aria-controls="collapse"
        aria-expanded={open}
        className="criteria-button"
      >
        <span>Beri Feedback</span>
        <div>
          <FontAwesomeIcon icon={icon} />
        </div>
      </StyledButton>

      <Collapse in={open}>
        <div>
          <Card.Body id="collapse" style={{ fontFamily: "Open Sans" }}>
            {feedbackObject.map((item, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label style={{ width: "fit-content", fontWeight: 600 }}>
                    <p>{item.feedback}</p>
                  </label>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 600,
                    }}
                  >
                    <Typography
                      variant="body5"
                      className="slider-text"
                      style={{ marginLeft: item.marginLeft }}
                    >
                      {item.minText}
                    </Typography>
                    <Slider
                      aria-label={item.feedback}
                      defaultValue={3}
                      value={feedbackSliderValues[index]}
                      valueLabelDisplay="auto"
                      step={1}
                      min={1}
                      max={5}
                      color="primary"
                      onChange={(_, newValue) => {
                        handleSliderChange(_, newValue, index);
                      }}
                      sx={{ flexGrow: 1, marginX: "20px" }}
                    />
                    <Typography
                      variant="body5"
                      className="slider-text"
                      sx={{ marginRight: item.marginRight }}
                    >
                      {item.maxText}
                    </Typography>
                  </Box>
                </div>
              </div>
            ))}
          </Card.Body>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <Button variant="contained" size="small" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Collapse>
    </Card>
  );
};

export default FeedbackSlider;
