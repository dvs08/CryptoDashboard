import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from './interceptor';


const useCategory = () =>{

    const apiURL = 'https://api.coingecko.com/api/v3/coins/categories';
    const [data, setData] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const fetchCategory = async () => {

            try{

                // const response = await axios.get(apiURL);
                const response = await axiosInstance.get(apiURL);                
                const filteredResp = response.data.map((cat,index) => ({

                    name: cat.name,
                    id: cat.id,
                    market_cap : cat.market_cap,
                    about: cat.content,
                    index: index+1,
                    top1coins : cat.top_3_coins[0],
                    top1coinsid : cat.top_3_coins_id[0],
                    top2coins : cat.top_3_coins[1],
                    top2coinsid : cat.top_3_coins_id[1],
                    top3coins : cat.top_3_coins[2],
                    top3coinsid : cat.top_3_coins_id[2],

                }));
                
                setData(filteredResp);
                // console.log("Coin Category Data: ", filteredResp);
            } catch(error){
                setError('Error fetching coins');
            } finally{
                setLoading(false);
            }
        }
        fetchCategory();

    }, []);

    return {data, loading, error };


}

export default useCategory;

