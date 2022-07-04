import React from 'react';
import { useNavigate } from 'react-router';

export default function QuestionForComprado({ mensaje, book, idComprador, idVendedor, answers }) {
  const navigate = useNavigate()
  function handleLibro(e) {
    if (!book?.order.length > 0) {
      navigate(`/details/${book?._id}`)
    } else {
      swal({
        title: 'Lo siento este libro ya fue comprado!',
      });
      }
  }

  function handlePerfilVendedor(e) {
    navigate(`/profile/${idVendedor?._id}`)
  }

  return (
    <div className="containerQuestion">
    <div className="flexQuestion">
      <table className="usersTable">
        <tbody>
          <tr className="containerInfo">
            <td className="imageR"><img src={idVendedor?.image.url} alt="No disponible" height={50} width={50} /></td>
            <td className="nameQuestion"><a onClick={(e) => handlePerfilVendedor(e)} className="moderatorQuestion">{idVendedor?.nombre}</a></td>
            <td className="imageR"><img src={book?.image} alt="No disponible" height={50} width={50} /></td>
            <td className="priceQuestion"><a onClick={(e) => handleLibro(e)}>{book?.nombre}</a></td>
            <td className="blockedQuestion">{mensaje}</td>
            <td className="moderatorQuestion"><p>{answers.length > 0 ? answers[0].mensaje : <p className="moderatorQuestion">El vendedor todavía no ha respondido su consulta</p>} </p> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}