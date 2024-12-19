import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./LoadingToredirect.css";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="redirect-container">
      <div className="redirect-box">
        <h1 className="redirect-title">รอสักครู่น้า</h1>
        <p className="redirect-timer">คุณกำลังถูกนำพาไปอีก {count} วินาที</p>
        <div className="redirect-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
