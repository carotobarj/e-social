import React, { useEffect } from 'react'
import NavBar from '../../CommonComponents/NavBar/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAdmin } from "../../../redux/actions/actionIsAdmin"
// import RoleTest from './RoleTest'
import s from './AdminHome.module.css'

function AdminHome() {
  const dispatch = useDispatch()
  
  const adminState = useSelector(state => state.isAdmin)
  // const adminState = true
  // const adminState = false

  useEffect(() => {
    dispatch(isAdmin())
  })

  return (
    <div>
      <NavBar />
      <div className={s.container}>
        
      <div className={s.AdCont} >
        <h1 className={s.saludoAdmin}>Bienvenido Administrador</h1>
        {
          adminState
            ? <div  value={true}> {/* ¿Es Admin? Edite tranquilo, compañero */}
              <Link to="/admin/users" className={s.linked}>TODOS LOS USUARIOS</Link>
              <br/>
              <Link to="/admin/allOrders" className={s.linked}>TODOS LAS ÓRDENES DE COMPRA</Link>
              <br/>
              <Link to="/admin/allReviews" className={s.linked}>TODOS LAS OPINIONES</Link>
            </div>

            : <div value={false}> {/* MEJORAR ESTO */}
              CARGANDO . . .
            </div>
        }
      </div>
      </div>
    </div >
  )
}

export default AdminHome
