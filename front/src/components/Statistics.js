import React from "react";
import StoreInfo from "./StoreInfo";
import SalesGraph from "./SalesGraph";
import "../css/statisticsStyle.css";

//Componente para renderizar la totalidad de la division statistics
function Statistics() {
  return (
    <div>
      <div className="row">
        <div className="col titleRow">
          <h1 className="text-center">Statistics of current Store</h1>
        </div>
      </div>
      <div className="row justify-content-around graphRow">
        <StoreInfo />
        <SalesGraph />
      </div>
    </div>
  );
}

export default Statistics;
