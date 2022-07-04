import React from 'react';
import book from '../../../assets/images/book.svg';
import { deleteBook } from '../../../redux/actions/actionBooks';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';



function Books({ nombre, image, price, id, order }) {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let vendido
  if (order.length > 0) {
    vendido = 'VENDIDO'
  }

  function handleDeleteBook(e) {
    if (!order.length > 0) {
      e.preventDefault()
      dispatch(deleteBook(id))
      if(window.confirm("¿Estás seguro que quieres eliminar este libro? Si lo eliminas no podrás deshacer el cambio.")===true)
      swal({
        title: '¡Eliminado con éxito!',
        text: ' ',
        icon: 'success',
        button: 'OK!',
      })
      navigate('/')
    } else {
      swal('No se puede borrar el libro porque se vendio')
    }

  }
  function handleUpdateBook(e) {
    if (!order.length > 0) {
      e.preventDefault()
      navigate(`/details/update/${id}`)
    } else {
      swal('No se puede modificar el libro porque se vendio')
    }
  }

  function handleInfoBook(e) {
    if (!order.length > 0) {
      e.preventDefault()
      navigate(`/details/${id}`)
    } else {
      swal('No se puede ver el detalle de este libro porque se vendio')
    }

  }
  return (
    <div className="bookCreated">
      <div className='-300 p-5 md:grid'>

        <div className='md:flex items-center justify-center'>

          <div className='bg-white rounded-md py-12 px-5 my-5 md:my-0 text-center shadow max-w-xs mx-auto md:mx-0 flex-grow transform md:scale-110'>
            <div className="vendidoBookCreated">{vendido ? vendido : null}</div>
            <img className=' w-24 h-24 object-cover shadow-lg mx-auto' src={image || book} alt='Img no encontrada' />
            <div>

              <h1 className='capitalize font-semibold text-3xl  text-gray-900 mt-6'>{nombre}</h1>
              <p className='text-gray-500 mt-1 text-2xl' >{price}</p>
              {token ? (
                <div >
                  <button onClick={(e) => handleDeleteBook(e)} className="btnBook">Borrar</button>
                  <button onClick={(e) => handleUpdateBook(e)} className="btnBook">Actualizar</button>
                  <button onClick={(e) => handleInfoBook(e)} className="btnBook">Info</button>
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Books