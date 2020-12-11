import React, { useState, useEffect } from "react";
import logoImg from "../imagenes/thebox3.png";
import "../css/styleTransactions.css";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NumericInput from "react-numeric-input";
import DateTimePicker from "react-datetime-picker";
import ReactLoading from "react-loading";
import { MDBDataTable } from "mdbreact";
import DataTable from "react-data-table-component";
import MUIDataTable from "mui-datatables";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {IntlProvider,FormattedMessage, FormattedNumber} from 'react-intl';
import localeEsMessages from '../local/TransanctionsEs.json';
import localeZhMessages from '../local/TransanctionsZh.json';

mobiscroll.settings = {
  theme: "ios",
  themeVariant: "light",
  display: "bubble",
};
import {
  getTransactions,
  postTransaction,
  postStolenTransaction,
} from "../services/transactionsServices";
import { findDOMNode } from "react-dom";

const loadingData = [
  {
    cantidadAnterior: "Loading",
    cantidadNueva: "Loading",
    fecha: "Loading",
    nit: "Loading",
    tipo: "Loading",
    usuario: "Loading",
  },
];
let cols = [
  {
    name: "tipo",
    label: "Type",
    options: {
      filter: true,
    },
  },
  {
    label: "Date",
    name: "fecha",
    options: {
      filter: true,
    },
  },
  {
    label: "Employee",
    name: "usuario",
    options: {
      filter: true,
    },
  },
  {
    label: "New Quantity",
    name: "cantidadNueva",
    options: {
      filter: true,
    },
  },
  {
    label: "NIT",
    name: "nit",
    options: {
      filter: true,
      sort: true,
    },
  },
];
let messages = {"Null":"Null"}; 
function Transactions() {
  let opcionesModal = {
    "es":{"Supply":"Aprovisionamiento", "Sale":"Venta", "Title":"Transacciones"},
    "en":{"Supply":"Supply", "Sale":"Sale","Title":"Transactions"},
    "zh":{"Supply":"供应", "Sale":"特卖","Title":"标题"}
  }
  if(navigator.language.startsWith("es")){
    messages = localeEsMessages;
    opcionesModal = opcionesModal.es;
      cols = [
        {
          name: "Tipo",
          label: "Tipo",
          options: {
            filter: true,
          },
        },
        {
          label: "Fecha",
          name: "fecha",
          options: {
            filter: true,
          },
        },
        {
          label: "Empleado",
          name: "usuario",
          options: {
            filter: true,
          },
        },
        {
          label: "Cantidad Nueva",
          name: "cantidadNueva",
          options: {
            filter: true,
          },
        },
        {
          label: "NIT",
          name: "nit",
          options: {
            filter: true,
            sort: true,
          },
        },
      ];

  }
  else if(navigator.language.startsWith("zh")){
    messages = localeZhMessages;
    opcionesModal = opcionesModal.zh;
    cols = [
      {
        name: "Tipo",
        label: "类型",
        options: {
          filter: true,
        },
      },
      {
        label: "日期",
        name: "fecha",
        options: {
          filter: true,
        },
      },
      {
        label: "雇员",
        name: "usuario",
        options: {
          filter: true,
        },
      },
      {
        label: "数量",
        name: "cantidadNueva",
        options: {
          filter: true,
        },
      },
      {
        label: "尼特",
        name: "nit",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];
  }
  else{
    opcionesModal = opcionesModal.en;
  }
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("transactions") === null) {
        setProductData("Loading...");
      } else {
        setProductData(JSON.parse(localStorage.getItem("transactions")));
      }
    } else {
      getTransactions().then((resp) => {
        setProductData(resp);
        refreshErr();
        localStorage.setItem("transactions", JSON.stringify(resp));
      });
    }
  }, []);

  //Handles Date Time input

  async function getDate() {
    var currentdate = new Date();
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  }
  const [value, onChange] = useState(new Date());
  //Handles modal for Create transaction
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCreate = async () => {
    setShow(false);
    await createTransaction();
    getTransactions().then((resp) => setProductData(resp));
  };
  const handleShow = () => setShow(true);

  //Handles modal for create stolen transaction
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleCreate1 = async () => {
    setShow1(false);
    await createStolenTransaction();
    getTransactions().then((resp) => setProductData(resp));
  };
  const handleShow1 = () => setShow1(true);

  async function createStolenTransaction() {
    let newTransaction = new Object();
    newTransaction.usuario = document.getElementById("usuario1").value;
    newTransaction.nit = document.getElementById("nit1").value;
    newTransaction.cantidadNueva = document.getElementById(
      "cantidadNueva1"
    ).value;

    var currentdate = value;
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    newTransaction.date = datetime;
    await postStolenTransaction(newTransaction);
  }

  async function createTransaction() {
    let newTransaction = new Object();
    newTransaction.usuario = document.getElementById("usuario").value;
    newTransaction.nit = document.getElementById("nit").value;
    newTransaction.cantidadNueva = document.getElementById(
      "cantidadNueva"
    ).value;
    newTransaction.tipo = document.getElementById(
      "inlineFormCustomSelect"
    ).value;
    await postTransaction(
      newTransaction,
      document.getElementById("almacen").value
    );
  }
  return (
    <IntlProvider locale={navigator.language} messages={messages}>
      <div className="row">
        <div className="col-3" id="leftMenu">
          <img
            id="boxLeft"
            src={logoImg}
            alt="Andres' photo"
            width="169"
            height="302"
          />
          <h1 id="nombreEmpresa"><FormattedMessage id="Company" defaultMessage="Company"/></h1>
          <table className="table" id="stats">
            <thead className="stats">
              <tr>
                <th className="stats"><FormattedMessage id= "TotalSales" defaultMessage="Total Sales:"/></th>
                <td id="cventas">4</td>
              </tr>
              <tr>
                <th className="stats"><FormattedMessage id= "ValueSales" defaultMessage="Value Sales:"/></th>
                <td id="vventas">$<FormattedNumber value={500}/></td>
              </tr>
              <tr>
                <th className="stats"><FormattedMessage id= "TotalLost" defaultMessage="Total Lost:"/></th>
                <td id="crobos">1</td>
              </tr>
              <tr>
                <th className="stats"><FormattedMessage id= "ValueLost" defaultMessage="Value Lost:"/></th>
                <td id="vrobos">$<FormattedNumber value={20}/></td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th className="stats"><FormattedMessage id= "Stores" defaultMessage="Stores:"/></th>
                <td id="almacenes">La cabrera</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-9" id="mainList">
          <div className="row">
            <div className="my-1 my-sm-0 searchline">
              <button
                id="actFilter2"
                className="btn btn-dark btn-primary my-1 my-sm-0"
                type="submit"
                onClick={handleShow}
              >
                <FormattedMessage id= "AddItem" defaultMessage="Add Item Transaction"/>
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title><FormattedMessage id= "CreateTransaction" defaultMessage="Create Transaction"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Type" defaultMessage="Type"/>
                    <Form>
                      <Form.Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                          <Form.Label
                            className="mr-sm-2"
                            htmlFor="inlineFormCustomSelect"
                            srOnly
                          >
                            Preference
                          </Form.Label>
                          <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                          >
                            <option value="Sale">{opcionesModal.Sale}</option>
                            <option value="Supply">{opcionesModal.Supply}</option>
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form>
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Employee" defaultMessage="Employee"/>
                    <NumericInput
                      id="usuario"
                      className="form-control"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Quantity" defaultMessage="Quantity"/>
                    <NumericInput
                      className="form-control"
                      id="cantidadNueva"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Store" defaultMessage="Store"/>
                    <NumericInput
                      className="form-control"
                      id="almacen"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                    NIT
                    <NumericInput
                      className="form-control"
                      id="nit"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleClose}
                  >
                    <FormattedMessage id= "Close" defaultMessage="Close"/>
                  </a>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleCreate}
                  >
                    <FormattedMessage id= "SaveChanges" defaultMessage="Save Changes"/>
                  </a>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="my-2 my-sm-0 searchline">
              <button
                id="actFilter"
                className="btn btn-primary my-2 my-sm-0"
                type="submit"
                onClick={handleShow1}
              >
                <FormattedMessage id= "AddStoleItem" defaultMessage="Add Stolen item Transaction"/>
              </button>
              <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Stolen Item Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Employee" defaultMessage="Employee"/>
                    <NumericInput
                      id="usuario1"
                      className="form-control"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Quantity" defaultMessage="Quantity"/> 
                    <NumericInput
                      className="form-control"
                      id="cantidadNueva1"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Store" defaultMessage="Store"/> 
                    <NumericInput
                      className="form-control"
                      id="almacen1"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                    NIT
                    <NumericInput
                      className="form-control"
                      id="nit1"
                      value={1}
                      min={0}
                      max={100}
                      step={1}
                      precision={0}
                      size={5}
                    />
                  </div>
                  <div className="md-form mb-5">
                  <FormattedMessage id= "Date" defaultMessage="Date"/> 
                    <div>
                      <DateTimePicker
                        id="dates"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleClose1}
                  >
                    <FormattedMessage id= "Close" defaultMessage="Close"/> 
                  </a>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleCreate1}
                  >
                    <FormattedMessage id= "SaveChanges" defaultMessage="Save Changes"/> 
                  </a>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <MUIDataTable
            title ={opcionesModal.Title}
            data={productData.length > 0 ? productData : loadingData}
            columns={cols}
          />
        </div>
      </div>
    </IntlProvider>
  );
}

