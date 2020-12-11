import React, { useEffect, useState } from "react";
import storeImage from "../imagenes/store.png";
import "../css/statisticsStyle.css";
import { getAlmacen } from "../services/salesGraphServices";
import theJSON from "../local/statistics.json";

//Componente para ilustrar la informacion del Almacen actual
function StoreInfo(props) {
  const [langJSON, setLangJSON] = useState(() => theJSON["en"]);
  const [localLang, setLocalLang] = useState(() => navigator.language);
  const [almacenData, setAlmacenData] = useState([
    "Loading...",
    "Loading...",
    "Loading...",
    ["Loading", "Loading"],
    ["Loading", "Loading"],
  ]); //estado para actualizacion de informacion
  useEffect(() => {
    if (localLang === "es") {
      setLangJSON(theJSON["es"]);
    } else if (localLang === "zh") {
      setLangJSON(theJSON["zh"]);
    }
  }, [localLang]);
  //Funcion que agrega la informacion recibida de la tienda
  function addDataToStoreResume(theData) {
    setAlmacenData([
      theData.nombre,
      theData.direccion,
      theData.numero,
      theData.productos,
      theData.historial,
    ]);
  }

  //Funcion que actualiza los datos de la tienda utilizando la funcion getAlmacen del servicio del back
  const updateData = () => {
    console.log(navigator.language);
    if (!navigator.onLine) {
      if (localStorage.getItem("storeResume") === null) {
        addDataToStoreResume([
          "Loading...",
          "Loading...",
          "Loading...",
          ["Loading", "Loading"],
          ["Loading", "Loading"],
        ]);
      } else {
        let resp = localStorage.getItem("storeResume");
        addDataToStoreResume(resp);
      }
    } else {
      getAlmacen().then((resp) => {
        addDataToStoreResume(resp);
        localStorage.setItem("storeResume", JSON.stringify(resp));
      });
    }

    getAlmacen().then((resp) => {
      addDataToStoreResume(resp)
    }
      ); //setGraphData(resp));
    //.then(resp => addDataToGraph(resp.historial))
  };

  //Efecto para llamar a la funcion cada vez que se actualice el DOM
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 rounded storeCol align-items-center">
      <h2 className="text-center">{langJSON.storeInfoStore} {almacenData[0]}</h2>
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 rounded storeCol align-items-center">
          <h3 className="storeFieldsLabel">{langJSON.storeInfoAddress}</h3>{" "}
          <h3 className="storeFields"> {almacenData[1]}</h3>
          <h3 className="storeFieldsLabel">{langJSON.storeInfoID}</h3>{" "}
          <h3 className="storeFields"> {almacenData[2]}</h3>
          <h3 className="storeFieldsLabel">{langJSON.storeInfoProducts}</h3>{" "}
          <h3 className="storeFields"> {almacenData[3].length}</h3>
          <h3 className="storeFieldsLabel">{langJSON.storeInfoActualizations}</h3>{" "}
          <h3 className="storeFields"> {almacenData[4].length}</h3>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 rounded storeCol align-items-center">
          <img
            id="imagenTienda"
            src={storeImage}
            className="img-fluid img-negocio"
            alt="Imagen principal"
          />
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
