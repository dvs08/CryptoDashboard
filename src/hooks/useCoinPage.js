import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';


const useCoin = (id) => {

    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    // const apiLink = "https://api.coingecko.com/api/v3/coins/ethereum";
    const apiLink = `https://api.coingecko.com/api/v3/coins/${id}`;
  
    useEffect(() => {
      const fetchCoinPage = async () => {
        try {
          // const response = await axios.get(apiLink); 
          const response = await axiosInstance.get(apiLink);
          setCoin(response.data); 
          setLoading(false); 

          // console.log("ID COIN : ",response);
        } catch (error) {
          setError("Error fetching coin data");
          
        } finally{
            setLoading(false); 
        }
      };
  
      fetchCoinPage(); 
    }, [id]); 

    return {coin , loading, error};
  
};

export default useCoin;
