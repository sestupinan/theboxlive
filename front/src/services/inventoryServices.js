import axios from "axios";
export async function getInventory() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get(
      "http://localhost:3001/api/almacenes/productos/2",
      config
    );
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}
export async function postProduct(data) {
  await axios.put("http://localhost:3001/api/almacenes/producto/2", data);
}

export async function deleProduct(data) {
  await axios.delete("http://localhost:3001/api/delproducto/2/" + data);
}
export async function editProduct(data) {
  await axios.put("http://localhost:3001/api/delproducto/" + data);
}
