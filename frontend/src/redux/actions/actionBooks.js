import clienteAxios from "../../config/clienteAxios"
import { CLEAN_DATA, GET_BOOKS, PUT_BOOK_BODY, SEARCH_BY_NAME } from "../utils/constants"

export function getBooks() {
  return async function (dispatch) {
    const resGet = await clienteAxios.get(`/books`)
    return dispatch({
      type: GET_BOOKS,
      payload: resGet.data,
    })
  }
}

export function searchByName(name) {
  return async function (dispatch) {
    try {
      const resSearch = await clienteAxios.get(`/books?name=${name}`)
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: resSearch.data
      })
    } catch (error) {
      dispatch({
        type: SEARCH_BY_NAME,
        payload: [],
      })
    }
  }
}


export function cleanData() {
  return function (dispatch) {
    dispatch({
      type: CLEAN_DATA,
      payload: {},
    })
  }
}

export const deleteBook = (payload) => {
  return async function () {
    const id = localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    }
    
    try {
      const resDelete = await clienteAxios.delete(`/books/${payload}`, config)
      return resDelete
    } catch (error) {
      throw error
    }
  }
}

export const putBookBody = (payload) => {
  return async function (dispatch) {
    const id = localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    }
    try {
      const resUpdate = await clienteAxios.put(`/books/${payload._id}`, payload, config)
      dispatch({
        type: PUT_BOOK_BODY,
        payload: resUpdate.data,
      })
      return resUpdate.data
    } catch (error) {
      throw error
    }
  }
}
