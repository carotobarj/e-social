import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { detailsBook } from "../../../redux/actions/detailsBooks"
import NavBar from "../../CommonComponents/NavBar/NavBar"
import book from "../../../assets/images/book.svg"
import { formatToCurrency } from "../../../utils/helperFunctions"
import { usuarioActual } from "../../../redux/actions/actionUser";
import { getQA, postQuestion } from "../../../redux/actions/actionQA"
import DetailsField from "./DetailsField/DetailsField"
import NotFound from "../../CommonComponents/NotFound/NotFound.jsx"
import Fle from "../../../Iconos/Fle"
import Vuelta from "../../../Iconos/Vuelta"
import swal from 'sweetalert';
import Footer from "../Footer/Footer"

const Details = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const { id } = useParams()
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.detail)
  const usuarioAct = useSelector((state) => state.usuarioActual)
  const usuarioVendedor = detail.creador
  const idBook = detail._id
  const userAct = usuarioAct._id

  let perfilUser
  if (token) {
    perfilUser = 'PERFIL DEL VENDEDOR'
  }


  const handle = () => {
    navigate(`/profile/${usuarioVendedor}`)
  }

  const { nombre, autor, idioma, editorial, edicion, tapa, cant_pags, colection, image, price, descripcion, category, ilustrado, publicado } = useSelector((state) => state.detail)

  console.log(detail)
  const user = useSelector((state) => state.usuarioActual)
  const userComprador = user._id

  //----------------------------------------------------------------------------------------------------------------------------------------------------------- 
  const qa = useSelector((state) => state.questionsAndAnswers)
  const questionAnswered = qa.length ? qa.filter(ele => ele.answers.length) : null

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------
  const [input, setInput] = useState({
    mensaje: ''
  })
  //--------------------------
  if (Object.keys(detail).length > 0 && loading) {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }



  useEffect(() => {
    dispatch(getQA(id))
    dispatch(detailsBook(id))
    dispatch(usuarioActual())
  }, [dispatch])

  const handleSubmitSendQuestion = async (e) => {
    if (userAct !== usuarioVendedor) {
      e.preventDefault();
      if (!input.mensaje.length) {
        swal("No puede enviar una pregunta vacía!");
      } else {
        setInput({
          mensaje: input.mensaje,
        })
        dispatch(postQuestion({
          mensaje: input.mensaje,
          idComprador: userComprador,
          book: idBook,
          idVendedor: usuarioVendedor
        }))
        swal("", "¡Tu pregunta fue envia con exito!", "success");
        setInput({
          mensaje: ''
        })


      }
    } else {
      e.preventDefault()
      swal("¡No podés preguntar por un libro que es tuyo!");
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

  return (
    <>
      <NavBar />
      <div className="cover">
        <div className="book">
          <label for="page-1" class="book__page book__page--1">
            <img src={image || book} alt="No encontrado" className="image-detalle" />
          </label>

          <label for="page-2" class="book__page book__page--4 bgee">
            <div className="page__content">

              <div className="page__content-blockquote">



              </div>






              <DetailsField
                constant={idioma}
                clasName="h5-detalle "
                title='Idioma'
              />
              <br />




              <div className="edi-to">
                <DetailsField
                  constant={editorial}
                  clasName="h5-detalle"
                  title='Editorial'
                />
                <br />
                <DetailsField
                  constant={edicion}
                  clasName="h5-detalle"
                  title='Edición'
                />
                <br />
                <div>
                  <h5 className="h5-detalle  ">Categoría</h5>
                  {category?.sort((a, b) => a.localeCompare(b)).join(', ')}

                </div>
                <br />
                <DetailsField
                  constant={tapa}
                  clasName="h5-detalle "
                  title='Tapa'
                />
                <br />
                <DetailsField
                  constant={publicado}
                  clasName="h5-detalle "
                  title='Año de publicación'
                />
                <br />
                <DetailsField
                  constant={cant_pags}
                  clasName="h5-detalle "
                  title='Páginas'
                />

                {ilustrado ?
                  (<>
                    <h5 className="h5-detalle">Ilustrado</h5> ✓
                  </>)
                  : (<>
                    <h5 className="h5-detalle">Ilustrado</h5> X
                  </>)
                }

                <DetailsField
                  constant={colection}
                  clasName="h5-detalle"
                  title='Saga / Serie'
                />
              </div>

              <div className="respuesta-detail">
                <div clasName="question">
                  {
                    questionAnswered?.map((e, i) => {
                      return (
                        <div className="msjes">
                          <div><p className="t">Pregunta: {e.mensaje}</p></div>
                          <div><p className="t">Respuesta: {e.answers[0]?.mensaje}</p></div>
                        </div>
                      )
                    })
                  }
                </div>

                {
                  token ?
                    <form onSubmit={(e) => handleSubmitSendQuestion(e)}>
                      <input type="text" placeholder="Acá va su pregunta, señor" name="mensaje" value={input.mensaje} onChange={e => handleInputChange(e)} />

                      <button className="bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider">ENVIAR</button>
                    </form>
                    :
                    <Link to="/homeout">
                      <button className="btnn-detalle bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider">PREGUNTAR</button>
                    </Link>
                }
              </div>
              <span className="comprame">{
                detail.order?.length < 1 ?
                  token ?
                    <Link to="/checkout">
                      <button className="btnn-detalle bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider">COMPRAR</button>
                    </Link>
                    :
                    <Link to="/registrar">
                      <button className="bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider btnn-detalle">COMPRAR</button>
                    </Link>
                  : null
              }</span>
            </div>
            <div className="page__content-text">
              <div className="page__number">3</div>
            </div>
          </label>
          <input type="radio" name="page" id="page-1" />
          <input type="radio" name="page" id="page-2" />
          <label className="book__page book__page--2">
            <div className="book__page-front">
              <div className="page__content">
                <h1 className="page__content-book-title">{nombre}</h1>
                <h1 className="page__content-author "><p className="c">{formatToCurrency(price)}</p></h1>
                <p className="page__content-credits">
                  <DetailsField
                    constant={autor}
                    clasName=""
                    title='Autor'
                  />
                </p>
                <div className="abs">
                  <Fle />
                </div>
              </div>
            </div>
            <div className="book__page-back">
              <div className="page__content"><h1>Descripción</h1>
                <div className="vuelt">
                  <Vuelta />
                </div>
                <div className="page__content-table">
                  <div className="au-tor">
                    <p className="parra-detalle">
                      {descripcion}
                    </p>
                  </div>
                </div>
                <div className="page__number">2</div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="perfil-v">
      {perfilUser ? <button onClick={handle} className="bg-gray-600 text-white py-3 px-6 shadow-md rounded inline mt-8 mr-1 ml-1 font-semibold racking-wider">{perfilUser}</button> : null}
      </div>
    </>
  )
}

export default Details


