import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import About from "./components/pages/About.jsx";
import Home from "./components/pages/Home.jsx";
import System from "./components/pages/System.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/pages/Login.jsx";
import AdminPage from "./components/pages/AdminPage.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/bantu-aku" element={<System />}></Route>
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            ></Route>
            {token ? (
              <Route path="/adminpage/*" element={<AdminPage />} />
            ) : (
              <Route path="/adminpage/*" element={<ErrorPage />} />
            )}
          </Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
