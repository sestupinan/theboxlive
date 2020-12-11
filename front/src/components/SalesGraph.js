import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../css/statisticsStyle.css";
import { getAlmacen } from "../services/salesGraphServices";
import theJSON from "../local/statistics.json";

//Componente para renderizar grafica de ventas/actualizaciones en la base de datos
function SalesGraph() {
  const [graphData, setGraphData] = useState({}); //estado para guardado de informacion de grafica
  const [langJSON, setLangJSON] = useState(() => theJSON["en"]);
  const [localLang, setLocalLang] = useState(() => navigator.language);

  useEffect(() => {
    if (localLang === "es") {
      setLangJSON(theJSON["es"]);
    } else if (localLang === "zh") {
      setLangJSON(theJSON["zh"]);
    }
  }, [localLang]);

  //Funcion que agrega la informacion recibida de la tienda
  function addDataToGraph(theData) {
    const theDataHistorial = theData.historial; //obtener historial del JSON de la tienda
    setGraphData({
      labels: theDataHistorial.map((aName) => aName.fecha), //labels con las fechas de actualización
      datasets: [
        {
          label: "Quantity of the store",
          data: theDataHistorial.map((item) => item.cantidadAnterior), //datos con la cantidad anterior en la actualizacion
          fill: false,
          backgroundColor: "rgb(255, 255, 255)",
          borderColor: "#1d2d44",
        },
      ],
    });
  }

  //Funcion que actualiza los datos de la grafica utilizando la funcion getAlmacen del servicio del back
  const updateData = () => {
    console.log(navigator.language);
    if (!navigator.onLine) {
      if (localStorage.getItem("dataGraph") === null) {
        addDataToGraph({});
      } else {
        let resp = localStorage.getItem("dataGraph");
        addDataToGraph(resp);
      }
    } else {
      getAlmacen().then((resp) => {
        addDataToGraph(resp);
        localStorage.setItem("dataGraph", JSON.stringify(resp));
      });
    }
    //.then(resp => addDataToGraph(resp.historial))
  };
  //Efecto para llamar a la funcion cada vez que se actualice el DOM
  useEffect(() => {
    updateData();
  }, []);
  //Retorna JSX a ser renderizado en la seccion Statistics
  return (
    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
      <div className="row">
        <p>
          {langJSON.text}
        </p>
      </div>
      <div className="row">
        <Line
          data={graphData}
          options={{
            responsive: true,
            title: { text: langJSON.storeGraphTitle, display: true },
            backgroundColor: "rgb(255, 255, 255)",
          }}
        />
      </div>
    </div>
  );
}

export default SalesGraph;
