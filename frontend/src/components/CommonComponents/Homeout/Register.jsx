import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { registroUsuario } from "../../../redux/actions/actionUser"
import { useNavigate } from "react-router"
import validarEmail from "../../../middleware/validarEmail"
import validatePassword from "../../../middleware/validarPassword"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import swal from 'sweetalert';

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [estado, setEstado] = useState({
    email: "",
    nombre: "",
    password1: "",
  })
  const [state, setEstate] = useState(false)

  const [errores, setErrores] = useState([])


  const handleToggle = () => {
    setEstate(prevState => !prevState)
  }

  const handleSubmitR = (e) => {
    e.preventDefault()

    if (
      !estado.email ||
      !estado.nombre ||
      !estado.password1
    )
      setErrores([0, "Hay campos vacíos"])
    else if (estado?.nombre.length < 3 || estado?.nombre.length > 10)
      setErrores([1, "El nombre de usuario debe tener entre 3 y 10 caracteres"])
    else if (validarEmail(estado?.email)) setErrores([2, "E-mail inválido"])
    else if (validatePassword(estado?.password1))
      estado?.password1.length < 8
        ? setErrores([3, "Tu password debe tener al menos 8 caracteres"])
        : setErrores([3, "Password inválido"])
    else {
      setErrores([])
      dispatch(registroUsuario(estado))
      swal("", "Eegistrado con éxito, confirma tu email!", "success");
      navigate("/")
    }
  }

  const handleChange = (e) => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <form className="formLoginRegister" onSubmit={handleSubmitR}>
        <h1>Registrarse</h1>
        <input
          className="inputLoginRegister"
          name="nombre"
          value={estado?.nombre}
          onChange={handleChange}
          id="nombre"
          type="text"
          placeholder="Tu nombre" />
        <input
          className="inputLoginRegister"
          name="email"
          value={estado?.email}
          onChange={handleChange}
          id="email"
          type="text"
          placeholder="Tu e-mail" />
        <input
          className="inputLoginRegister"
          name="password1"
          value={estado?.password1}
          onChange={handleChange}
          id="password1"
          type={state ? "text" : "password"}
          placeholder="Tu contraseña" />
        <span className='eye' onClick={handleToggle}>{state ? <FaRegEye /> : <FaRegEyeSlash />}</span>
        {errores.length !== 0 && <p>{errores[1]}</p>}
        <button className="btnLoginRegister">Registrarse</button>
      </form>
    </>
  )
}