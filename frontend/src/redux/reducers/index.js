import { GET_CATEGORIES, GET_REVIEW, FILTER_BY_CATEGORY, SORT_BY, NAME_ASC, NAME_DESC, DELETE_USER, PRICE_ASC, PRICE_DESC, BUY_BOOK, GET_DETALLE_ORDER, GET_USUARIOS, GET_ORDERS, POST_ANSWER, POST_QUESTION, GET_QA, GET_ALL_QUESTIONS, GET_ALL_ANSWERS, GET_ALL_QUESTIONS_COMPRADOR, TEMP_STATE, NEW_FIRST, IS_ADMIN, ADMIN_AN_USER } from '../utils/constants'

const initialState = {
  allBooks: [],
  allOrders: [],
  allReviews: [],
  allUsuarios: [],
  answers: [],
  books: [],
  booksCreated: [],
  buy: [],
  categories: [],
  confirmacion: {},
  countBooks: [],
  delete: [],
  deleteUserAsAdmin: [],
  detail: [],
  email: [],
  isAdmin: false,
  invalidToken: true,
  loginUser: false,
  orders: [],
  order: [],
  put: [],
  questions: [],
  questionsAndAnswers: [],
  questionsComprador: [],
  review: [],
  tempState: [],
  usuario: [],
  usuarioActual: [],
  usuarioProfile: [],
  adminAnUser: [],
  updateNombre: [],
  borraUsuario: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {

    //---------------------USER----------------------------------------
    case 'GOOGLE_LOGIN':
      console.log(action.payload)
      return {
        ...state,
        usuario: action.payload,
      }

    case 'LOGIN_USER':
      return {
        ...state,
        usuario: !action.payload.error ? action.payload : null,
        email: action.payload.error ? action.payload.error : null,
        loginUser: action.payload._id && true,
      }

    case 'LOGOUT_USER':
      return {
        ...state,
        usuario: [],
        usuarioActual: [],
        allUsuarios: [],
        confirmacion: {},
        email: [],
        invalidToken: true,
        loginUser: false,
      }

    case 'AUTH_USER':
      return {
        ...state,
        usuario: action.payload,
      }

    case 'RESET_ERROR_LOGUIN_USER':
      return {
        ...state,
        email: action.payload,
      }

    case 'VALIDATE_USER':
      return {
        ...state,
        confirmacion: action.payload,
      }

    case 'SEND_EMAIL_TO_RESET_PASSWORD':
      return {
        ...state,
        email: action.payload,
      }

    case 'RESET_PASSWORD':
      return {
        ...state,
        email: action.payload,
      }

    case 'RESET_ERROR':
      return {
        ...state,
        email: [],
      }

    case IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      }
    case 'UPDATE_NOMBRE':
      return {
        ...state,
        updateNombre: action.payload
      }
      case 'BORRAR_USUARIO':
        return {
          ...state,
          borraUsuario: action.payload
        }
    //---------------------BOOKS----------------------------------------
    case 'GET_BOOKS':
      return {
        ...state,
        books: action.payload,
        allBooks: action.payload,
      }
    case 'POST_CREATE':
      return {
        ...state,
      }
    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload
      }

    case 'SEARCH_BY_NAME':
      return {
        ...state,
        books: action.payload
      }

    case 'CLEAN_DATA':
      return {
        ...state,
        detail: [],
        tempState: [],
      }

    case 'ACTUAL':
      return {
        ...state,
        usuarioActual: action.payload,
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }

    case TEMP_STATE:
      return {
        ...state,
        tempState: action.payload
      }

    // FILTERS
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        books: action.payload
      }

    // SORTERS
    case SORT_BY:
      let sortedBooks = [...state.books]

      if (action.payload === NEW_FIRST) {
        sortedBooks.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      }

      if (action.payload === NAME_ASC) {
        sortedBooks.sort((a, b) => a.nombre.localeCompare(b.nombre))
      }

      if (action.payload === NAME_DESC) {
        sortedBooks.sort((a, b) => b.nombre.localeCompare(a.nombre))
      }

      if (action.payload === PRICE_ASC) {
        sortedBooks.sort((a, b) =>
          a.price !== b.price
            ? a.price - b.price
            : a.nombre.localeCompare(b.nombre)
        )
      }

      if (action.payload === PRICE_DESC) {
        sortedBooks.sort((a, b) =>
          a.price !== b.price
            ? b.price - a.price
            : b.nombre.localeCompare(a.nombre)
        )
      }

      return {
        ...state,
        books: sortedBooks
      }

    case 'PAGINATION_BOOKS':
      return {
        ...state,
        books: action.payload
      }

    case 'GET_TOTAL':
      return {
        ...state,
        countBooks: action.payload
      }

    case 'DELETE_BOOK':
      return {
        ...state,
        delete: action.payload
      }

    case 'PUT_BOOK_BODY':
      return {
        ...state,
        put: action.payload
      }

    //BUY
    case BUY_BOOK:
      return {
        ...state,
        buy: action.payload
      }

    //ORDERS
    case "ORDER_POST":
      return {
        ...state
      }
    case 'HISTORY_ORDER':
      return {
        ...state,
        orders: action.payload,
      }
    case GET_DETALLE_ORDER:
      console.log(action.payload)
      return {
        ...state,
        order: action.payload
      }
    case "USUARIO_CREATED":
      return {
        ...state,
        booksCreated: action.payload
      }
    case "USUARIO_INFO_PROFILE":
      return {
        ...state,
        usuarioProfile: action.payload
      }
    //-----------------ADMIN----------------------------------------
    case GET_USUARIOS:
      console.log(action.payload)
      return {
        ...state,
        allUsuarios: action.payload,

      }
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.payload
      }


    case GET_REVIEW:
      return {
        ...state,
        allReviews: action.payload
      }

    case DELETE_USER:
      return {
        ...state,
        deleteUserAsAdmin: action.payload
      }
    case ADMIN_AN_USER:
      return {
        ...state,
        adminAnUser: action.payload
      }
    //----------------------QA---------------
    case POST_ANSWER:
      return {
        ...state
      }
    case POST_QUESTION:
      return {
        ...state
      }
    case GET_QA:
      return {
        ...state,
        questionsAndAnswers: action.payload
      }
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      }
    case GET_ALL_ANSWERS:
      return {
        ...state,
        answers: action.payload
      }
    case GET_ALL_QUESTIONS_COMPRADOR:
      return {
        ...state,
        questionsComprador: action.payload
      }
    // -------------------- REVIEW --------------------- 
    case "POST_REVIEW":
      return {
        ...state
      }

    case "GET_REVIEW":
      return {
        ...state,
        review: action.payload
      }
    default:
      return state
  }
}



export default rootReducer
