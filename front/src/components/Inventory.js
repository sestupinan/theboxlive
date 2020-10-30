import React, { useState, useEffect } from "react";
import {
  getInventory,
  postProduct,
  deleProduct,
} from "../services/inventoryServices";
import Modal from "./Modal";
//import { MdMoreHoriz } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

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

function Inventory() {
  const [productData, setProductData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [nit, setNit] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  useEffect(() => {
    getInventory().then(resp => setProductData(resp));

  }, []);
  async function addProduct() {
    const body = {
      "nit": nit,
      "nombre": nombre,
      "cantidad": cantidad,
      "precio": precio
    };
    await postProduct(body);
    setShowCreateModal(false);
    let resp = await getInventory();
    setProductData(resp);
  }
  async function deleteProduct(id) {
   await deleProduct(id);
   setShowRemoveModal(false); 
    let resp =getInventory()
     setProductData(resp);
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
  return (
    <>
      <section className="container-fluid sect">
        <div className="row justify-content-end">
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="color-brand" scope="col">
                    #
                  </th>
                  <th className="color-brand" scope="col">
                    Nit
                  </th>
                  <th className="color-brand" scope="col">
                    Name
                  </th>
                  <th className="color-brand" scope="col">
                    Quantity
                  </th>
                  <th className="color-brand" scope="col">
                    Price
                  </th>
                  <th className="color-brand" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody id="bodyTable">
                {productData.length > 0
                  ? productData.map((product, index) =>
                      itemInventory(
                        product,
                        index,
                        setShowRemoveModal,
                        setShowEditModal,
                        setNit
                      )
                    )
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal show={showCreateModal}>
        <div className="modal-dialog" role="document">
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
                  <label htmlfor="inputName">Nit</label>
                  <input type="text" className="form-control" id="inputName" onChange={(e) => setNit(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlfor="inputType">Name</label>
                  <input type="text" className="form-control" id="inputType" onChange={(e) => setNombre(e.target.value)} />
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
                  <label htmlfor="inputPrice">Precio</label>
                  <input type="text" className="form-control" id="inputPrice" onChange={(e) => setPrecio(e.target.value)} />
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
              <button type="button" className="btn btn-warning" onClick={() => addProduct()}>
                Add Product
                    </button>
            </div>
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
            <button type="button" className="btn btn-primary" onClick={() => deleteProduct(nit)}>
              Delete product
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
function itemInventory(product, index, setShowRemoveModal, setShowEditModal, setNit) {

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{product.nit}</td>
      <td>{product.nombre}</td>
      <td>{product.cantidad}</td>
      <td>{product.precio}</td>
      <td>
        <div className="btn-group mr-2 actions" role="group" aria-label="First group">
          <button type="button" className="btn action btn-secondary" onClick={() => {
            setNit(product.nit);
            setShowRemoveModal(true);
          }}><FaTrash size="20px" /></button>
        </div>
      </td>
    </tr>
  );
}

export default Inventory;
