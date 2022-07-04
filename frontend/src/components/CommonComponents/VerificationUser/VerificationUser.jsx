import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { autenticarUser } from "../../../redux/actions/actionUser.js"

export default function VerificationUser() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
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
    dispatch(autenticarUser(config))
  }, [])
  if (!token) "Cargando..."

  return <>{token ? <Outlet /> : <Navigate to="/" />}</>
}
