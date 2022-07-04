import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { buyBook } from "../../../../redux/actions/actionBuy.js"
import { orderPost } from "../../../../redux/actions/actionOrder"
import { usuarioActual } from "../../../../redux/actions/actionUser";
import { useNavigate } from "react-router"
import { formatToCurrency } from "../../../../utils/helperFunctions.js"
import swal from 'sweetalert'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector(state => state.detail)
  const user = useSelector(state => state.usuarioActual)
  const idUser = user._id
  const idCreador = product.creador
  const bookId = product._id

  useEffect(() => {
    dispatch(usuarioActual());
  }, []);

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (idCreador !== idUser) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      })
      console.log("🚀 ~ file: CheckoutForm.jsx ~ line 23 ~ handleSubmit ~ paymentMethod", paymentMethod)
      setLoading(true)

      if (!error) {
        const pm = paymentMethod.id

        try {
          const buy = await dispatch(buyBook(
            [{
              pm,
              qty: 1,
              id: bookId
            }]
          ))
          if (buy.payload.data.clientSecret) {
            dispatch(orderPost({
              bookId: bookId
            }))
            swal("Pago recibido!", "No te olvides de confirmar tu mail por favor!", "success")

            setTimeout(() => {
              navigate("/confirmation")
            }, 1000)

          } else {
            swal("Pago rechazado!", "Intente nuevamente con otra tarjeta por favor!", "")

          }
          elements.getElement(CardElement).clear()
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
    } else {
      swal("no podes comprar el libro que pusiste en venta!");

    }
  }

  return (
   <div className="foche">
     <div className="checkout-container">
    <div className="left-side">
    <img
             src={product.image} // TODO cambiar por imagen del libro
             alt="not found" // TODO cambiar por texto acorde
            className="imaw"
           />
      <div className="text-box">
        <h1 className="home-heading">{product.nombre}</h1>
        <p className="home-price"><em>{formatToCurrency(product.price)} USD </em></p>
        <hr className="left-hr" />
        <p className="home-desc"><em> </em><em></em></p>
        <p className="home-desc">
          <em> </em> <em></em> 
        </p>
      </div>
    </div>

    <div className="right-side">
      <div className="receipt">
        <h2 className="receipt-heading">Resumen de tu compra</h2>
        <div>
          <table className="table">
            <tr>
              <td>{product.nombre}</td>
              <td className="price">{product.price} USD</td>
            </tr>
            <tr>
              <td>Descuento</td>
              <td className="price">0.00 USD</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td className="price">{product.price} USD</td>
            </tr>
            
            <tr className="total">
              <td>Total</td>
              <td class="price">{formatToCurrency(product.price)}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="payment-info">
        <h3 classNAme="payment-heading">Informacion de Pago</h3>
        <form
          onSubmit={handleSubmit}
          className="form-box"
          enctype="text/plain"
          method="get"
          target="_blank"
        >
         <div >
           <div >
             <CardElement />
           </div>
         </div>
         
    

          <button disabled={!stripe} class="btn">
           {loading ? (
             <div className="spinner-border text-light" role="status">
               <span className="sr-only">Cargando...</span>
             </div>
           ) : (
             "Comprar"
           )}
         </button>
        
         
        </form>
        <p className="footer-text">
          <i className="fa-solid fa-lock"></i>
         la información de tu tarjeta de crédito esta encriptada
        </p>
      </div>
    </div>
  </div>
   </div>
    
  )
}

export default CheckoutForm


