import axios from "axios";
export async function getAlmacen() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get(
      "/api/almacenes/2",
      config
    );
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}
