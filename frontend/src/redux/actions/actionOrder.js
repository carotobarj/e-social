import clienteAxios from "../../config/clienteAxios";
import { GET_DETALLE_ORDER } from "../utils/constants";

export const historyOrders = (payload) => {
    return async function (dispatch) {
        const id = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${id}`,
            },
        };
        try {
            const json = await clienteAxios.get(`/orders/${payload}`, config);
            return dispatch({
                type: "HISTORY_ORDER",
                payload: json.data
            })
        } catch (error) {
            throw error
        }
    };
};

export const getDetalleOrder = (id) =>{
    return async function (dispatch){
        const json = await clienteAxios.get(`/orders/detail/${id}`);
        return dispatch({
            type: GET_DETALLE_ORDER,
            payload:json.data
        })
    }
}


export const orderPost = (payload) => {
    return async function (dispatch) {
        const id = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${id}`,
            },
        };
        try {
            const json = await clienteAxios.post(`/orders`, payload, config);
            return json.data;
        } catch (error) {
            throw error
        }
    };
  };
  


  export const review = (payload)=>{
    return async function (dispatch){
        const id = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${id}`,
            },
        };
        const json = await clienteAxios.post(`/review/${payload.orden}`,payload,config)
        return dispatch({
            type:"POST_REVIEW",
            payload: json.data
        })

    }
  }

  export const getReview = (payload)=>{
    return  async function (dispatch){
        const json = await clienteAxios.get(`/review/${payload}`)
        console.log(payload)
           return dispatch({
            type:"GET_REVIEW",
            payload:json.data
        })

        
    }
  }