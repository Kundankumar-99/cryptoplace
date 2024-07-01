import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/coincontext";
import { Link } from "react-router-dom";

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayData, setDisplayData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDisplayData(allCoin);
  }, [allCoin]);

  const inputHandler = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    if (inputValue === "") {
      setDisplayData(allCoin);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayData(coins);
  };

  return (
    <>
      <div className="Home-layout flex items-center justify-center flex-col gap-7 wrap">
        <h1 className="text-6xl text-center font-extrabold leading-snug">
          {" "}
          Largest <br />
          Crypto Marketplace
        </h1>
        <p className="text-center">
          Welcome to the world's largest cryptocurrency marketplace. <br />
          Sign up to explore more about cryptos.
        </p>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            list="allcoins"
            onChange={inputHandler}
            value={input}
            placeholder="Search Crypto"
            required
          />
          <datalist id="allcoins">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button>Search</button>
        </form>
      </div>

      <div className="table-grid">
        <div className="table-content ">
          <p>#</p>
          <p>Coins</p>
          <p className="text-center">Price</p>
          <p className="text-center Change_24H">24H Change</p>
          <p className="text-right market-cap">Market Cap</p>
        </div>
      </div>
      {displayData.slice(0, 11).map((item, index) => (
        <Link className="table-grid" key={index} to={`/coin/${item.id}`}>
          <div className="table-content ">
            <p>{item.market_cap_rank}</p>
            <div className="coins gap-2">
              <img src={item.image} alt="" />
              {item.name + "-" + item.symbol}
            </div>

            <p className="text-center Change_24H">
              {currency.Symbol} {Math.floor(item.current_price * 100) / 100}
            </p>
            <p
              className={`${item.price_change_24h > 0 ? "text-green" : "text-red"
                } text-center`}
            >
              {Math.floor(item.price_change_24h * 100) / 100}
            </p>

            <p className="text-right market-cap">
              {currency.Symbol} {item.market_cap}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}
