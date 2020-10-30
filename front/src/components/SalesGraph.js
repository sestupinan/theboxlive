import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../css/statisticsStyle.css";
import { getAlmacen } from "../services/salesGraphServices";

//Componente para renderizar grafica de ventas/actualizaciones en la base de datos
function SalesGraph() {
  const [graphData, setGraphData] = useState({}); //estado para guardado de informacion de grafica

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
    getAlmacen().then((resp) => addDataToGraph(resp)); //setGraphData(resp));
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
        <h6>
          Check the statistics of your Store, here we will show you how much
          have you sold and when did it happened. If your employees registered
          the transaction as a Sale, a Supply or a Theft you will see it in this
          report.
        </h6>
      </div>
      <div className="row">
        <Line
          data={graphData}
          options={{
            responsive: true,
            title: { text: "Actualizations in current store", display: true },
            backgroundColor: "rgb(255, 255, 255)",
          }}
        />
      </div>
    </div>
  );
}

export default SalesGraph;
