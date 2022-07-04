import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    login,
    resetErrorLoginUser,
    registroGoogle
} from "../../../redux/actions/actionUser"
import { useNavigate } from "react-router"
import validarEmail from "../../../middleware/validarEmail"
import validatePassword from "../../../middleware/validarPassword"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const errorEmail = useSelector((state) => state.errorEmail)
    const [state, setEstate] = useState(false)
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const handleToggle = () => {
        setEstate(prevState => !prevState)
    }


    function handleChangeEmail(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
        setErrors({
            ...errors,
            email: "",
        })
    }

    const handleChangePassword = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
        setErrors({
            ...errors,
            password: "",
        })
    }
    function validate(email, password) {
        let objeto = {}
        if (email === "") objeto = { ...objeto, email: "Campo requerido" }
        else if (validarEmail(email))
            email.length > 40
                ? (objeto = { ...objeto, email: "Longitud inválida" })
                : (objeto = { ...objeto, email: "Formato inválido" })

        if (password === "")
            objeto = { ...objeto, password: "Campo requerido" }
        else if (validatePassword(password))
            objeto = {
                ...objeto,
                password: "Su password debe tener al menos 8 caracteres",
            }
        return objeto
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let val = validate(usuario.email, usuario.password)
        if (Object.keys(val).length === 0) {
            const loginData = await dispatch(login(usuario))
            console.log(loginData.payload)
            setUsuario({
                email: "",
                password: "",
            })

            if (errorEmail) {
                e.preventDefault()

            } else {
                dispatch(resetErrorLoginUser())
                loginData.payload.token ? navigate("/") : null
            }
        } else setErrors(val)
    }

    function responseGoogle(el) {
        dispatch(registroGoogle(el))

        setTimeout(function () {
            window.location.reload(1)
        }, 1500) // After 2,5 secs
    }

    return (
        <>
            <form className="formLoginRegister" onSubmit={handleSubmit}>
                <h1>Ingresar</h1>
                <div>
                    <input
                        className="inputLoginRegister"
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        value={usuario.email} />
                    {errors.email && (
                        <div>
                            <p>{errors.email}</p>
                        </div>
                    )}
                </div>
                <div>
                    <input
                        className="inputLoginRegister"
                        id="password"
                        name="password"
                        onChange={handleChangePassword}
                        value={usuario.password}
                        type={state ? "text" : "password"}
                        placeholder="Contraseña" />
                    {errors.password && (
                        <div>
                            <p>{errors.password}</p>
                        </div>
                    )}

                    <span className='eye' onClick={handleToggle}>{state ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                </div>
                {errorEmail && !usuario.email && !usuario.password ? (
                    <p>{errorEmail} </p>
                ) : null}
                <Link to="/olvide-password/" >
                    <a>Olvido su contraseña?</a>
                </Link>
                <button className="btnLoginRegister">Ingresar</button>
                <div class="padBoton">

                    <GoogleOAuthProvider class="btnLoginRegister" clientId={`${import.meta.env.VITE_URL_CLIENT_ID}`} >
                        <GoogleLogin login_uri="" onSuccess={responseGoogle} />
                    </GoogleOAuthProvider>
                </div>
            </form>
        </>

    )
}