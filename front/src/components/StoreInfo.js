import React, { useEffect, useState } from "react";
import storeImage from "../imagenes/store.png";
import "../css/statisticsStyle.css";
import { getAlmacen } from "../services/salesGraphServices";

//Componente para ilustrar la informacion del Almacen actual
function StoreInfo() {
  const [almacenData, setAlmacenData] = useState([
    "Loading...",
    "Loading...",
    "Loading...",
    ["Loading", "Loading"],
    ["Loading", "Loading"],
  ]); //estado para actualizacion de informacion

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
    getAlmacen().then((resp) => addDataToStoreResume(resp)); //setGraphData(resp));
    //.then(resp => addDataToGraph(resp.historial))
  };

  //Efecto para llamar a la funcion cada vez que se actualice el DOM
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 rounded storeCol align-items-center">
      <h2 className="text-center">Store: {almacenData[0]}</h2>
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 rounded storeCol align-items-center">
          <h3 className="storeFieldsLabel">Address:</h3>{" "}
          <h3 className="storeFields"> {almacenData[1]}</h3>
          <h3 className="storeFieldsLabel">ID:</h3>{" "}
          <h3 className="storeFields"> {almacenData[2]}</h3>
          <h3 className="storeFieldsLabel"># Products:</h3>{" "}
          <h3 className="storeFields"> {almacenData[3].length}</h3>
          <h3 className="storeFieldsLabel"># Actualizations:</h3>{" "}
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
