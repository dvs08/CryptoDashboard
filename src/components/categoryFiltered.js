import React from 'react';
import useCatFilter from '../hooks/useCategoryFIlter';
import "@innovaccer/design-system/css/dist/index.css";
import '../style/innoOverride.css';
import '../style/CoinDisplay.css';
// import '../style/trending.css';
import { Card, Table, Button } from "@innovaccer/design-system";
import { useParams , useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';

const CoinDisplayFiltered = () => {

    const {name , id} = useParams();

  const { coin , loading, error } = useCatFilter(id);
  // console.log("Coin DATA: ", coin);

  const navigate = useNavigate();
  const schema = [
    {
      name: "image",
      displayName: "Image",
      width: "10%",
      separator: true,
      sorting: false,
      translate: (a) => ({
        
        title: <img src={a.image} alt={a.name} style={{ width: "40px", height: "40px" , cursor:"pointer" }}onClick ={() => navigate(`/coin/${a.id}`)}/>,

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
      translate: (a) => `$${a.price.toFixed(2)}`,
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
      translate: (a) => a.volume.toLocaleString(), // with commas
    },
  ];


  const handleReturnClick = () => {
    navigate(-1);
  };


  return (
<div  style={{height:"100%" , overflow:"auto"}}>
    <div className="flx2">
        <h3 style={{textAlign:"center", fontSize:"25px", margin:"10px"}}>{name}</h3>
        <Button onClick={handleReturnClick}>Back</Button>
    </div>

    {/* <div style={{textAlign:"center", fontSize:"30px", margin:"10px"}}> {name}</div> */}
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
          data={coin}
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
          pageSize={7}
          onPageChange={(newPage) => console.log(`on-page-change:- ${newPage}`)}
        />
      )}
    </Card>
</div>
  );

  
};

export default CoinDisplayFiltered ;




