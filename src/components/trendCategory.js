
import React, { useState, useEffect } from 'react';
import '../style/trending.css';
import useTrendCategory from '../hooks/useTrendCategory';
import { useNavigate } from 'react-router-dom';
import { Card , Button } from '@innovaccer/design-system';
import '@innovaccer/design-system/css';

const TrendCategory = () => {
  const { data } = useTrendCategory();

//   console.log("Data Trend", data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 15; // Number of items to display at once

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


  const handleReturnClick = () => {
    // if (location.pathname === '/') {
    //   return;
    // }
    
    navigate(-1);
  };

  return (
    <div className="txt">
      <div className="flx">
        <h3 style={{paddingBottom:"15px"}}>Top Trending Categories</h3>
        <Button onClick={handleReturnClick}>Back</Button>
      </div>
      <div className="centr">
        <div className="carousel-form">
          <div className="carousel">
            <div
              className="carousel-container"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
                transition: 'transform 1s ease', 
              }}
            >
              {console.log("data",data)}
              {data.map((itm, index) => (
                <div key={index}>
                <Card className="border">
                  <div className="box2">
                    <div className="catname">
                      <h3 >{itm.name}</h3>
                    </div>
                    <div className="sparkInfo2">
                        <img className="spark2" src={itm.sparkline}/>
                        <h3>{itm.count}</h3>
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

export default TrendCategory;