function modificarTransacciones() {
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
      <td>{product.nit}</td>
    </tr>
  );
}

const Loading = () => (
  <tr key={0}>
    <td>
      <ReactLoading
        type="spinningBubbles"
        color="#1d2d44"
        height="30px"
        width="30px"
        margin-left="30px"
      />
    </td>
    <td>
      <ReactLoading
        type="spinningBubbles"
        color="#1d2d44"
        height="30px"
        width="30px"
        margin-left="30px"
      />
    </td>
    <td>
      <ReactLoading
        type="spinningBubbles"
        color="#1d2d44"
        height="30px"
        width="30px"
        margin-left="30px"
      />
    </td>
    <td>
      <ReactLoading
        type="spinningBubbles"
        color="#1d2d44"
        height="30px"
        width="30px"
        margin-left="30px"
      />
    </td>
    <td>
      <ReactLoading
        type="spinningBubbles"
        color="#1d2d44"
        height="30px"
        width="30px"
        margin-left="30px"
      />
    </td>
  </tr>
);


function refreshErr() {
  let ayuda = document.getElementsByClassName(
    "MUIDataTableHeadCell-sortLabelRoot-57"
  );
  for (let index = 0; index < ayuda.length; index++) {
    ayuda[index].setAttribute("aria-label", "Header button");
  }
  let ayuda2 = document.getElementsByClassName("PrivateSwitchBase-input-49");
  for (let index = 0; index < ayuda2.length; index++) {
    ayuda2[index].setAttribute("aria-label", "test");
  }
}

export default Transactions;
