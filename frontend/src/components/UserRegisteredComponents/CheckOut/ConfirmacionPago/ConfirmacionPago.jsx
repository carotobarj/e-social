import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
// import s from './ConfirmacionPago.module.css'
import { useNavigate } from 'react-router'
import NavBar from '../../../CommonComponents/NavBar/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '../../../CommonComponents/Footer/Footer'
import swal from 'sweetalert';

const ConfirmacionPago = () => {
  const form = useRef()
  const navigate = useNavigate()

const [formEnv, setForm] = useState(false)


return (
  <>
  <NavBar />
  <div className="faltaPoco">
      <h2>
        Falta poco para terminar el proceso de compra...
      </h2>
    </div>
    <div className="faltaPoco2">
      <h3>Completá los datos!</h3>
    </div>

  <div >
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      
      
      validate={(valores) => {
        let errors = {}

        if (!valores.name) {
          errors.name = 'Campo requerido'
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
          errors.name = 'Solo nombre'
        }
        if (!valores.email) {
          errors.email = 'Campo requerido'
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
          errors.email = 'Solo E-Mail'
        }

        return errors
      }}

      onSubmit={(values, { resetForm }) => {
        emailjs.sendForm('service_fawk32l', 'template_ldua3d9', form.current, 'g-ZSRPwlx9NA1IFaD')
        .then((result) => {
          console.log(result.tex)
        }, (error) => {
          console.log(error.text)
        })
        resetForm()
        setForm(true)
        setTimeout(() => setForm(false), 5000)
        swal({
          title: "¡Mail enviado con éxito!",
          text: " ",
          icon: "success",
          button: "Ok!",
        })
        navigate("/")
      }}
    >
      {({ errors ,values}) => (<Form className="fondoConfirmacionPago" ref={form}>
       
        <div >
          <Field
            type="text"
            name="name"
            id="name"
            placeholder="Nombre (el campo es requerido)"
            className="inputConfirmacionPago"
          />
          {/* <ErrorMessage name='name' component={() => (<p className='errors'>{errors.name}</p>)} /> */}
        </div>

        <div>
          <Field
            type="email"
            name="email"
            id="email"
            className="inputConfirmacionPago"
            placeholder="Email (el campo es requerido)"
          />

          {/* <ErrorMessage name='email' component={() => (<p className='errors'>{errors.email}</p>)} /> */}
        </div>

        <button className="btnConfirmacionPago" type="submit">Enviar</button>
        {formEnv && <p className='send'>¡Enviado correctamente! ✔</p>}
      </Form>)}
    </Formik>
  </div>
        <Footer/>
</>
)
}

export default ConfirmacionPago
