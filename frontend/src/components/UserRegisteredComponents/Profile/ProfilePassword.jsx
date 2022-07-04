import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  setToResetPassword,
  setStateEmail,
} from "../../../redux/actions/actionUser"
import swal from 'sweetalert';
import validarEmail from "../../../middleware/validarEmail"

export default function ProfilePassword({closeModalPassword}) {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const respuesta = useSelector((state) => state.errorEmail)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setStateEmail())
    }
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (validarEmail(e.target.value)) {
      e.target.value.length > 40
        ? setErrors({
            email: "Longitud inválida",
          })
        : setErrors({
            email: "E-mail inválido",
          })
    } else {
      setErrors({
        email: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === "") {
      setErrors({
        email: "Campo requerido",
      })
    } else {
      dispatch(setToResetPassword(email))
      setEmail("")
    }
    
    swal("", "Te enviamos al correo las instruciones para el cambio de contraseña", "success");
    window.location.reload()
  }

  return (
    <div className="containerGeneral">
      <div className="containerImagen">
      <button onClick={closeModalPassword}  >X</button>
        <div>
          <p>Ingresa tu e-mail para cambiar tu password</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">e-mail</label>
            <input
             className="inputName"
              name="email"
              value={email}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="Reset email"
            />
            {errors?.email && (
              <div>
                <p >{errors.email}</p>
              </div>
            )}
            {respuesta?.msg ? (
              <Link to="/">
                {" "}
                <button type="submit" >
                  HOME
                </button>{" "}
              </Link>
            ) : (
              <button className="buttonPsw" type="submit">
                RESETTEAR PASSWORD
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
