import React from 'react';
import { useNavigate } from 'react-router';


function ProfileBook({ nombre, autor, image, order, id }) {
    const navigate = useNavigate()
    let vendido
    if (order.length > 0) {
        vendido = 'VENDIDO'
    }

    let details
    if (!order.length > 0) {
        details = "ver mas"
    }

    function handleOnClickDetail() {
        navigate(`/details/${id}`)
    }
    return (
        <div className="container-profile">
            <div className="cardP">
                <div className="cardbody">
                    <div className="vendido">{vendido ? vendido : null}</div>
                    <p className="texto">{nombre}</p>
                    <p className="texto">{autor}</p>
                    {details ? <button  className="bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider" onClick={() => (handleOnClickDetail())}>{details}</button> : null}
                    <img className="im"src={image} />
                </div>
            </div>
        </div>
    )
}

export default ProfileBook
