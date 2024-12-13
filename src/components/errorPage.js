import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(30); 
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      navigate(-1);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{marginBottom:"10px"}}>Error Caused</h1>
      <p>Please wait for 30 seconds.</p>

      <div>
        {countdown > 0 ? (
          <p>Retrying in {countdown} seconds...</p>
        ) : (
          <div>
            <p>Time's up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
