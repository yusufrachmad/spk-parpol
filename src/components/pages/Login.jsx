import React, { useState } from "react";
import { Form, Card, Container, Button } from "react-bootstrap";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });

      if (error) {
        alert(error);
      } else {
        setToken(data);
        navigate("/adminpage");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className="align-items-center justify-content-center"
      style={{ height: "92vh", paddingTop: "160px" }}
    >
      <h1
        className="text-center mb-4"
        style={{ fontFamily: "Poppins", fontWeight: 600 }}
      >
        Login Admin
      </h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="p-4"
          style={{ width: "400px", fontFamily: "Open Sans" }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                name="username"
                placeholder="Masukkan Email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Masukkan Password"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-primary">
                Masuk
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
