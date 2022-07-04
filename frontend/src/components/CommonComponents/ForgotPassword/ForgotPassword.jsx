import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setToResetPassword, setStateEmail } from "../../../redux/actions/actionUser"
import validarEmail from "../../../middleware/validarEmail"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const respuesta = useSelector((state) => state.email)

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
          email: "Email inválido",
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
  }

  return (
    <div className="contForgotPass">
      <div>
        <div>
          <h3 className="titleForgot">Ingrese su correo electrónico para recuperar su contraseña</h3>

          <form className="formForgot" onSubmit={handleSubmit}>
            <label className="labelForgot" htmlFor="email">e-mail</label>
            <input className="inputForgot"
              name="email"
              value={email}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="Reset email"
            />
            {errors.email && (
              <div>
                <p>{errors.email}</p>
              </div>
            )}
            {respuesta.msg ? (
              <Link to="/">
                {" "}
                <button  type="submitForgot">VOLVER</button>{" "}
              </Link>
            ) : (
              <button  className="btnForgot" type="submit">Resettear password</button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
