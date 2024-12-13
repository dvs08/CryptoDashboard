import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';


const useCatFilter = (id) => {

    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    // const apiLink = "https://api.coingecko.com/api/v3/coins/ethereum";
    const apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${id}`;
  
    useEffect(() => {
      const fetchCoinPage = async () => {
        try {
          // const response = await axios.get(apiLink); 
          const response = await axiosInstance.get(apiLink);
          const filteredResponce = response.data.map(coin => ({

            image: coin.image,
            name: coin.name,
            id: coin.id,
            symbol: coin.symbol,
            volume: coin.total_volume,
            price: coin.current_price,
            marketCap24Change: coin.market_cap_change_percentage_24h,
          }))
          setCoin(filteredResponce); 
          setLoading(false); 

          // console.log("ID COIN : ",filteredResponce);
        } catch (error) {
          setError("Error fetching coin data");
          
        } finally{
            setLoading(false); 
        }
      };
  
      fetchCoinPage(); 
    }, []); 

    return {coin , loading, error};
  
};

export default useCatFilter;
