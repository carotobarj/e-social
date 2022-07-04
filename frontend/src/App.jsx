import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

//----------------------------------GUEST---------------------------------------------
import AuthLayout from "./layouts/AuthLayout"
import ForgotPassword from "./components/CommonComponents/ForgotPassword/ForgotPassword.jsx"
import NewPassword from "./components/CommonComponents/NewPassword/NewPassword.jsx"
import ConfirmAccount from "./components/CommonComponents/ConfirmAccount/ConfirmAccount.jsx"
import Details from "./components/CommonComponents/Details/Details.jsx"
import About from "./components/CommonComponents/About/About"
import NotFound from "./components/CommonComponents/NotFound/NotFound.jsx"
import Home from "./components/CommonComponents/Home/Home"
import Homeout from "./components/CommonComponents/Homeout/Homeout.jsx"
import UserCard from "./components/CommonComponents/UserCard/UserCard.jsx"
//----------------------------------USER---------------------------------------------
import VerificationUser from "./components/CommonComponents/VerificationUser/VerificationUser.jsx"
import RutaProtegida from "./layouts/RutaProtegida"
import Forms from "./components/UserRegisteredComponents/Form/Forms.jsx"
import CheckOut from "./components/UserRegisteredComponents/CheckOut/CheckOut"
import OrdersHistory from "./components/UserRegisteredComponents/OrdersHistory/OrdersHistory"
import OrderDetail from "./components/UserRegisteredComponents/OrderDetail/OrderDetail"
import BooksCreated from "./components/UserRegisteredComponents/BooksCreated/BooksCreated"
import ProfileUsers from "./components/CommonComponents/ProfileUsers/ProfileUsers"
import Review from './components/UserRegisteredComponents/Review/Review'
import HomeChat from './components/CommonComponents/Chat/HomeChat' 
//----------------------------------ADMIN---------------------------------------------
import AllUsers from "./components/AdminComponents/AllUsers/AllUsers"
import AdminHome from "./components/AdminComponents/AdminHome/AdminHome"
import AllReviews from './components/AdminComponents/AllReviews/AllReviews'
import AllOrders from "./components/AdminComponents/AllOrders/AllOrders"
import ConfirmacionPago from "./components/UserRegisteredComponents/CheckOut/ConfirmacionPago/ConfirmacionPago"
import Questions from "./components/UserRegisteredComponents/Questions/Questions.jsx"
import Profile from "./components/UserRegisteredComponents/Profile/Profile"
import VerificationAdmin from "./components/AdminComponents/VerificationAdmin/VerificationAdmin"


export default function App() {

 

  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Home />} />
          <Route path="homeout" element={<Homeout />} />
          <Route path="olvide-password" element={<ForgotPassword />} />
          <Route path="olvide-password/:token" element={<NewPassword />} />
          <Route path="confirmar/:id" element={<ConfirmAccount />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="/seller" element={<UserCard />} />
          <Route path="/profile/:id" element={<ProfileUsers/>}/>
        </Route>

         <Route path="/" element={<VerificationUser />}>
          <Route path="/create" element={<Forms />} />
          <Route path="/confirmation" element={<ConfirmacionPago />}/>
          <Route path="/questions/:id" element={<Questions />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/details/update/:id" element={<Forms />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/historyOrders/:id" element={<OrdersHistory/>}/>
          <Route path="/order/:id" element={<OrderDetail/>}/>
          <Route path="/bookCreated/:id" element={<BooksCreated/>}/>
          <Route path="/review/:id" element={<Review />} />
          <Route path="/chat" element={<HomeChat />} />
        </Route>

        <Route path="/" element={<VerificationAdmin/>}>
          <Route path="/admin" element={<AdminHome/>}/>
          <Route path="/admin/users" element={<AllUsers/>}/>
          <Route path="/admin/allOrders" element={<AllOrders/>}/>
          <Route path="/admin/allReviews" element={<AllReviews/>}/>
        </Route>

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
   
  )
}
