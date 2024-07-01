import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        Symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
            );
            
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = { allCoin, currency, setCurrency };

    return (
        <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
    );
};
