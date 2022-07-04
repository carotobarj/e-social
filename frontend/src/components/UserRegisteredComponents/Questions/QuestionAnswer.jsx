import React from 'react';
import { useNavigate } from 'react-router';
import swal from 'sweetalert'

export default function QuestionAnswer({ mensaje, book, idComprador, answers }) {

  const navigate = useNavigate()

  function handleLibro(e) {
    if (!book?.order.length > 0) {
      navigate(`/details/${book?._id}`)
    } else {
      swal({
        title: "Lo siento este libro ya fue comprado!",
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
          <tbody>
            <tr className="containerInfo">
              <td className="imageR"><img src={idComprador?.image.url} alt="No disponible" height={50} width={50} /></td>
              <td className="nameQuestion"><a onClick={(e) => handlePerfil(e)}>{idComprador?.nombre}</a></td>
              <td className="imageR"><img src={book?.image} alt="No disponible" height={50} width={50} /></td>
              <td className="priceQuestion"><a onClick={(e) => handleLibro(e)}>{book?.nombre}</a></td>
              <td className="blockedQuestion">{mensaje}</td>
              <td className="moderatorQuestion">{answers[0]?.mensaje} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
