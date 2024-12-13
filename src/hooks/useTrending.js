import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';


const useTrending = () =>{

    const apiURL = 'https://api.coingecko.com/api/v3/search/trending';
    const [data, setData] = useState([]);

    const [catData, setcatData] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const fetchCategory = async () => {

            try{

                // const response = await axios.get(apiURL);
                const response = await axiosInstance.get(apiURL);
                
                const filteredResp = response.data.coins.map((coin) => ({

                    name: (coin.item.name).toLowerCase(),
                    image: coin.item.thumb,
                    id: coin.item.coin_id,
                    symbol: coin.item.symbol,
                    rank: coin.item.score + 1,
                    change24h: (coin.item.data.price_change_percentage_24h.aed ?? 0).toFixed(1),        
                    sparkline:coin.item.data.sparkline     
                }));
                // const filteredResp2 = response.data.categories.map(coin =>{ 
                //     // console.log(coin);
                    
                //     return ({
                //     name: coin.name,
                //     count: coin.coins_count,
                //     id: coin.id,
                //     sparkline: coin.data.sparkline,
                //     change24h: (coin.data.market_cap_change_percentage_24h.aed ?? 0).toFixed(1), 

                // })});
                
                setData(filteredResp);
                console.log("response", response.data.categories[0].data.sparkline);
                // setcatData(filteredResp2);
                // console.log("Coin Trend", filteredResp);
                // console.log("Coin Cat Trend", filteredResp2);
            } catch(error){
                setError('Error fetching coins');
            } finally{
                setLoading(false);
            }
        }
        fetchCategory();

    }, []);

    return {data, catData, loading, error };


}

export default useTrending;

