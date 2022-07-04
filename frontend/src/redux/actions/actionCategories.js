import clienteAxios from '../../config/clienteAxios'
import { GET_CATEGORIES, FILTER_BY_CATEGORY } from '../utils/constants'

export function getCategories() {
  return async (dispatch) => {
    try {
      const categories = await clienteAxios.get(`/categories`)
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByCategory(filter) {
  return async (dispatch) => {
    try {
      let categories = await clienteAxios.get(`/books?category=${filter}`)
      return dispatch({
        type: FILTER_BY_CATEGORY,
        payload: categories.data
      })
    } catch (error) {
      console.log(error)
    }      
  }
}
