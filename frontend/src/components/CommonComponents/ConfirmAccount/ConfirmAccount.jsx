import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { validateUser } from "../../../redux/actions/actionUser.js"

export default function ConfirmarCuenta() {
  const dispatch = useDispatch()
  const respuesta = useSelector((state) => state.confirmacion)
  const params = useParams()
  const { id } = params
  

  useEffect(() => {
    dispatch(validateUser(id))
  }, [])

  return (
    <div className="contConfirm">
      <h2 className="titleConfirm">
        ¡Bienvenido a <span>E-Social</span>!
        <br/>
      </h2>
      <div className="response">{respuesta.msg}</div>
      <br/>
      <Link to="/">
        <button className="btnConfirm">Volver a HOME</button>
      </Link>
    </div>
  )
}