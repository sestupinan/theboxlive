import React, { useState, useEffect } from "react";
import logoImg from "../imagenes/thebox3.png";
import "../css/styleTransactions.css";
import { getTransactions } from "../services/transactionsServices";

function Transactions() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getTransactions().then((resp) => setProductData(resp));
    console.log(productData);
  }, []);
  return (
    <div className="row">
      <div className="col-3" id="leftMenu">
        <img
          id="boxLeft"
          src={logoImg}
          alt="Andres' photo"
          width="169"
          height="302"
        />
        <h4 id="nombreEmpresa">Empresa 1</h4>
        <table className="table" id="stats">
          <thead className="stats">
            <tr>
              <th className="stats">Total Ventas:</th>
              <td id="cventas">4</td>
            </tr>
            <tr>
              <th className="stats">Valor Ventas:</th>
              <td id="vventas">$500</td>
            </tr>
            <tr>
              <th className="stats">Total Robos:</th>
              <td id="crobos">1</td>
            </tr>
            <tr>
              <th className="stats">Valor Robos:</th>
              <td id="vrobos">$20</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th className="stats">Almecenes:</th>
              <td id="almacenes">La cabrera</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-9" id="mainList">
        <div className="row">
          <div className="col-9 searchline">
            <input
              type="search"
              id="searchBox"
              className="form-control"
              aria-label="Search"
              placeholder="Filter by type..."
            />
          </div>
          <div className="col-3 searchline">
            <button
              id="actFilter"
              className="btn btn-primary my-2 my-sm-0"
              type="submit"
              onClick={filter}
            >
              Search
            </button>
          </div>
        </div>
        <table className="table" id="trans">
          <thead className="mainList">
            <tr>
              <th className="head">Tipo</th>
              <th className="head">Fecha</th>
              <th className="head">Empleado</th>
              <th className="head">Modificación</th>
              <th className="head">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {productData.length > 0
              ? productData.map((product, index) =>
                  itemTransactions(product, index)
                )
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function itemTransactions(product, index) {
  if (product.fecha == undefined) {
    product.fecha = "No date";
  }
  if (product.descripcion == undefined) {
    product.descripcion = "No description";
  }
  product.fecha = product.fecha.replace("Last Sync: ", "");
  return (
    <tr key={index}>
      <td>{product.tipo}</td>
      <td>{product.fecha}</td>
      <td>{product.usuario}</td>
      <td>
        Old: {product.cantidadAnterior} New: {product.cantidadNueva}
      </td>
      <td>{product.descripcion}</td>
    </tr>
  );
}

function filter() {
  let table = document.getElementById("trans");
  let filter = document.getElementById("searchBox").value.toUpperCase();
  let tr = table.getElementsByTagName("tr");
  // Loop through all table rows, and hide those who don't match the search query
  let i = 0;
  for (i; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

export default Transactions;
