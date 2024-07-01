import Navbar from "./component/navbar/navbar";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Coin from "./pages/coin/coin";
import Footer from "./component/footer/footer";
import "./component/footer/footer.css"

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coin/:coinId" element={<Coin />}></Route>
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
