import axios from "axios";
export async function getTransactions() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get("/api/historiales", config);
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}


export async function postTransaction(data) {
  await axios.put("/api/almacenes/modificar/2", data);
  //.then(response => this.setState({ articleId: response.data.id }));
}

export async function postStolenTransaction(data) {
  await axios.put("/api/almacenes/stolen/2", data);
}
