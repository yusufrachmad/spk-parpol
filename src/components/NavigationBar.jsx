import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import lightLogo from "../assets/logo2.png";
import darkLogo from "../assets/logo1.png";
import "../style/Navbar.css";

const NavigationBar = () => {
  const [timeToChange, setTimeToChange] = useState(false);
  const [imageLogo, setImageLogo] = useState(darkLogo);

  useEffect(() => {
    const handleScroll = () => {
      const verticalScroll = window.scrollY;

      if (verticalScroll > 100) {
        setTimeToChange(true);
      } else {
        setTimeToChange(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setImageLogo(timeToChange ? lightLogo : darkLogo);
  }, [timeToChange]);

  const navStyle = {
    backgroundColor: timeToChange ? "#ffffff" : "transparent",
    borderBottom: timeToChange ? "0.5px solid #ffffff" : "0px",
    boxShadow: timeToChange ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "0px 0px 0px",
    transition: "background-color 0.4s ease-in-out",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  };

  const navText = {
    color: timeToChange ? "#000000" : "#ffffff",
  };

  const navbarClass = timeToChange ? "dark" : "light";

  return (
    <div>
      <Navbar style={navStyle}>
        <Container>
          <NavbarBrand className="logo">
            <Link to="/">
              <img
                src={imageLogo}
                alt="bantu-memilih"
                className={`logo-img ${
                  navbarClass === "dark" ? "dark" : "light"
                }`}
              ></img>
            </Link>
          </NavbarBrand>
          <Nav className="nav-text">
            <Nav.Link style={navText} href="/home">
              Home
            </Nav.Link>
            <Nav.Link style={navText} href="/about">
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
