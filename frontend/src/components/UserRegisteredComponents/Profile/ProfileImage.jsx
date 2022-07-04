import React from 'react';
import { cambiarImagen } from '../../../redux/actions/actionUser';
import { useDispatch } from 'react-redux';
export default function ProfileImage({ closeModalImage }) {
  const dispatch = useDispatch()

  function handleImage(image) {
    dispatch(cambiarImagen(image))
    window.location.reload()
  }

  return (
    <div className="containerGeneral">
      <div className="containerImagen">
        <button  onClick={closeModalImage}  >X</button>
        <div className='contFile'>
          <label  className="inputName" htmlFor='mifile'>
          </label>
          <input 
            type='file'
            name='image'
            className="inputName"
            id='mifile'
            onChange={(e) => handleImage(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  )
}
