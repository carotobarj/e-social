import clienteAxios from "../../config/clienteAxios.jsx"
import { toast } from "react-toastify"
import { TEMP_STATE } from "../utils/constants.js"

export function subirFotos(payload) {
  return async function (dispatch) {
    const id = localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    }

    try {
      const body = {
        image: payload,
      }
      
      const form = new FormData()
      for (let key in body) {
        form.append(key, body[key])
      }
      
      const json = await clienteAxios.post(`/books/images`, body, config)
      toast.success(json)
      const response = json.data
      
      return dispatch({
        type: TEMP_STATE,
        payload: response
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }
}
