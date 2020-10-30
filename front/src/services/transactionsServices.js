import axios from "axios";
export async function getTransactions() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  try {
    let respuesta = await axios.get(
      "http://localhost:3001/api/historiales",
      config
    );
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}
