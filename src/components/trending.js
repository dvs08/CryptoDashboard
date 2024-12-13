
import React, { useState, useEffect } from 'react';
import '../style/trending.css';
import useTrending from '../hooks/useTrending';
import { useNavigate } from 'react-router-dom';
import { Card , Button } from '@innovaccer/design-system';
import '@innovaccer/design-system/css';

const Trending = () => {
  const { data} = useTrending();

  console.log("Data Trend", data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 15; 

  const navigate = useNavigate();
 

  const totalItems = data.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === totalItems - 1) {
          return 1; 
        }
        return prevIndex + 1; 
      });
    }, 5000); 

    return () => clearInterval(interval); 
  }, [totalItems]);


  // const handleReturnClick = () => {
  //   // if (location.pathname === '/') {
  //   //   return;
  //   // }
    
  //   navigate(-1);
  // };

  return (
    <div className="txt">
      <div className="flx">
        <h3 style={{paddingBottom:"15px"}}>Top Trending Coins</h3>
        {/* <Button onClick={handleReturnClick}>Back</Button> */}
        </div>
      <div className="centr">
        <div className="carousel-form">
          <div className="carousel">
            <div
              className="carousel-container"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
                transition: 'transform 1s ease', // Smooth transition
              }}
            >
              {data.map((itm, index) => (
                <div key={index}>
                <Card className="border">
                  <div className="box">
                    <div>
                      <img className="imgs" src={itm.image}/>
                    </div>
                    <div className="sparkInfo">
                        <img className="spark" src={itm.sparkline}/>
                    </div>
                    <div className="info">
                      <h3>{itm.symbol}</h3>
                      <h3>{itm.rank}</h3>
                      <h3 style={{color: itm.change24h < 0 ? 'red' : 'green'}}>{itm.change24h}%</h3>
                    </div>
                  </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
