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
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";
import { Form } from "react-bootstrap";
import { render } from "react-dom";

function Profile() {
  //Handles form validation

  //Handles alerts for Employee
  const [showSucc, setSucc] = useState(false);
  const [showFail, setFail] = useState(false);
  const [showDel, setDel] = useState(false);

  //Handles alerts for Store
  const [showSuccSt, setSuccSt] = useState(false);
  const [showDelSt, setDelSt] = useState(false);

  //Handles profile list
  const [productData, setProductData] = useState([]);
  const [loading, setLoad] = useState({ loading: false });
  useEffect(() => {
    getUsers().then((resp) => {
      console.log(resp);
      setProductData(resp);
      setLoad({ loading: true });
    });
  }, []);

  //Handles storage list
  const [almacenData, setAlmacenData] = useState([]);
  const [loadingStores, setLoadStore] = useState({ loadingStores: false });
  useEffect(() => {
    getTiendas().then((resp) => {
      setAlmacenData(resp);
      setLoadStore({ loadingStores: true });
    });
  }, []);

  async function createEmployee() {
    let newEmployee = new Object();
    let form = document.getElementById("createForm");
    newEmployee.cedula = parseInt(document.getElementById("formID").value);
    newEmployee.nombre = document.getElementById("formName").value;
    newEmployee.correo = document.getElementById("formEmail").value;
    newEmployee.rol = document.getElementById("formRole").value;
    if (
      newEmployee.nombre.length < 1 ||
      newEmployee.correo.length < 1 ||
      newEmployee.rol.length < 1
    ) {
      console.log("error");
      return;
    }
    let res = await postEmployee(newEmployee);
    if (res == 200) {
      setSucc(true);
      window.setTimeout(() => {
        setSucc(false);
      }, 3000);
    }
  }

  async function delEmployee() {
    let id = idDel;
    let res = await deleteEmployee(id);
    if (res == 200) {
      setDel(true);
      window.setTimeout(() => {
        setDel(false);
      }, 3000);
    }
  }

  async function createStore() {
    let newStore = new Object();
    newStore.numero = parseInt(document.getElementById("formStID").value);
    newStore.nombre = document.getElementById("formStName").value;
    newStore.direccion = document.getElementById("formStDireccion").value;
    let res = await postTienda([newStore]);
    if (res == 200) {
      setSuccSt(true);
      window.setTimeout(() => {
        setSuccSt(false);
      }, 3000);
    }
  }

  async function delStore() {
    let id = idDelSt;
    let res = await deleteTienda(id);
    if (res == 200) {
      setDelSt(true);
      window.setTimeout(() => {
        setDelSt(false);
      }, 3000);
    }
  }

  //Handles modal for Create Employee
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCreate = async () => {
    console.log("creando");
    setShow(false);
    await createEmployee();
    getUsers().then((resp) => setProductData(resp));
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  //Handles modal for Delete Employee
  const [showDl, setShowDl] = useState(false);
  const [idDel, setIdDel] = useState(0);
  const handleCloseDl = () => setShowDl(false);
  const handleDelete = async () => {
    setShowDl(false);
    await delEmployee();
    getUsers().then((resp) => setProductData(resp));
  };
  const handleShowDl = (idNewDel) => {
    setShowDl(true);
    setIdDel(idNewDel);
  };

  //Handles modal for Create Store
  const [showSt, setShowSt] = useState(false);
  const handleCloseSt = () => setShowSt(false);
  const handleCreateSt = async () => {
    setShowSt(false);
    await createStore();
    getTiendas().then((resp) => setAlmacenData(resp));
    setValidatedSt(false);
  };
  const handleShowSt = () => setShowSt(true);

  //Handles modal for Delete Store
  const [showStDl, setShowStDl] = useState(false);
  const [idDelSt, setIdDelSt] = useState(0);
  const handleCloseStDl = () => setShowStDl(false);
  const handleDeleteSt = async () => {
    setShowStDl(false);
    await delStore();
    getTiendas().then((resp) => setAlmacenData(resp));
  };
  const handleShowStDl = (idSt) => {
    setShowStDl(true);
    setIdDelSt(idSt);
  };
  function cardsEmployees(employee, index) {
    return (
      <div className="col justify-content-center" key={index}>
        <div className="card justify-content-center">
          <div className="card-body">
            <img
              className="card-img-top caras justify-content-center"
              src={OwnerProfilePic}
              alt="Imagen de Perfil"
            ></img>
            <p className="card-title emplName">Name: {employee.nombre}</p>
            <p className="card-text infoEmpl">ID: {employee.cedula}</p>
            <p className="card-text infoEmpl">Email: {employee.correo}</p>
            <p className="card-text infoEmpl">Role: {employee.rol}</p>
            <a
              className="btn btn-default btn-rounded mb-4 contactEmployee"
              href={"mailto:" + employee.correo}
              aria-label={"Contact employee" + employee.nombre}
            >
              Contact
            </a>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
              onClick={() => handleShowDl(employee.cedula)}
            >
              Delete Employee
            </a>
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
              alt="Imagen tienda"
            ></img>
            <p className="card-title emplName">Name: {store.nombre}</p>
            <p className="card-text infoEmpl">ID: {store.numero}</p>
            <p className="card-text infoEmpl">Direccion: {store.direccion}</p>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
              onClick={() => handleShowStDl(store.numero)}
            >
              Delete store
            </a>
          </div>
        </div>
      </div>
    );
  }

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = document.getElementById("createForm");
    console.log(form);
    if (form.checkValidity() === false) {
      console.log("Error validando");
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleCreate();
    }
    console.log("Validado");
    setValidated(true);
  };

  const [validatedSt, setValidatedSt] = useState(false);
  const handleSubmitSt = (event) => {
    const form = document.getElementById("createFormSt");
    console.log(form);
    if (form.checkValidity() === false) {
      console.log("Error validando");
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleCreateSt();
    }
    console.log("Validado");
    setValidatedSt(true);
  };

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
          <Alert
            variant="success"
            show={showSucc}
            dismissible
            onClose={() => setSucc(false)}
          >
            Employee created successfully.
          </Alert>
          <Alert
            variant="warning"
            show={showDel}
            dismissible
            onClose={() => setDel(false)}
          >
            Employee eliminated successfully.
          </Alert>
          <Alert
            variant="danger"
            show={showFail}
            dismissible
            onClose={() => setFail(false)}
          >
            Error.
          </Alert>
          <div>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              onClick={handleShow}
            >
              Add Employee
            </a>
            <Modal show={show} onHide={handleClose}>
              <Form
                id="createForm"
                className="needs-validation createForm"
                noValidate
                validated={validated}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-5">
                    <fieldset>
                      <i className="fas fa-user prefix grey-text"></i>
                      <label data-error="wrong" data-success="right">
                        ID:
                      </label>
                      <Form.Control
                        type="text"
                        name="id"
                        id="formID"
                        className="form-control validate"
                        required
                      />
                      <br></br>
                      <i className="fas fa-envelope prefix grey-text"></i>
                      <label data-error="wrong" data-success="right">
                        Name:
                      </label>
                      <Form.Control
                        type="text"
                        name="name"
                        id="formName"
                        className="form-control validate"
                        required
                      />

                      <br></br>
                      <i className="fas fa-tag prefix grey-text"></i>
                      <label data-error="wrong" data-success="right">
                        Email:
                      </label>
                      <Form.Control
                        type="email"
                        name="email"
                        id="formEmail"
                        className="form-control validate"
                        required
                      />
                      <br></br>
                      <i className="fas fa-tag prefix grey-text"></i>
                      <label data-error="wrong" data-success="right">
                        Role:
                      </label>
                      <Form.Control
                        type="text"
                        name="role"
                        id="formRole"
                        className="form-control validate"
                        required
                      />
                      
                    </fieldset>
                    <br></br>
                    <Form.Control.Feedback type="invalid">
                        Please fill all the required fields.
                      </Form.Control.Feedback>
                  </div>

                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleClose}
                    type="reset"
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </Modal.Footer>
              </Form>
            </Modal>
            <Modal show={showDl} onHide={handleCloseDl}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-5">
                  <i className="fas fa-envelope prefix grey-text"></i>
                  Are you sure you want to delete this employee?
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
            {productData.length > 0 ? (
              productData.map((product, index) =>
                cardsEmployees(product, index)
              )
            ) : (
              <Loading />
            )}
          </div>
          <div className="row justify-content-center"></div>
        </div>

        <div className="col-xl-4 col-md-4 col-lg-4 d-flex justify-content-center">
          <div className="card">
            <img className="ownerPic" src={OwnerProfilePic} alt="John" />
            <h1 className="titleOwner">John Doe</h1>
            <p className="title">CEO Club Los Alpes</p>
            <h2 className="information">Information</h2>
            <p className="ownStatistics">Sales: $500</p>
            <p className="ownStatistics">Products: 9</p>
            <div className="socialM"></div>
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
      <Alert
        variant="success"
        show={showSuccSt}
        dismissible
        onClose={() => setSuccSt(false)}
      >
        Store created successfully.
      </Alert>
      <Alert
        variant="warning"
        show={showDelSt}
        dismissible
        onClose={() => setDelSt(false)}
      >
        Store eliminated successfully.
      </Alert>
      <Modal show={showSt} onHide={handleCloseSt}>
        <Form
          id="createFormSt"
          className="needs-validation createForm"
          noValidate
          validated={validatedSt}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="md-form mb-5">
              <i className="fas fa-user prefix grey-text"></i>
              <label data-error="wrong" data-success="right">
                ID:
              </label>
              <Form.Control
                type="text"
                id="formStID"
                className="form-control validate"
                required
              />
            </div>

            <div className="md-form mb-5">
              <i className="fas fa-envelope prefix grey-text"></i>
              <label data-error="wrong" data-success="right">
                Name:
              </label>
              <Form.Control
                type="text"
                id="formStName"
                className="form-control validate"
                required
              />
            </div>
            <div className="md-form mb-5">
              <i className="fas fa-tag prefix grey-text"></i>
              <label data-error="wrong" data-success="right">
                Address:
              </label>
              <Form.Control
                type="text"
                id="formStDireccion"
                className="form-control validate"
                required
              />
              <br></br>
              <Form.Control.Feedback type="invalid">
                        Please fill all the required fields.
                      </Form.Control.Feedback>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              onClick={handleCloseSt}
              type="button"
            >
              Close
            </button>
            <button
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              type="button"
              onClick={handleSubmitSt}
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showStDl} onHide={handleCloseStDl}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="md-form mb-5">
            <i className="fas fa-envelope prefix grey-text"></i>
            Are you sure you want to delete this store?
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
        {almacenData.length > 0 ? (
          almacenData.map((product, index) => cardsStores(product, index))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

const Loading = () => (
  <ReactLoading
    type="spinningBubbles"
    color="#1d2d44"
    height={"10%"}
    width={"10%"}
    margin-left="30px"
  />
);

let Succ = () => <div></div>;

export default Profile;
