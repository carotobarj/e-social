import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkoutform from "./CheckoutForm/CheckoutForm"
import NavBar from "../../CommonComponents/NavBar/NavBar"

const stripePublicKey = 'pk_test_51LAg9hHDqRgCh1WMinPYGhVaxGp2m9Df26h0orDwuaSZJak0vVZl2rUcrvlbK14XVmWZ9kScsTCXMWiZLFA6Abek00ezDxZtwN'

const stripePromise = loadStripe(stripePublicKey)

const CheckOut = () => {
  return (

    <Elements stripe={stripePromise}>
      <NavBar />

      <div>
        <Checkoutform />
      </div>
    </Elements>
  )
}

export default CheckOut
