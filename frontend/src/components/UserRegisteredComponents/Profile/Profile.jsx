import React, { useState } from 'react';
import NavBar from '../../CommonComponents/NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import profile from '../../../assets/images/avatar.png';
import ProfileImage from './ProfileImage';
import ProfilePassword from './ProfilePassword';
import Footer from '../../CommonComponents/Footer/Footer';
import ProfileChangeName from './ProfileChangeName';
import swal from 'sweetalert';
import { borrarUsuario } from '../../../redux/actions/actionUser'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showModalNotification, setShowModalNotification] = useState(false)
  const [showModalP, setShowModalP] = useState(false)
  const [showModalNotificationP, setShowModalNotificationP] = useState(false)
  const [showModalN, setShowModalN] = useState(false)
  const [showModalNotificationN, setShowModalNotificationN] = useState(false)
  const user = useSelector(state => state.usuarioActual)
  const idUser = user._id

  const customStyls = {
    overlay: {
      backgroundColor: "rgba(11,12,41,0.48)",
    },
  }

  function handleButtonImage() {
    setShowModal(true)
  }
  function closeModalImage() {
    showModalNotification && setShowModalNotification(false)
    showModal && setShowModal(false)
  }
  function handleButtonPassword() {
    setShowModalP(true)
  }
  function closeModalPassword() {
    showModalNotificationP && setShowModalNotificationP(false)
    showModalP && setShowModalP(false)
  }
  function handleOnClickBooks() {
    navigate(`/bookCreated/${idUser}`)
  }
  function handleOnClickOrders() {
    navigate(`/historyOrders/${idUser}`)
  }
  function handleOnClickQuestions() {
    navigate(`/questions/${idUser}`)
  }
  function handleButtonNombre() {
    setShowModalN(true)
  }
  function closeModalNombre() {
    showModalNotificationN && setShowModalNotificationN(false)
    showModalN && setShowModalN(false)
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm("¿Estás seguro que quieres eliminar este usuario? Si lo eliminas, no podrás deshacer esta acción.") ===
      true
    ) {
      dispatch(borrarUsuario({ id: idUser }));
      swal("Usuario eliminado correctamente.", "success");
      window.location.reload();
      localStorage.removeItem('token')
    }
  };

  return (
    <div>
      <NavBar />
      <div className="todoProfile">
        <div className="containerPerfil">
          <img className="imgProfile" src={user?.image?.url ? user?.image?.url : profile} alt='Imagen de usuario' />
          <h1 className="h1Profile">{user.nombre}</h1>
          <p>{user?.email}</p>
          <div className="btnProfile"><button onClick={handleButtonImage}>CAMBIAR IMAGEN</button></div>
          <div className="btnProfile"><button onClick={handleButtonPassword}>CAMBIAR CONTRASEÑA</button></div>
          <div className="btnProfile"><button onClick={handleButtonNombre}>CAMBIAR NOMBRE</button></div>
          <div className="btnProfile"><button onClick={handleDelete}>ELIMINAR CUENTA</button></div>
        </div>
        <br />
        <div className="containerPerfil">
          <div onClick={() => handleOnClickBooks()}>
            <Link to='/'>
              <p className="pruebaPerfil">MIS LIBROS</p>
            </Link>
          </div>
          <div onClick={() => (handleOnClickOrders())}>
            <Link to='/'>
              <p className="pruebaPerfil">MIS COMPRAS</p>
            </Link>
          </div>
          <div onClick={() => (handleOnClickQuestions())}>
            <Link to='/'>
              <p className="pruebaPerfil">PREGUNTAS Y RESPUESTAS</p>
            </Link>
          </div>
        </div>
        <Modal isOpen={showModal} style={customStyls} ariaHideApp={false} className="probandoProfile">
          <ProfileImage
            closeModalImage={closeModalImage}
          />
        </Modal>
        <Modal isOpen={showModalP} style={customStyls} ariaHideApp={false} className="probandoProfile">
          <ProfilePassword
            closeModalPassword={closeModalPassword}
          />
        </Modal>
        <Modal style={customStyls} isOpen={showModalN} ariaHideApp={false} className="probandoProfile">
          <ProfileChangeName
            closeModalNombre={closeModalNombre}
            idUser={idUser}
          />
        </Modal>
      </div>
      <Footer />
    </div>
  )
}

export default Profile





