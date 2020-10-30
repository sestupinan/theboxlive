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
  await axios.post("/api/users", data);
  //.then(response => this.setState({ articleId: response.data.id }));
}

export async function deleteEmployee(data) {
  await axios.delete("/api/users/" + data);
  //.then(response => this.setState({ articleId: response.data.id }));
}

export async function getTiendas() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get(
      "/api/almacenes",
      config
    );
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postTienda(data) {
  await axios.post("/api/almacenes", data);
  //.then(response => this.setState({ articleId: response.data.id }));
}

export async function deleteTienda(data) {
  await axios.delete("/api/almacenes/" + data);
  //.then(response => this.setState({ articleId: response.data.id }));
}
