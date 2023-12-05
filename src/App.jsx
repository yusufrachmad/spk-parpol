import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import About from "./components/pages/About.jsx";
import Home from "./components/pages/Home.jsx";
import System from "./components/pages/System.jsx";
import Footer from "./components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
          </Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
