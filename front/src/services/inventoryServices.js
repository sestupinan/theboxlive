import axios from "axios";
export async function getInventory() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get("/api/almacenes/productos/2", config);
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}
export async function postProduct(data) {
  await axios.put("/api/almacenes/producto/2", data);
}

export async function deleProduct(data) {
  await axios.delete("/api/delproducto/2/" + data);
}
export async function editProduct(data) {
  await axios.put("/api/delproducto/" + data);
}
