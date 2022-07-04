import clienteAxios from "../../config/clienteAxios"
import { IS_ADMIN } from "../utils/constants"

export function isAdmin() {
  return async function (dispatch) {
    const id = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };
    const response = await clienteAxios.get('/usuarios/list', config) // chequear URL!
    console.log('🚀 — file: actionIsAdmin.js — line 7 — response', response)
    const data = response.data

    console.log('🚀 — file: actionIsAdmin.js — line 7 — isAdmin — data', data) // true or false

    return dispatch({
      type: IS_ADMIN,
      payload: data
    })
  }
}
