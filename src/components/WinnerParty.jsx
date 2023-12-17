import React from "react";
import { Image } from "react-bootstrap";

const WinnerParty = ({ data }) => {
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
          Rekomendasi Sesuai Profil
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "200px", height: "200px" }}
        >
          <Image
            src={`/src/assets/partai/${data[0]["singkatan"]}.png`}
            alt={"result"}
            className="images mb-3"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: "14pt",
          }}
        >
          {data[0]["nama_partai"]}
        </h1>
      </div>
    </>
  );
};

export default WinnerParty;
