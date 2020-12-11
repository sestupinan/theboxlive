import React, {useState, useEffect} from "react";
import StoreInfo from "./StoreInfo";
import SalesGraph from "./SalesGraph";
import "../css/statisticsStyle.css";
import theJSON from "../local/statistics.json";

//Componente para renderizar la totalidad de la division statistics
function Statistics() {
  const [langJSON, setLangJSON] = useState(() => theJSON["en"]);
  const [localLang, setLocalLang] = useState(() => navigator.language);

  useEffect(() => {
    if (navigator.language.startsWith("es")) {
      setLangJSON(theJSON["es"]);
    } else if (navigator.language.startsWith("zh")) {
      setLangJSON(theJSON["zh"]);
    }
  }, [localLang]);

  return (
    <div>
      <div className="row">
        <div className="col titleRow">
  <h1 className="text-center">{langJSON.title}</h1>
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
