
import React from "react";
import "../style/coinPage.css"; 
import useCoin from "../hooks/useCoinPage";
import { useNavigate, useParams } from "react-router-dom";
import { OrbitProgress } from 'react-loading-indicators';
import '../style/CoinDisplay.css';
import { Button } from "@innovaccer/design-system";

function CoinPage() {

    const {id} = useParams();
    const {coin , loading, error} = useCoin(id);
    const navigate = useNavigate();

    if (loading) {
        return  <div className="indic"><OrbitProgress variant="spokes" color="#ff0202" size="large" text="" textColor="" /></div>;
    }

    if (error) {
        return <div>{error}</div>; 
    }

    console.log("coin: ", coin);
    console.log("Coin Des: ," , coin.description.en);


  const handleReturnClick = () => {
    navigate(-1);
  };


    return (
    <div style={{height:"100%" , overflow:"auto"}}>
       <div className="bck">
            <Button onClick={handleReturnClick}> Back</Button>
          </div>
      <div className="coinPage-Container">
        <div className="coinPage-Info">
          <h1 style={{paddingTop:"20px"}}>{coin.name}</h1>
          <img src={coin.image.large} alt="Coin Icon" className="coinPage-Icon" />
          <div className="coinPage-Data">
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Symbol:</h3>
              <h3 className="coinPage-RowData"> {coin.symbol}</h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Current Price:</h3>
              <h3 className="coinPage-RowData">
                 $ {coin.market_data.current_price.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Market Cap:</h3>
              <h3 className="coinPage-RowData">
                 $ {coin.market_data.market_cap.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Total Volume:</h3>
              <h3 className="coinPage-RowData">
                 $ {coin.market_data.total_volume.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">24hr High:</h3>
              <h3 className="coinPage-RowData green">
                 $ {coin.market_data.high_24h.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">24hr Low:</h3>
              <h3 className="coinPage-RowData red">
                 $ {coin.market_data.low_24h.usd.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* <div>
            <Button onClick={handleReturnClick}> Return</Button>
          </div> */}
        </div>
        <div className="coinPage-Info coinPage-Description">
          <h1 style={{paddingTop:"20px"}}>Description</h1>
          <div className="coinPage-Description-inner">
          <p>{coin.description?.en ? coin.description.en.replace(/<[^>]*>/g, '') : 'Description not available'}</p>
          </div>
        </div>
      </div>
    </div>
    );
}

export default CoinPage;


