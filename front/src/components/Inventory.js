import React, { useState, useEffect } from "react";
import "../css/inventory.css";
import {
  getInventory,
  postProduct,
  deleProduct,
} from "../services/inventoryServices";
import Modal from "react-bootstrap/Modal";
//import { MdMoreHoriz } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ReactLoading from "react-loading";
import MUIDataTable from "mui-datatables";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

/*
async function createProduct() {
  let newProduct = new Object();
  newProduct.nit = parseInt(document.getElementById("formNit").value);
  newProduct.nombre = document.getElementById("formNombre").value;
  newProduct.cantidad = document.getElementById("formCantidad").value;
  newProduct.Precio = document.getElementById("formPrecio").value;
  console.log(newProduct);
  await postProduct(newProduct);
  console.log(productData);
}

async function delProduct() {
  let id = parseInt(document.getElementById("formDel").value);
  console.log(id);
  await deleteProduct(id);
  console.log(productData);
}

*/
const loadingData = [
  {
    cantidad: "Loading",
    img: "Loading",
    nit: "Loading",
    nombre: "Loading",
    precio: "Loading",
  },
];

function Inventory() {
  const [productData, setProductData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [nit, setNit] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  

  const cols = [
    {
      name: "nit",
      label: "NIT",
      options: {
        filter: true,
      },
    },
    {
      label: "Name",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label: "Quantity",
      name: "cantidad",
      options: {
        filter: true,
      },
    },
    {
      label: "Price",
      name: "precio",
      options: {
        filter: true,
      },
    },
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              type="button"
              className="btn action btn-secondary"
              aria-label="Delete button"
              onClick={() => {
                setNit(tableMeta.rowData[0]);
                setShowRemoveModal(true);
              }}
            >
              <FaTrash size="20px" />
            </button>
          );
        },
      },
    },
  ];


  const cols1 = [
    {
      name: "nit",
      label: "NIT",
      options: {
        filter: true,
      },
    },
    {
      label: "Nombre",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label: "Cantidad",
      name: "cantidad",
      options: {
        filter: true,
      },
    },
    {
      label: "Precio",
      name: "precio",
      options: {
        filter: true,
      },
    },
    {
      name: "Eliminar",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              type="button"
              className="btn action btn-secondary"
              aria-label="Delete button"
              onClick={() => {
                setNit(tableMeta.rowData[0]);
                setShowRemoveModal(true);
              }}
            >
              <FaTrash size="20px" />
            </button>
          );
        },
      },
    },
  ];
  const cols3 = [
    {
      name: "硝",
      label: "NIT",
      options: {
        filter: true,
      },
    },
    {
      label: "名称",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label: "数量",
      name: "cantidad",
      options: {
        filter: true,
      },
    },
    {
      label: "价格",
      name: "precio",
      options: {
        filter: true,
      },
    },
    {
      name: "删除",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              type="button"
              className="btn action btn-secondary"
              aria-label="Delete button"
              onClick={() => {
                setNit(tableMeta.rowData[0]);
                setShowRemoveModal(true);
              }}
            >
              <FaTrash size="20px" />
            </button>
          );
        },
      },
    },
  ];



  useEffect(() => {
    console.log(navigator.language);
    if (!navigator.onLine) {
      if (localStorage.getItem("products") === null) {
        setProductData("Loading...");
      } else {
        setProductData(JSON.parse(localStorage.getItem("products")));
      }
    } else {
      getInventory().then((resp) => {
        setProductData(resp);
        refreshErr();
        localStorage.setItem("products", JSON.stringify(resp));
      });
      refreshErr();
    }

  }, []);

  async function addProduct() {
    const body = {
      nit: nit,
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
    };
    await postProduct(body);
    setShowCreateModal(false);
    let resp = await getInventory();
    setProductData(resp);
    refreshErr();
  }
  async function deleteProduct(id) {
    await deleProduct(id);
    setShowRemoveModal(false);
    let resp = getInventory();
    setProductData(resp);
    refreshErr();
  }
  /* async function editProduct(){
    const body={
      "nit": nit,
      "nombre": nombre,
      "cantidad": cantidad,
      "precio": precio
    }
    console.log(body)
    postProduct(body)
    setShowEditModal(false)
    let resp= await getInventory();
    setProductData(resp);
  } */
  if (!navigator.language.startsWith("en")) {
    if (navigator.language.startsWith("es")) {
      return (
        <div>
          <section className="container-fluid sect">
            <div className="row justify-content-end">
              <div className="col-6 pr-2 pt-2">
                <h1 className="titleInventory">Inventario</h1>
              </div>
              <div className="col-auto pr-2 pt-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#addProductModal"
                  onClick={() => setShowCreateModal(true)}
                >
                  Añadir Producto
            </button>
              </div>
            </div>

            <div className="row">
              <div className="col p-2">

                <MUIDataTable
                  title={"Inventario"}
                  data={productData.length > 0 ? productData : loadingData}
                  columns={cols1}
                />

              </div>
            </div>
          </section>
          <div>
            <Modal show={showCreateModal}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProductModalLabel">
                    Añadir Producto
              </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlfor="inputName">NIT</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        onChange={(e) => setNit(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputType">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputType"
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputQuantity">Cantidad</label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputQuantity"
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputPrice">Precio</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPrice"
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
              </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => addProduct()}
                  >
                    Añadir Producto
              </button>
                </div>
              </div>
            </Modal>
            <Modal show={showEditModal}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editProductModalLabel">
                      Modificar Producto
                </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlfor="inputName">Nit</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputType">Nombre</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputQuantity">Cantidad</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputPrice">Precio</label>
                        <input type="text" className="form-control" />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cerrar
                </button>
                    <button type="button" className="btn btn-primary">
                      Guardad Cambios
                </button>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal show={showRemoveModal}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteProductLabel">
                  Eliminar Producto
              </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowRemoveModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Esta seguro que desea eliminar el producto?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowRemoveModal(false)}
                  >
                    Cerrar
              </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteProduct(nit)}
                  >
                    Eliminar Producto
              </button>
                </div>
              </div>
            </Modal>
          </div>
          {refreshErr()}
        </div>
      );
    }
  }
  if (!navigator.language.startsWith("en")) {
    if (navigator.language.startsWith("zh")) {
      return (
        <div>
          <section className="container-fluid sect">
            <div className="row justify-content-end">
              <div className="col-6 pr-2 pt-2">
                <h1 className="titleInventory">库存</h1>
              </div>
              <div className="col-auto pr-2 pt-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#addProductModal"
                  onClick={() => setShowCreateModal(true)}
                >
                  添加产品
            </button>
              </div>
            </div>

            <div className="row">
              <div className="col p-2">

                <MUIDataTable
                  title={"Inventario"}
                  data={productData.length > 0 ? productData : loadingData}
                  columns={cols3}
                />

              </div>
            </div>
          </section>
          <div>
            <Modal show={showCreateModal}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProductModalLabel">
                  添加产品
              </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlfor="inputName">硝</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        onChange={(e) => setNit(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputType">名称</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputType"
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputQuantity">数量</label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputQuantity"
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputPrice">价格</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPrice"
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowCreateModal(false)}
                  >
                     取消
              </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => addProduct()}
                  >
                    添加产品
              </button>
                </div>
              </div>
            </Modal>
            <Modal show={showEditModal}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editProductModalLabel">
                    修改产品
                </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlfor="inputName">硝</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputType"> 名称</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputQuantity">数量</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlfor="inputPrice">价格</label>
                        <input type="text" className="form-control" />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setShowEditModal(false)}
                    >
                      关闭
                </button>
                    <button type="button" className="btn btn-primary">
                    保存更改
                </button>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal show={showRemoveModal}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteProductLabel">
                  移除产品
              </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowRemoveModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>你确定要删除该产品吗？</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowRemoveModal(false)}
                  >
                    关闭
              </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteProduct(nit)}
                  >
                    移除产品
              </button>
                </div>
              </div>
            </Modal>
          </div>
          {refreshErr()}
        </div>
      );
    }
  }
  else{
    return (
      <div>
        <section className="container-fluid sect">
          <div className="row justify-content-end">
            <div className="col-6 pr-2 pt-2">
              <h1 className="titleInventory">Inventory</h1>
            </div>
            <div className="col-auto pr-2 pt-2">
              <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#addProductModal"
                onClick={() => setShowCreateModal(true)}
              >
                Add Product
          </button>
            </div>
          </div>

          <div className="row">
            <div className="col p-2">

              <MUIDataTable
                title={"Inventory"}
                data={productData.length > 0 ? productData : loadingData}
                columns={cols}
              />

            </div>
          </div>
        </section>
        <div>
          <Modal show={showCreateModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProductModalLabel">
                  Add Product
            </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowCreateModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlfor="inputName">NIT</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      onChange={(e) => setNit(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlfor="inputType">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputType"
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlfor="inputQuantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputQuantity"
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlfor="inputPrice">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrice"
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
            </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => addProduct()}
                >
                  Add Product
            </button>
              </div>
            </div>
          </Modal>
          <Modal show={showEditModal}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editProductModalLabel">
                    Edit Product
              </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlfor="inputName">Nit</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputType">Nombre</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputQuantity">Cantidad</label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlfor="inputPrice">Precio</label>
                      <input type="text" className="form-control" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
              </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
              </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal show={showRemoveModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteProductLabel">
                  Delete Product
            </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowRemoveModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove the product?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowRemoveModal(false)}
                >
                  Close
            </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => deleteProduct(nit)}
                >
                  Delete product
            </button>
              </div>
            </div>
          </Modal>
        </div>
        {refreshErr()}
      </div>
    );
  }
}

function itemInventory(
  product,
  index,
  setShowRemoveModal,
  setShowEditModal,
  setNit
) {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{product.nit}</td>
      <td>{product.nombre}</td>
      <td>{product.cantidad}</td>
      <td>{product.precio}</td>
      <td>
        <div
          className="btn-group mr-2 actions"
          role="group"
          aria-label="First group"
        >
          <button
            type="button"
            className="btn action btn-secondary"
            onClick={() => {
              setNit(product.nit);
              setShowRemoveModal(true);
            }}
          >
            <FaTrash size="20px" />
          </button>
        </div>
      </td>
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
  console.log("entre");
}

export default Inventory;
