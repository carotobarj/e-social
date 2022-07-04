import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { historyOrders } from '../../../redux/actions/actionOrder';
import Order from './Order';
import NavBar from '../../CommonComponents/NavBar/NavBar';
import Footer from '../../CommonComponents/Footer/Footer';

export default function OrdersHistory() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const allOrders = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(historyOrders(id))
  }, [dispatch])

  return (
    <>
      <NavBar />
      <div>
        <Link to='/profile'>
          <button className="btnBook">VOLVER AL MENU</button>
        </Link>
        <h3 className="tituloOrderHistory">HISTORIAL DE COMPRAS</h3>
        <br /><br />
        <div className='contenedorGral'>
        </div>
        <div className='contenedorBooks'>
          {allOrders.length > 0 ? (
            allOrders?.map((e, i) => {
              return (
                <Link to={'/order/' + e._id}>
                  <div key={i}>
                    <Order
                      id={e._id}
                      nombre={e.books?.nombre}
                      image={e.books?.image}
                    />
                  </div>
                </Link>
              )
            })
          ) : (
            <h3>TODAVIA NO HAY NINGUN LIBRO COMPRADO...</h3>
          )
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}
