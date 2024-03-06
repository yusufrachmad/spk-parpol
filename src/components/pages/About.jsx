import React from "react";
import { Container } from "react-bootstrap";

const About = (props) => {
  return (
    <div className="content-wrapper" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-center text-center mb-5">
        <h1 style={{ fontFamily: "Poppins", fontWeight: 600 }}>
          Tentang Sistem
        </h1>
      </div>
      <Container className="mb-5">
        <h2 style={{ fontFamily: "Poppins" }}>Sistem Pendukung Keputusan</h2>
        <p style={{ fontFamily: "Open Sans", textAlign: "justify" }}>
          Sistem pendukung keputusan merupakan sebuah sistem yang membantu para
          pengambil keputusan dalam menentukan putusannya. Dalam pengambilan
          keputusan, sistem menggunakan perhitungan matematika dengan langkah
          sesuai metode SPK. Pada sistem ini, terdapat 2 metode yang digunakan
          untuk perhitungan matematikanya yaitu <i>profile matching</i> dan
          TOPSIS. <i>Profile matching</i> digunakan untuk pembobotan sedangkan
          TOPSIS digunakan untuk perangkingannya.
        </p>
      </Container>
      <Container className="mb-4">
        <h2 style={{ fontFamily: "Poppins" }}>Kegunaan Sistem</h2>
        <p style={{ fontFamily: "Open Sans", textAlign: "justify" }}>
          Sistem ini ditujukan untuk membantu para pemilih dalam menentukan
          pilihan partai politik yang sesuai dengan keinginan mereka. Dengan
          adanya sistem ini, diharapkan para pemilih dapat menentukan pilihan
          partai politik yang sesuai dengan keinginan mereka. Selain itu, sistem
          ini juga dapat membantu para pemilih yang masih bingung dalam
          menentukan pilihan partai politik yang sesuai dengan keinginan mereka.
        </p>
      </Container>
      <Container className="mb-4">
        <h2 style={{ fontFamily: "Poppins" }}>Sumber Data</h2>
        <p style={{ fontFamily: "Open Sans", textAlign: "justify" }}>
          Data yang digunakan pada sistem ini berasal dari beberapa sumber yang
          diolah ke dalam bentuk numerik. Beberapa sumber data tersebut adalah
          sumber berita terpercaya yang memberi informasi mengenai partai
          politik yang ada di Indonesia, data yang dapat diakses melalui KPU,
          media sosial partai, dan laman resmi dari partai politik.
        </p>
      </Container>
    </div>
  );
};

export default About;
