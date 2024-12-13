import React from 'react';
import useMarketCoins from '../hooks/useMarketCoin';
import "@innovaccer/design-system/css/dist/index.css";
import '../style/innoOverride.css';
import '../style/CoinDisplay.css';
import { Card, Table } from "@innovaccer/design-system";
import { useNavigate } from 'react-router-dom';
import Trending from './trending';
import { OrbitProgress } from 'react-loading-indicators';

const CoinDisplay = () => {

  const { dataCoin, loading, error } = useMarketCoins();
  // console.log("Coin DATA: ", dataCoin);

  const navigate = useNavigate();

  const schema = [
    {
      name: "image",
      displayName: "Image",
      width: "10%",
      separator: true,
      sorting: false,
      translate: (a) => ({
        
        title: <img src={a.image} alt={a.name} style={{ width: "40px", height: "40px" , cursor:"pointer" }} onClick ={() => navigate(`/coin/${a.id}`)}/>,

      }),
    },
    {
      name: "name",
      displayName: "Name",
      width: "25%",
      separator: true,
      sorting: false,
      translate: (a) => ({

        title:  <div style={{cursor:"pointer"}} onClick ={() => navigate(`/coin/${a.id}`)}>
                    {a.name}
                </div>
      }),
    },
    {
      name: "symbol",
      displayName: "Symbol",
      width: "15%",
      separator: true,
      sorting: false,
    },
    {
      name: "price",
      displayName: "Price",
      width: "15%",
      separator: true,
      sorting: false,
      translate: (a) => `$${a.price.toFixed(2)}`, // Format price to 2 decimal places
    },
    {
      name: "marketCap24Change",
      displayName: "24h Change",
      width: "15%",
      separator: true,
      cellType: "DEFAULT",
      sorting: false,
      translate: (a) => `${a.marketCap24Change.toFixed(2)}%`,  
    },
    {
      name: "volume",
      displayName: "Volume",
      width: "20%",
      separator: true,
      sorting: false,
      translate: (a) => a.volume.toLocaleString(), 
    },
  ];

  return (
  <div style={{height:"100%" , overflow:"auto"}}>
    <Trending/>
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
          data={dataCoin}
          schema={schema}
          withHeader={true}
          headerOptions={{
            withSearch: true,
            dynamicColumn: false,
          }}
          onSearch={(currData, searchTerm) => {
            return currData.filter(
              (d) =>
                d.name.toLowerCase().match(searchTerm.toLowerCase()) ||
                d.symbol.toLowerCase().match(searchTerm.toLowerCase())
            );
          }}
          searchDebounceDuration={2000}
          withPagination={true}
          pageSize={6}
          onPageChange={(newPage) => console.log(`on-page-change:- ${newPage}`)}
        />
      )}
    </Card>
  </div>
  );

  
};

export default CoinDisplay;




