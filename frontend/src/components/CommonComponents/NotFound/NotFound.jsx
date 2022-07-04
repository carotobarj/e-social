import React from "react"
import image from '../../../assets/images/notFound.png'

export default function NotFound() {
  return (
    <div>
      <img className="notFound" src={image} alt='¡No encontrado!' />
    </div>
  )
}
