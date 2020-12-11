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
    console.log(navigator.language);
    if (!navigator.onLine) {
      if (localStorage.getItem("users") === null) {
        setProductData("Loading...");
      } else {
        setProductData(JSON.parse(localStorage.getItem("users")));
      }
    } else {
      getUsers().then((resp) => {
        console.log(resp);
        setProductData(resp);
        setLoad({ loading: true });
        localStorage.setItem("users", JSON.stringify(resp));
      });
    }
  }, []);

  //Handles storage list
  const [almacenData, setAlmacenData] = useState([]);
  const [loadingStores, setLoadStore] = useState({ loadingStores: false });
  useEffect(() => {

    console.log(navigator.language);
    if (!navigator.onLine) {
      if (localStorage.getItem("stores") === null) {
        setAlmacenData("Loading...");
      } else {
        setAlmacenData(JSON.parse(localStorage.getItem("stores")));
      }
    } else {
      getTiendas().then((resp) => {
        setAlmacenData(resp);
        setLoadStore({ loadingStores: true });
        localStorage.setItem("stores", JSON.stringify(resp));
      });
    }

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
    if (!navigator.language.startsWith("en")) {
      if (navigator.language.startsWith("es")) {
        return (
          <div className="col justify-content-center" key={index}>
            <div className="card justify-content-center">
              <div className="card-body">
                <img
                  className="card-img-top caras justify-content-center"
                  src={OwnerProfilePic}
                  alt="Imagen de Perfil"
                ></img>
                <p className="card-title emplName">Nombre: {employee.nombre}</p>
                <p className="card-text infoEmpl">ID: {employee.cedula}</p>
                <p className="card-text infoEmpl">Correo: {employee.correo}</p>
                <p className="card-text infoEmpl">Rol: {employee.rol}</p>
                <a
                  className="btn btn-default btn-rounded mb-4 contactEmployee"
                  href={"mailto:" + employee.correo}
                  aria-label={"Contact employee" + employee.nombre}
                >
                  Contacto
            </a>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
                  onClick={() => handleShowDl(employee.cedula)}
                >
                  Eliminar Empleado
            </a>
              </div>
            </div>
          </div>
        );
      }
    }
    if (navigator.language.startsWith("zh")) {
      return (
        <div className="col justify-content-center" key={index}>
          <div className="card justify-content-center">
            <div className="card-body">
              <img
                className="card-img-top caras justify-content-center"
                src={OwnerProfilePic}
                alt="Imagen de Perfil"
              ></img>
              <p className="card-title emplName">姓名： {employee.nombre}</p>
              <p className="card-text infoEmpl">身份证: {employee.cedula}</p>
              <p className="card-text infoEmpl">邮件： {employee.correo}</p>
              <p className="card-text infoEmpl">角色： {employee.rol}</p>
              <a
                className="btn btn-default btn-rounded mb-4 contactEmployee"
                href={"mailto:" + employee.correo}
                aria-label={"Contact employee" + employee.nombre}
              >
                联系我们
          </a>
              <a
                className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
                onClick={() => handleShowDl(employee.cedula)}
              >
                移除员工
          </a>
            </div>
          </div>
        </div>
      );
    }
    else {
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
  }

  function cardsStores(store, index) {
    if (!navigator.language.startsWith("en")) {
      if (navigator.language.startsWith("es")) {
        return (
          <div className="col justify-content-center" key={index}>
            <div className="card justify-content-center">
              <div className="card-body">
                <img
                  className="card-img-top caras justify-content-center"
                  src={AlmacenPic}
                  alt="Imagen tienda"
                ></img>
                <p className="card-title emplName">Nombre: {store.nombre}</p>
                <p className="card-text infoEmpl">ID: {store.numero}</p>
                <p className="card-text infoEmpl">Direccion: {store.direccion}</p>
                <a
                  className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
                  onClick={() => handleShowStDl(store.numero)}
                >
                  Eliminar Tienda
            </a>
              </div>
            </div>
          </div>
        );
      }
    }
    if (navigator.language.startsWith("zh")) {
      return (
        <div className="col justify-content-center" key={index}>
          <div className="card justify-content-center">
            <div className="card-body">
              <img
                className="card-img-top caras justify-content-center"
                src={AlmacenPic}
                alt="Imagen tienda"
              ></img>
              <p className="card-title emplName">姓名： {store.nombre}</p>
              <p className="card-text infoEmpl">身份证： {store.numero}</p>
              <p className="card-text infoEmpl"> 地址： {store.direccion}</p>
              <a
                className="btn btn-default btn-rounded mb-4 btnModalRemoveEmployee"
                onClick={() => handleShowStDl(store.numero)}
              >
                删除商店
          </a>
            </div>
          </div>
        </div>
      );
    }
    else {
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
  if (!navigator.language.startsWith("en")) {
    if (navigator.language.startsWith("es")) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="headerAzul2">Perfil del propietario</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col chart">
              <h1>Empleados</h1>
              <Alert
                variant="success"
                show={showSucc}
                dismissible
                onClose={() => setSucc(false)}
              >
                Empleado creado exitosamente.
          </Alert>
              <Alert
                variant="warning"
                show={showDel}
                dismissible
                onClose={() => setDel(false)}
              >
               Empleado eliminado exitosamente.
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
                  Añadir Empleado
            </a>
                <Modal show={show} onHide={handleClose}>
                  <Form
                    id="createForm"
                    className="needs-validation createForm"
                    noValidate
                    validated={validated}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Crear Empleado</Modal.Title>
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
                            Nombre:
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
                            Correo:
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
                            Rol:
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
                         Por favor llene todos los campos obligatorios.
                      </Form.Control.Feedback>
                      </div>

                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        onClick={handleClose}
                        type="reset"
                      >
                        Cerrar
                  </button>
                      <button
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Guardar Cambios
                  </button>
                    </Modal.Footer>
                  </Form>
                </Modal>
                <Modal show={showDl} onHide={handleCloseDl}>
                  <Modal.Header closeButton>
                    <Modal.Title>Eliminar Empleado</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                Esta seguro de que desea eliminar este empleado?
                </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <a
                      className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                      onClick={handleCloseDl}
                    >
                      Cerrar
                </a>
                    <a
                      className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                      onClick={handleDelete}
                    >
                     Eliminar Empleado
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
                <h2 className="information">Informacion</h2>
                <p className="ownStatistics">Ventas: $500</p>
                <p className="ownStatistics">Productos: 9</p>
                <div className="socialM"></div>
                <p>
                  <button id="botonsito">Contacto</button>
                </p>
              </div>
            </div>
          </div>

          <h1>Tiendas</h1>
          <a
            className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
            onClick={handleShowSt}
          >
            Añadir Tienda
      </a>
          <Alert
            variant="success"
            show={showSuccSt}
            dismissible
            onClose={() => setSuccSt(false)}
          >
            Tienda creada exitosamente.
      </Alert>
          <Alert
            variant="warning"
            show={showDelSt}
            dismissible
            onClose={() => setDelSt(false)}
          >
           Tienda eliminada exitosamente.
      </Alert>
          <Modal show={showSt} onHide={handleCloseSt}>
            <Form
              id="createFormSt"
              className="needs-validation createForm"
              noValidate
              validated={validatedSt}
            >
              <Modal.Header closeButton>
                <Modal.Title>Crear Tienda</Modal.Title>
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
                    Nombre:
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
                    Direccion:
              </label>
                  <Form.Control
                    type="text"
                    id="formStDireccion"
                    className="form-control validate"
                    required
                  />
                  <br></br>
                  <Form.Control.Feedback type="invalid">
                    Por favor llene todos los cambios obligatorios.
                      </Form.Control.Feedback>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  onClick={handleCloseSt}
                  type="button"
                >
                  Cerrar
            </button>
                <button
                  className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                  type="button"
                  onClick={handleSubmitSt}
                >
                  Guardad Cambios
            </button>
              </Modal.Footer>
            </Form>
          </Modal>

          <Modal show={showStDl} onHide={handleCloseStDl}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Tienda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="md-form mb-5">
                <i className="fas fa-envelope prefix grey-text"></i>
            Esta seguro de que desea eliminar esta tienda?
          </div>
            </Modal.Body>
            <Modal.Footer>
              <a
                className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                onClick={handleCloseStDl}
              >
                Cerrar
          </a>
              <a
                className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                onClick={handleDeleteSt}
              >
                Eliminar Tienda
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
  }

  if (navigator.language.startsWith("zh")) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="headerAzul2">业主简介</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col chart">
            <h1>雇员</h1>
            <Alert
              variant="success"
              show={showSucc}
              dismissible
              onClose={() => setSucc(false)}
            >
              成功创建员工.
        </Alert>
            <Alert
              variant="warning"
              show={showDel}
              dismissible
              onClose={() => setDel(false)}
            >
             员工成功解聘.
        </Alert>
            <Alert
              variant="danger"
              show={showFail}
              dismissible
              onClose={() => setFail(false)}
            >
              错了
        </Alert>
            <div>
              <a
                className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                onClick={handleShow}
              >
                添加员工
          </a>
              <Modal show={show} onHide={handleClose}>
                <Form
                  id="createForm"
                  className="needs-validation createForm"
                  noValidate
                  validated={validated}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>创建就业</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <fieldset>
                        <i className="fas fa-user prefix grey-text"></i>
                        <label data-error="wrong" data-success="right">
                        身份证：
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
                        姓名：
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
                        邮件：
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
                        角色：
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
                      请填写所有必填项.
                    </Form.Control.Feedback>
                    </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                      onClick={handleClose}
                      type="reset"
                    >
                      关闭
                </button>
                    <button
                      className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                      type="button"
                      onClick={handleSubmit}
                    >
                      保存更改
                </button>
                  </Modal.Footer>
                </Form>
              </Modal>
              <Modal show={showDl} onHide={handleCloseDl}>
                <Modal.Header closeButton>
                  <Modal.Title>移除员工</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-5">
                    <i className="fas fa-envelope prefix grey-text"></i>
                    你确定要除掉这个员工吗？
              </div>
                </Modal.Body>
                <Modal.Footer>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleCloseDl}
                  >
                    关闭
              </a>
                  <a
                    className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                    onClick={handleDelete}
                  >
                   移除员工
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
              <h2 className="information">资讯</h2>
              <p className="ownStatistics">销售额：500</p>
              <p className="ownStatistics">产品：9</p>
              <div className="socialM"></div>
              <p>
                <button id="botonsito">联系我们</button>
              </p>
              
            </div>
          </div>
        </div>

        <h1>商店</h1>
        <a
          className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
          onClick={handleShowSt}
        >
          添加店铺
    </a>
        <Alert
          variant="success"
          show={showSuccSt}
          dismissible
          onClose={() => setSuccSt(false)}
        >
          店铺成功创建.
    </Alert>
        <Alert
          variant="warning"
          show={showDelSt}
          dismissible
          onClose={() => setDelSt(false)}
        >
         店铺成功淘汰.
    </Alert>
        <Modal show={showSt} onHide={handleCloseSt}>
          <Form
            id="createFormSt"
            className="needs-validation createForm"
            noValidate
            validated={validatedSt}
          >
            <Modal.Header closeButton>
              <Modal.Title>创建店铺</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="md-form mb-5">
                <i className="fas fa-user prefix grey-text"></i>
                <label data-error="wrong" data-success="right">
                身份证：
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
                姓名：
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
                地址：
            </label>
                <Form.Control
                  type="text"
                  id="formStDireccion"
                  className="form-control validate"
                  required
                />
                <br></br>
                <Form.Control.Feedback type="invalid">
                请填写所有需要修改的内容.
                    </Form.Control.Feedback>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                onClick={handleCloseSt}
                type="button"
              >
                关闭
          </button>
              <button
                className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                type="button"
                onClick={handleSubmitSt}
              >
                保存更改
          </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={showStDl} onHide={handleCloseStDl}>
          <Modal.Header closeButton>
            <Modal.Title>删除商店</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="md-form mb-5">
              <i className="fas fa-envelope prefix grey-text"></i>
              你确定要删除这家店吗？
        </div>
          </Modal.Body>
          <Modal.Footer>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              onClick={handleCloseStDl}
            >
              关闭
        </a>
            <a
              className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
              onClick={handleDeleteSt}
            >
              删除商店
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


  else {
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
