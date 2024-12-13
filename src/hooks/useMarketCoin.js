import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';


const useMarketCoins = () =>{

    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false';
    const [dataCoin, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const fetchMarketCoin = async () => {

            try{

                // const response = await axios.get(apiURL);
                const response = await axiosInstance.get(apiURL);
                const processData = response.data.map( coin => ({
                    image: coin.image,
                    name: coin.name,
                    id: coin.id,
                    symbol: coin.symbol,
                    volume: coin.total_volume,
                    price: coin.current_price,
                    marketCap24Change: coin.market_cap_change_percentage_24h,

                }));
                setData(processData);
                // console.log("Original Coin Data ",response);

            } catch(error){
                setError('Error fetching coins');
                console.log("ERROR: ", error);
            } finally{
                setLoading(false);
            }
        }
        fetchMarketCoin();

    }, []);

    return {dataCoin, loading, error };

}
export default useMarketCoins;


