import clienteAxios from '../../config/clienteAxios.jsx';

export const detailsBook = (id) => {
  return async function (dispatch) {
    try {
      if (id?.length === 24) {
        const json = await clienteAxios.get(`/books/${id}`)
        return dispatch({
          type: "GET_DETAIL",
          payload: json.data
        })
      } else {
        return dispatch({
          type: "GET_DETAIL",
          payload: { msgError: "¡ID incorrecto!" }
        })
      }

    } catch (error) {
      console.log("ABER SI VIENE POR ACÁ LA COSA", error)
    }
  };
};
