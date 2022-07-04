import clienteAxios from "../../config/clienteAxios";
import { GET_USUARIOS, GET_ORDERS, GET_REVIEW, DELETE_USER, ADMIN_AN_USER } from "../utils/constants";

export function getAllUsers() {
    return async function (dispatch) {
        const json = await clienteAxios.get(`/usuarios/traer-usuarios`);
        //console.log(json.data)
        return dispatch({
            type: GET_USUARIOS,
            payload: json.data,
        })
    }
}

export function getAllOrders() {
    return async function (dispatch) {
        const json = await clienteAxios.get(`/usuarios/traer-orders`);
        //console.log(json.data)
        return dispatch({
            type: GET_ORDERS,
            payload: json.data,
        })
    }
}

export function getAllReviews() {
    return async function (dispatch) {
        const json = await clienteAxios.get(`/review`);
        return dispatch({
            type: GET_REVIEW,
            payload: json.data,
        })
    }
}

export function deleteUser(payload){
    // const id = localStorage.getItem("token");
    // const config = {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${id}`,
    //     },
    // }
    console.log("desde las actions", payload)
    return async function (dispatch) {
        const json = await clienteAxios.delete(`/usuarios/delete/${payload}`)
        console.log("veamos el json",json)
        return dispatch({
            type: DELETE_USER,
            payload: json.data
        })
    }
}

export function adminAnUser (payload){
    const id = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${id}`,
            },
        }
    return async function (dispatch){
        const json = await clienteAxios.put("/usuarios/update", payload, config)
        return dispatch({
            type: ADMIN_AN_USER,
            payload: json.data
        })
    }
}