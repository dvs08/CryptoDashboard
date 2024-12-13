
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';

const useTrendCategory = () => {
    const apiURL = 'https://api.coingecko.com/api/v3/search/trending';
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                // const response = await axios.get(apiURL);
                const response = await axiosInstance.get(apiURL);
                console.log("Check Res:", response.data.categories);

                const filteredResp = response.data.categories.map(coin =>{ 
                    // console.log(coin);
                    
                    return ({
                    name: coin.name,
                    count: coin.coins_count,
                    id: coin.id,
                    sparkline: coin.data.sparkline,
                    change24h: (coin.data.market_cap_change_percentage_24h.aed ?? 0).toFixed(1), 

                })});
                
                console.log("response", response);
                console.log("Filtered Response:", filteredResp); 
                setData(filteredResp);
            } catch (error) {
                setError('Error fetching coins');
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, []);

    return { data, loading, error };
};

export default useTrendCategory;

