
import React from 'react';
import { Card, Table } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import '../style/CoinDisplay.css';
import useCategory from '../hooks/useCategory';
import { useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import Trending from './trending';
import TrendCat from './trendCategory';

const CategoryBar = () => {
  
  const { data, loading, error } = useCategory();
  const navigate = useNavigate();

  // console.log("Cat Data: ", data); 

  const schema = [
    {
      name: "srno",
      displayName: "S.No",
      width: "10%",
      separator: true,
      sorting: false,
      translate: (a) => a.index, 
    },
    {
      name: "name",
      displayName: "Name",
      width: "30%",
      separator: true,
      sorting: false,
    //   translate: (a) => a.name, 
      translate: (a) => ({

        title:  <div style={{cursor:"pointer"}} onClick={() => navigate(`/category/${a.name}/${a.id}`)}>
                    {a.name}
                </div>
      }),
    },
    {
        name: "marketcap",
        displayName: "Market Cap",
        width: "20%",
        separator: true,
        sorting: false,
        translate: (a) => {
          const marketCap = a.market_cap;
      
          if (marketCap && !isNaN(marketCap)) {
            return `$ ${marketCap.toFixed(2)}`;
          } else {
            return "-";  
          }
        },
      },
    {
      name: "image",
      displayName: "Top 3 Coins",
      width: "30%",
      separator: true,
      sorting: false,
      translate: (a) => ({
        
        title: <div>
                <img src={a.top1coins} alt={a.name} style={{ width: "40px", height: "40px", marginRight:"15px", cursor:"pointer" }} onClick={() => navigate(`/coin/${a.top1coinsid}`)} />
                <img src={a.top2coins} alt={a.name} style={{ width: "40px", height: "40px", marginRight:"15px", cursor:"pointer" }} onClick={() => navigate(`/coin/${a.top2coinsid}`)}/>
                <img src={a.top3coins} alt={a.name} style={{ width: "40px", height: "40px", marginRight:"15px",cursor:"pointer" }}  onClick={() => navigate(`/coin/${a.top3coinsid}`)}/>
             </div>
        
      }),
      
    },
  ];

  return (
    <div style={{height:"100%" , overflow:"auto"}}>
    <TrendCat/>
    <Card className="overflow-hidden">
      {loading ? (
        <div className="indic"><OrbitProgress variant="spokes" color="#ff0202" size="large" text="" textColor="" /></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table
          draggable={false}
          loaderSchema={schema}
          showMenu={false}  
          separator={true}  
          data={data}  
          schema={schema}
          withHeader={true}  
          withPagination={true}  
          pageSize={6} 
          headerOptions={{
            withSearch: true,  
            dynamicColumn: false,
          }}
          onSearch={(currData, searchTerm) => {
            return currData.filter(
              (d) =>
                d.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
          }}
          searchDebounceDuration={2000}
          onPageChange={(newPage) => console.log(`on-page-change:- ${newPage}`)} 
        />
      )}
    </Card>
    </div>
  );
};

export default CategoryBar;
