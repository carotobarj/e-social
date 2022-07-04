import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { postAnswer } from '../../../redux/actions/actionQA';
import swal from 'sweetalert';


export default function QuestionDetail({ _id, mensaje, book, idComprador }) {
  const { id } = useParams(); //id del vendedor 
  const idQuestion = _id //id de la pregunta 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    mensaje: ''
  })

  const handleSubmitSendAnswer = async (e) => {
    e.preventDefault()
    if(!input.mensaje){
      swal({
        title: 'No puedes enviar respuestas vacías.',
      });
    } else {
      setInput({
        mensaje: input.mensaje
      })
      dispatch(postAnswer({
        mensaje: input.mensaje,
        book: book?._id,
        question: idQuestion
      }))
      swal({
        title: 'Su respuesta ha sido enviada con éxito',
      });
      
      setInput({
        mensaje: ''
      })
    }
  }

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }


  function handleLibro(e) {
    if (!book?.order.length > 0) {
      navigate(`/details/${book?._id}`)
    } else {
      swal({
        title: 'Lo siento este libro ya fue comprado!',
      });
      
    }
  }

  function handlePerfil(e) {
    navigate(`/profile/${idComprador?._id}`)
  }

  return (
    <div className="containerQuestion">
      <div className="flexQuestion">
        <table className="usersTable">
          <thead>
            <tr>
              <th className="no">IMAGEN</th>
              <th className="no">COMPRADOR</th>
              <th className="no">IMAGEN</th>
              <th className="no">LIBRO</th>
              <th className="no">PREGUNTA</th>
              <th className="no">RESPONDER</th>
            </tr>
          </thead>
          <tbody>
            <tr className="containerInfo">
              <td className="imageR"><img src={idComprador?.image.url} alt="No disponible" height={50} width={50} /></td>
              <td className="nameQuestion"><a onClick={(e) => handlePerfil(e)}>{idComprador?.nombre}</a></td>
              <td className="imageR"><img src={book?.image} alt="No disponible" height={50} width={50} /></td>
              <td className="priceQuestion"><a onClick={(e) => handleLibro(e)}>{book?.nombre}</a></td>
              <td className="blockedQuestion">{mensaje}</td>
              <td className="moderatorQuestion"><div> <form onSubmit={(e) => handleSubmitSendAnswer(e)}>
                <div className="containerAnswer">
                  <input className="inputQuestion" type="text" placeholder='...' name="mensaje" value={input.mensaje} onChange={(e) => handleInputChange(e)} />
                  <button className="btnQuestion">enviar</button>
                </div>
              </form>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}