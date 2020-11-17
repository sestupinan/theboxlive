import axios from "axios";
export async function getUsers() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get("/api/users", config);
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postEmployee(data) {
  let response = await axios.post("/api/users", data);
  return response.status;
}

export async function deleteEmployee(data) {
  let response = await axios.delete("/api/users/" + data);
  return response.status;
}

export async function getTiendas() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get("/api/almacenes", config);
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postTienda(data) {
  let response = await axios.post("/api/almacenes", data);
  return response.status;
}

export async function deleteTienda(data) {
  let response = await axios.delete("/api/almacenes/" + data);
  return response.status;
}
