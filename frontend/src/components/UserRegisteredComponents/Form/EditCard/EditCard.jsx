import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsBook } from "../../../../redux/actions/detailsBooks"
import { formatToCurrency } from "../../../../utils/helperFunctions"

const EditCard = ({ id, addMode }) => {
  const dispatch = useDispatch()
  const { nombre, descripcion, price, image } = useSelector(state => state.detail)

  const priceShow = formatToCurrency(price)

  const [verMas, setVerMas] = useState(false)

  useEffect(() => {
    if (!addMode) { dispatch(detailsBook(id)) }
  }, [])

  return (
    <>
      <h1 className="titleForm">{addMode ? 'ANUNCIAR LIBRO' : `EDITAR LIBRO`}</h1>
      <div className="contenedorBook">
        {
          addMode
            ? null
            : (
              <div className="cardBook">
                <img src={image} alt='portada anterior' className="imgBook" />
                <p className="precioBook"> {priceShow}</p>

                {
                  descripcion?.length > 100
                    ? (<button className="btnBook" onClick={() => setVerMas(!verMas)}>
                      {verMas ? ". . ." : "VER DESC"}
                    </button>
                    )
                    : null
                    }
                {
                verMas
                  ? <p className="textBook">{descripcion}</p>
                  : <p className="textBook">{descripcion?.substring(0, 100)}</p>
                  }

              </div>)
        }
      </div >
    </>
  )
}
export default EditCard
