import clienteAxios from "../../config/clienteAxios";

export function usuarioCreated(payload) {
  return async function (dispatch) {
    const id = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };
    try {
      const json = await clienteAxios.get(`/usuarioCreador/${payload}`, config);
      console.log(json.data)
      return dispatch({
        type: "USUARIO_CREATED",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function usuarioProfile(payload) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get(`/usuarioCreador/user/${payload}`);
      console.log(json.data)
      return dispatch({
        type: "USUARIO_INFO_PROFILE",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}