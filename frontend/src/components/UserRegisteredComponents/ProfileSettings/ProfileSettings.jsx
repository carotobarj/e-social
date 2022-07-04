import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import IconsLogout from "../../../Iconos/IconsLogout"
import Perfil from "../../../Iconos/Perfil"
import Admin from "../../../Iconos/Admin"
import Chat from "../../../Iconos/Chat"
import Sales from "../../../Iconos/Sales"
import { isAdmin } from "../../../redux/actions/actionIsAdmin.js"

export default function ProfileSettings() {
  const [dispatch, navigate] = [useDispatch(), useNavigate()]
  const token = localStorage.getItem("token")
  const adm = useSelector(state => state.isAdmin)

  if (!token) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(isAdmin())
  }, [])

  function logOut() {
    window.localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div className="profileModal">

      <div className="divModalPerfil">
        <Link to="/create" >
          <Sales />
          <h3>Vender</h3>
        </Link>
      </div>

      <div className="divModalPerfil" >
        <Link to="/chat" >
          <Chat />
          <h3>Chat</h3>
        </Link>
      </div>

      <div className="divModalPerfil">
        <Link to="/profile" >
          <Perfil />
          <h3>Perfil</h3>
        </Link>
      </div>

      {adm ? (<>
        <div className="divModalPerfil">
          <Link to="/admin">
            <Admin />
            <h3>Admin</h3>
          </Link>
        </div>
      </>) : null}

      <div className="divModalPerfil" onClick={() => logOut()}>
        <Link to="/">
          <IconsLogout />
          <h3>Logout</h3>
        </Link>
      </div>

    </div>
  )
}
