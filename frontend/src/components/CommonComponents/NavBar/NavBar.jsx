import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom"
import { usuarioActual } from "../../../redux/actions/actionUser"
import { useDispatch, useSelector } from "react-redux"
import logo from "../../../assets/images/logo.png"
import profile from "../../../assets/images/avatar2.png"
import io from "socket.io-client"
let socket
import ProfileSettings from "../../UserRegisteredComponents/ProfileSettings/ProfileSettings"
import SearchBar from "../SearchBar/SearchBar"
import FilterCategories from "../FilterCategories/FilterCategories"
import Sorter from "../Sorter/Sorter"

const customStyls = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
}

export default function NavBar() {
  const dispatch = useDispatch()
  const params = window.location.href
  const usuarioAct = useSelector((state) => state.usuarioActual)
  const [showModal, setShowModal] = useState(false)
  const [showModalNotification, setShowModalNotification] = useState(false)

  const token = localStorage.getItem("token")

  useEffect(() => {
    token
      ? (dispatch(usuarioActual())
        , socket = io(import.meta.env.VITE_BACKEND_URL)
        , socket.emit("Actualizar", params))
      : null
  }, [])

  function handleButton() {
    setShowModal(true)
  }
  function closeModal() {
    showModalNotification && setShowModalNotification(false)
    showModal && setShowModal(false)
  }
  return (
    <div className="fullnav">
      <div className="contentNav" onClick={closeModal}>
      <Link to="/">
        <img className="logo " src={logo} alt="Logo Perfil" />
      </Link>
      <div className="flex-sea">
        <SearchBar className="flez"/>
        <FilterCategories/>
        <Sorter/>
      </div>
        {/* {token ? (<Link to="/create" className="link">VENDER</Link>) : null}
        <Link to="/about" className="link">ABOUT</Link>*/}
        <div className="perfil">
          {token ? <p className="nameUser">{`¡Hola ${usuarioAct?.nombre}!`}</p> : null}
          {usuarioAct.length !== 0 ? (
            <div className="image-click">
              <img
                src={usuarioAct.image.url ? usuarioAct?.image.url : profile}
                alt="Perfil de usuario"
                onClick={handleButton}
              />
            </div>
          ) : (<Link to="/homeout" className="link">REGISTRO / LOGIN</Link>)}
          <Modal style={customStyls} ariaHideApp={false} isOpen={showModal} className="customStyles">
            <ProfileSettings />
          </Modal>
        </div>
      </div>
    </div>
  )
}
