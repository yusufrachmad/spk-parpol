import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import lightLogo from "../assets/logo2.png";
import darkLogo from "../assets/logo1.png";
import "../style/Navbar.css";

const NavigationBar = () => {
  const routeLoc = useLocation();
  const [timeToChange, setTimeToChange] = useState(false);
  const [imageLogo, setImageLogo] = useState(lightLogo);
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const isHomepage =
      routeLoc.pathname === "/" || routeLoc.pathname === "/home";

    if (isHomepage) {
      const handleScroll = () => {
        const verticalScroll = window.scrollY;

        if (verticalScroll > 100) {
          setTimeToChange(true);
          setImageLogo(lightLogo);
        } else {
          setTimeToChange(false);
          setImageLogo(darkLogo);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [routeLoc.pathname]);

  // Change logo based on whether it's the homepage or other pages
  const isHomepage = location.pathname === "/" || location.pathname === "/home";
  useEffect(() => {
    setImageLogo(isHomepage ? darkLogo : lightLogo);
  }, [isHomepage]);

  const navStyle = {
    backgroundColor: isHomepage
      ? timeToChange
        ? "#ffffff"
        : "transparent"
      : "#ffffff",
    borderBottom: isHomepage
      ? timeToChange
        ? "0.5px solid #ffffff"
        : "0px"
      : "0.5px solid #ffffff",
    boxShadow: isHomepage
      ? timeToChange
        ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
        : "0px 0px 0px"
      : "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.4s ease-in-out",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  };

  const navText = {
    color: isHomepage ? (timeToChange ? "#000000" : "#ffffff") : "#000000",
  };

  const navbarClass = timeToChange ? "dark" : "light";

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (isHomepage) {
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setExpanded(false);
    } else {
      setTimeout(() => {
        window.location.href = "/";
        setTimeout(() => {
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          } else {
            console.log("bisa gila");
          }
        }, 100);
      }, 100);
    }
  };

  return (
    <div>
      <Navbar expand="lg" style={navStyle} expanded={expanded}>
        <Container>
          <NavbarBrand className="logo">
            <Link to="/">
              <img
                src={imageLogo}
                alt="bantu-memilih"
                className={`logo-img ${navbarClass}`}
              ></img>
            </Link>
          </NavbarBrand>
          <div className="justify-content-end">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ color: "#fffffff" }}
              onClick={toggleNavbar}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-text">
                <Nav.Link
                  style={navText}
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  style={navText}
                  onClick={() => scrollToSection("partai")}
                >
                  Partai
                </Nav.Link>
                <Nav.Link
                  style={navText}
                  onClick={() => scrollToSection("kriteria")}
                >
                  Kriteria
                </Nav.Link>
                <Nav.Link style={navText} href="/about">
                  Tentang
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
