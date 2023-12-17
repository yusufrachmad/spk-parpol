import React, { useState } from "react";
import PercentageBar from "./PercentageBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ListOtherResult = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState(faChevronDown);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    setIcon(isExpanded ? faChevronDown : faChevronUp);
  };

  const showDefault = data
    .filter((_, index) => isExpanded || index < 6)
    .map((item, index) => (
      <div className="mt-2" style={{ marginBottom: "5.6px" }} key={index}>
        <div
          style={{
            display: "flex",
            marginLeft: "24px",
          }}
        >
          <label style={{ width: "fit-content", fontWeight: 400 }}>
            <p style={{ fontFamily: "Open Sans" }}>
              {index + 1}. {item.nama_partai}
            </p>
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <PercentageBar resultPerPartai={item.persentase_preferensi} />
        </div>
      </div>
    ));

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-3">
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "20pt",
          }}
        >
          Persentase Kecocokan
        </h1>
      </div>
      {showDefault}
      <div className="d-flex justify-content-center">
        <button onClick={handleExpand} className="btn">
          <div>
            <FontAwesomeIcon icon={icon} />
          </div>
        </button>
      </div>
    </>
  );
};

export default ListOtherResult;
