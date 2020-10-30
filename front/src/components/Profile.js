import React, { useState, useEffect } from "react";
import "../css/perfilcss.css";
import OwnerProfilePic from "../imagenes/profilePicOwner.png";
import AlmacenPic from "../imagenes/almacen.png";
import {
  getUsers,
  postEmployee,
  deleteEmployee,
  getTiendas,
  postTienda,
  deleteTienda,
} from "../services/profileServices";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  //Handles profile list
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getUsers().then((resp) => setProductData(resp));
    console.log(productData);
  }, []);

  //Handles storage list
  const [almacenData, setAlmacenData] = useState([]);
  useEffect(() => {
    getTiendas().then((resp) => setAlmacenData(resp));
    console.log(almacenData);
  }, []);

  async function createEmployee() {
    let newEmployee = new Object();
    newEmployee.cedula = parseInt(document.getElementById("formID").value);
    newEmployee.nombre = document.getElementById("formName").value;
    newEmployee.correo = document.getElementById("formEmail").value;
    newEmployee.rol = document.getElementById("formRole").value;
    console.log(newEmployee);
    await postEmployee(newEmployee);
    console.log(productData);
  }

  async function delEmployee() {
    let id = parseInt(document.getElementById("formDel").value);
    console.log(id);
    await deleteEmployee(id);
    console.log(productData);
  }

  async function createStore() {
    let newStore = new Object();
    newStore.numero = parseInt(document.getElementById("formStID").value);
    newStore.nombre = document.getElementById("formStName").value;
    newStore.direccion = document.getElementById("formStDireccion").value;
    console.log(newStore);
    await postTienda([newStore]);
    console.log(almacenData);
  }

  async function delStore() {
    let id = parseInt(document.getElementById("formStDel").value);
    console.log(id);
    await deleteTienda(id);
    console.log(almacenData);
  }

  //Handles modal for Create Employee
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCreate = async () => {
    setShow(false);
    await createEmployee();
    getUsers().then((resp) => setProductData(resp));
  };
  const handleShow = () => setShow(true);

  //Handles modal for Delete Employee
  const [showDl, setShowDl] = useState(false);
  const handleCloseDl = () => setShowDl(false);
  const handleDelete = async () => {
    setShowDl(false);
    await delEmployee();
    getUsers().then((resp) => setProductData(resp));
  };
  const handleShowDl = () => setShowDl(true);

  //Handles modal for Create Store
  const [showSt, setShowSt] = useState(false);
  const handleCloseSt = () => setShowSt(false);
  const handleCreateSt = async () => {
    setShowSt(false);
    await createStore();
    getTiendas().then((resp) => setAlmacenData(resp));
  };
  const handleShowSt = () => setShowSt(true);

  //Handles modal for Delete Store
  const [showStDl, setShowStDl] = useState(false);
  const handleCloseStDl = () => setShowStDl(false);
  const handleDeleteSt = async () => {
    setShowStDl(false);
    await delStore();
    getTiendas().then((resp) => setAlmacenData(resp));
  };
  const handleShowStDl = () => setShowStDl(true);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="headerAzul2">Owner Profile</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col chart">
          <h1>Employees</h1>
          <div>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              onClick={handleShow}
            >
              Add Employee
            </a>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-5">
                  <i className="fas fa-user prefix grey-text"></i>
                  <label data-error="wrong" data-success="right">
                    ID:
                  </label>
                  <input
                    type="text"
                    id="formID"
                    className="form-control validate"
                  />
                </div>

                <div className="md-form mb-5">
                  <i className="fas fa-envelope prefix grey-text"></i>
                  <label data-error="wrong" data-success="right">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="formName"
                    className="form-control validate"
                  />
                </div>
                <div className="md-form mb-5">
                  <i className="fas fa-tag prefix grey-text"></i>
                  <label data-error="wrong" data-success="right">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="formEmail"
                    className="form-control validate"
                  />
                </div>
                <div className="md-form mb-5">
                  <i className="fas fa-tag prefix grey-text"></i>
                  <label data-error="wrong" data-success="right">
                    Role:
                  </label>
                  <input
                    type="text"
                    id="formRole"
                    className="form-control validate"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  onClick={handleClose}
                >
                  Close
                </a>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  onClick={handleCreate}
                >
                  Save Changes
                </a>
              </Modal.Footer>
            </Modal>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
              onClick={handleShowDl}
            >
              Delete Employee
            </a>
            <Modal show={showDl} onHide={handleCloseDl}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-5">
                  <i className="fas fa-envelope prefix grey-text"></i>
                  <label data-error="wrong" data-success="right">
                    ID:
                  </label>
                  <input
                    type="text"
                    id="formDel"
                    className="form-control validate"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  onClick={handleCloseDl}
                >
                  Close
                </a>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  onClick={handleDelete}
                >
                  Delete Employee
                </a>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="row border-izquierda" id="empleados">
            {productData.length > 0
              ? productData.map((product, index) =>
                  cardsEmployees(product, index)
                )
              : null}
          </div>
          <div className="row justify-content-center"></div>
        </div>

        <div className="col-xl-4 col-md-4 col-lg-4 d-flex justify-content-center">
          <div className="card">
            <img className="ownerPic" src={OwnerProfilePic} alt="John" />
            <h1 className="titleOwner">John Doe</h1>
            <p className="title">CEO & Founder Cigarreria la buena</p>
            <h3 className="information">Information</h3>
            <p className="ownStatistics">Sales: $500</p>
            <p className="ownStatistics">Products: 9</p>
            <div className="socialM">
              <a href="#">
                <i className="fa fa-dribbble"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </div>
            <p>
              <button id="botonsito">Contact</button>
            </p>
          </div>
        </div>
      </div>

      <h1>Stores</h1>
      <a
        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
        onClick={handleShowSt}
      >
        Add store
      </a>
      <Modal show={showSt} onHide={handleCloseSt}>
        <Modal.Header closeButton>
          <Modal.Title>Create Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="md-form mb-5">
            <i className="fas fa-user prefix grey-text"></i>
            <label data-error="wrong" data-success="right">
              ID:
            </label>
            <input
              type="text"
              id="formStID"
              className="form-control validate"
            />
          </div>

          <div className="md-form mb-5">
            <i className="fas fa-envelope prefix grey-text"></i>
            <label data-error="wrong" data-success="right">
              Name:
            </label>
            <input
              type="text"
              id="formStName"
              className="form-control validate"
            />
          </div>
          <div className="md-form mb-5">
            <i className="fas fa-tag prefix grey-text"></i>
            <label data-error="wrong" data-success="right">
              Address:
            </label>
            <input
              type="email"
              id="formStDireccion"
              className="form-control validate"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a
            className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
            onClick={handleCloseSt}
          >
            Close
          </a>
          <a
            className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
            onClick={handleCreateSt}
          >
            Save Changes
          </a>
        </Modal.Footer>
      </Modal>
      <a
        className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
        onClick={handleShowStDl}
      >
        Delete store
      </a>
      <Modal show={showStDl} onHide={handleCloseStDl}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="md-form mb-5">
            <i className="fas fa-envelope prefix grey-text"></i>
            <label data-error="wrong" data-success="right">
              ID:
            </label>
            <input
              type="text"
              id="formStDel"
              className="form-control validate"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a
            className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
            onClick={handleCloseStDl}
          >
            Close
          </a>
          <a
            className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
            onClick={handleDeleteSt}
          >
            Delete Store
          </a>
        </Modal.Footer>
      </Modal>
      <div className="row border-izquierda" id="bodegas">
        {almacenData.length > 0
          ? almacenData.map((product, index) => cardsStores(product, index))
          : null}
      </div>
    </div>
  );
}

function cardsEmployees(employee, index) {
  return (
    <div className="col justify-content-center" key={index}>
      <div className="card justify-content-center">
        <div className="card-body">
          <img
            className="card-img-top caras justify-content-center"
            src={OwnerProfilePic}
          ></img>
          <h5 className="card-title emplName">Name: {employee.nombre}</h5>
          <h5 className="card-text infoEmpl">ID: {employee.cedula}</h5>
          <h5 className="card-text infoEmpl">Email: {employee.correo}</h5>
          <h5 className="card-text infoEmpl">Role: {employee.rol}</h5>
          <a className="btn btn-primary contactEmployee">Contact</a>
        </div>
      </div>
    </div>
  );
}

function cardsStores(store, index) {
  return (
    <div className="col justify-content-center" key={index}>
      <div className="card justify-content-center">
        <div className="card-body">
          <img
            className="card-img-top caras justify-content-center"
            src={AlmacenPic}
          ></img>
          <h5 className="card-title emplName">Name: {store.nombre}</h5>
          <h5 className="card-text infoEmpl">ID: {store.numero}</h5>
          <h5 className="card-text infoEmpl">Direccion: {store.direccion}</h5>
        </div>
      </div>
    </div>
  );
}

export default Profile;
