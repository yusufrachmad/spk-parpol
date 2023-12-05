import React from "react";
import PercentageBar from "./PercentageBar";

const ListOtherResult = ({ data }) => {
  return (
    <>
      <div className="d-flex justify-content-center mb-4 mt-3">
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
      {data.map((item, index) => (
        <div className="mt-2 mb-2" key={index}>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
            }}
          >
            <label style={{ width: "fit-content", fontWeight: 400 }}>
              <p>
                {index + 1}. {item.nama_partai}
              </p>
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <PercentageBar resultPerPartai={item.persentase_preferensi} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListOtherResult;
