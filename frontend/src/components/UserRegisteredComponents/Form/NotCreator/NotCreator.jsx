import { useState } from "react"

const NotCreator = (creador) => {
  const [loading, setLoading] = useState(true)

  if (creador && loading) {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }

  return (<>
    {
      !loading
        ? <h1 className="titleForm">USTED NO ES EL CREADOR DE ESTE LIBRO</h1>
        : null
    }
  </>)
}

export default NotCreator
