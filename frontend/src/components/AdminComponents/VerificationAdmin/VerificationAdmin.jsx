import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { autenticarUser } from "../../../redux/actions/actionUser.js"
import { isAdmin } from "../../../redux/actions/actionIsAdmin.js"
import AdminHome from "../AdminHome/AdminHome.jsx"

export default function VerificationAdmin() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const prueba = useSelector(state => state.isAdmin)
  
  useEffect(() => {
    if (!token) {
      return
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch(isAdmin())
  }, [])

  if (!prueba) "No eres admin pillin >.< "

  return <>{prueba ? <Outlet /> : <Navigate to="/" />}</>
}