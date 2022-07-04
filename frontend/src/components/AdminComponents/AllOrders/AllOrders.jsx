import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from '../../CommonComponents/NavBar/NavBar'
import { getAllOrders } from '../../../redux/actions/actionAdmin'
import book from '../../../assets/images/book.svg'
import s from './AllOrders.module.css'

function AllOrders() {
  const dispatch = useDispatch()
  const allOrders = useSelector(state => state.allOrders)
  
  useEffect(() => {
    dispatch(getAllOrders())
  }, [])
  return (

    <div>
      <NavBar />
      <div className={s.container}>
      <Link to="/Admin">
                    <button className={s.btnAtras}>Atrás</button>
                  </Link>
        <div className={s.flex}>
          
          <table className={s.listado}>
          
            <thead>
              <tr className={s.titulos}>
                <th className={s.no}>ID</th>
                <th className={s.no}>LIBRO</th>
                <th className={s.no}>IMAGEN</th>
                <th className={s.no}>PRECIO</th>
                <th className={s.no}>COMPRADOR</th>
                <th className={s.no}>E-MAIL COMPRADOR</th>
                <th className={s.no}>FECHA</th>
              </tr>
            </thead>

            <tbody>
              {allOrders?.map((u, i) => {
                return (
                  <tr
                    key={i}
                    className={s.containerInfo}
                  >
                    <td className={s.id}>{u._id}</td>
                    <td className={s.name}>{u.books?.nombre}</td>
                    <td className={s.image}><img className={s.foto} src={u.books?.image || book} alt="No disponible" height={50} width={50} /></td>
                    <td className={s.price}>{u.books?.price}</td>
                    <td className={s.blocked}>{u.comprador?.nombre}</td>
                    <td className={s.moderator}>{u.comprador?.email}</td>
                    <td className={s.moderator}>{u.comprador?.updatedAt}</td>
                  </tr>
                )
              })}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  )
}

export default AllOrders
