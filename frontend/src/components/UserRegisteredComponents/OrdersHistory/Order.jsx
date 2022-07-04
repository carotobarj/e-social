import React from 'react';

function Order({ id, nombre, image }) {
  return (
    <div className="containerOrder">
      <div className="cardOrder">
        <div className="cardbody">
          <h4 className="capitalize font-semibold text-3xl  text-gray-900 mt-6">{nombre}</h4>
          <img className="im" src={image} />
          <p className="text-gray-500 mt-1 text-2xl">ID: {id}</p>
        </div>

      </div>
    </div>
  )
}

export default Order
