import React, { useContext } from "react";
import "./navbar.css";
import logo from "../../assets/cryptoplace.png";
// import arrow from "../../assets/arrow.png";
import { CoinContext } from "../../context/coincontext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    const vcurrency = event.target.value;
    switch (vcurrency) {
      case "USD": {
        setCurrency({ name: "USD", Symbol: "$" });
        break;
      }

      case "EUR": {
        setCurrency({ name: "EUR", Symbol: "€" });
        break;
      }
      case "INR": {
        setCurrency({ name: "INR", Symbol: "₹" });
        break;
      }

      default: {
        setCurrency({ name: "USD", Symbol: "$" });
        break;
      }
    }
  };

  return (
    <div>
      <div className=" navbar flex justify-between items-center  mx-auto px-20 py-4 border-b-2">
        <Link to={"/"}><img src={logo} alt="" /></Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/"}>
            <li>Features</li>
          </Link>
          <Link to={"/"}>
            <li>Pricing</li>
          </Link>
          <Link>
            <li>Blog</li>
          </Link>
        </ul>
        <div className="navbar-right flex gap-4 items-center ">
          <select onChange={currencyHandler} className="bg-transparent ">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          {/* <button
            id="signup"
            className=" flex items-center gap-2 text-[black] py-3 px-6 rounded-3xl bg-white justify-center "
          >
            Sign Up <img src={arrow} alt="signup" />
          </button>
          <button
            id="login"
            className="flex items-center gap-2 text-[black] py-3 px-6 rounded-3xl bg-white justify-center "
          >
            Login <img src={arrow} alt="login" className="w-[15px] h-[15px]" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
