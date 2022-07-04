import clienteAxios from '../../config/clienteAxios'

export const postCreate = (payload) => {
  return async function () {
    const id = localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    }

    try {
      const postResponse = await clienteAxios.post(`/books`, payload, config)
      return postResponse

    } catch (error) {
      throw error
    }
  }
}
