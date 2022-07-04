import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { allQuestions, allQuestionsComprador } from '../../../redux/actions/actionQA';
import { useEffect } from 'react';
import QuestionDetail from './QuestionDetail';
import QuestionAnswer from './QuestionAnswer';
import QuestionForComprador from './QuestionForComprador';
import NavBar from '../../CommonComponents/NavBar/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../../CommonComponents/Footer/Footer';

export default function Questions() {
  const dispatch = useDispatch()
  const { id } = useParams();
  const questions = useSelector((state) => state.questions)
  const questionsComprador = useSelector(state => state.questionsComprador)
  const question = questions.filter(ele => !ele.answers.length > 0)
  const questionAnswer = questions.filter(ele => ele.answers.length > 0)

  useEffect(() => {
    dispatch(allQuestionsComprador(id))
    dispatch(allQuestions(id))
    dispatch(allQuestionsComprador(id))
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Link to='/profile'>
        <button className="btnBook">VOLVER AL MENU</button>
      </Link>
      <br /> <br />
      <div className="containerTodo">
        <h3 className="tituloQuestion">Preguntas por responder </h3>
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
            </table>
          </div>
        </div>
        {question.length > 0 ? (
          question?.map((e, i) => {
            return (
              <div _id={e?._id} key={i}>
                <QuestionDetail
                  _id={e._id}
                  mensaje={e.mensaje}
                  book={e.book}
                  idComprador={e.idComprador}
                  idVendedor={e.idVendedor}
                />
              </div>
            );
          })
        ) : (
          <h3 className="h3Question">TODAVIA NO HAY PREGUNTAS PARA RESPONDER...</h3>
        )
        }
        <h3 className="tituloQuestion">Preguntas ya respondidas </h3>
        <div className="containerQuestion">
          <div className="flexQuestion">
            <table className="usersTable">
              <thead>
                <tr className="containerInfo">
                  <th className="no">IMAGEN</th>
                  <th className="no">COMPRADOR</th>
                  <th className="no">IMAGEN</th>
                  <th className="no">LIBRO</th>
                  <th className="no">PREGUNTA</th>
                  <th className="no">RESPUESTA</th>
                </tr>
              </thead></table> </div>
        </div>
        {questionAnswer.length > 0 ? (
          questionAnswer?.map((e, i) => {
            return (
              <div _id={e._id} key={i}>
                <QuestionAnswer
                  mensaje={e.mensaje}
                  book={e.book}
                  idComprador={e.idComprador}
                  idVendedor={e.idVendedor}
                  answers={e.answers}
                />
              </div>
            );
          })
        ) : (
          <h3 className="h3Question">TODAVIA NO RESPONDISTE NINGUNA PREGUNTA...</h3>
        )}
        <h3 className="tituloQuestion">Preguntas realizadas a otros usuarios</h3>
        <div className="containerQuestion">
          <div className="flexQuestion">
            <table className="usersTable">
              <thead>
                <tr className="containerInfo">
                  <th className="no">IMAGEN</th>
                  <th className="no">VENDEDOR</th>
                  <th className="no">IMAGEN</th>
                  <th className="no">LIBRO</th>
                  <th className="no">PREGUNTA</th>
                  <th className="no">RESPUESTA</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        {questionsComprador.length > 0 ? (
          questionsComprador?.map((e, i) => {
            return (

              <div _id={e._id} key={i}>
                <QuestionForComprador
                  _id={e._id}
                  mensaje={e.mensaje}
                  book={e.book}
                  idVendedor={e.idVendedor}
                  idComprador={e.idComprador}
                  answers={e.answers}
                />
              </div>
            );
          })
        ) : (
          <h3 className="h3Question">TODAVIA NO HICISTE NINGUNA PREGUNTA A OTROS USUARIOS...</h3>
        )
        }
      </div>
      <br />
      <Footer/>
      </div>
  )
}

