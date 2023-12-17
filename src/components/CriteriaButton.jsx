import React, { useState } from "react";
import { styled } from "@mui/material";
import { Card, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

const CriteriaButton = ({ criteria, subcriteria }) => {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(faChevronDown);

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
    <Card className="criteria-card">
      <StyledButton
        disableRipple
        onClick={handleOpen}
        aria-controls="collapse"
        aria-expanded={open}
        className="criteria-button"
      >
        <span>{criteria}</span>
        <div>
          <FontAwesomeIcon icon={icon} />
        </div>
      </StyledButton>

      <Collapse in={open}>
        <div>
          <hr />
          <Card.Body id="collapse" style={{ fontFamily: "Open Sans" }}>
            {subcriteria.map((item, index) => (
              <div key={index}>
                <h5 style={{ fontWeight: "500" }}>{item.subkriteria}</h5>
                <br />
                <p>{item.deskripsi}</p>
              </div>
            ))}
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default CriteriaButton;
