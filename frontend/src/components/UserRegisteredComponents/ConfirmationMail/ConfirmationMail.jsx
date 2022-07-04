import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import emailjs from '@emailjs/browser'
import * as Yup from 'yup'

const ConfirmationEmail = () => {
  const [formEnv, setForm] = useState(false)

  const form = useRef()
  return (
    <div className='form-f'>
      <h2 className='contact' id='contacts'>CONTACTO</h2>

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
          if (!valores.email === "") {
            errors.email = 'Campo requerido'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
            errors.email = 'Solo e-mail'
          }

          return errors
        }}

        onSubmit={(values, { resetForm }) => {
          emailjs.sendForm('service_fawk32l', 'template_gcvl3re', form.current, 'g-ZSRPwlx9NA1IFaD')
            .then((result) => {
              console.log(result.text)
            }, (error) => {
              console.log(error.text)
            })
          resetForm()
          setForm(true)
          setTimeout(() => setForm(false), 5000)
        }}
      >
        {({ errors ,values}) => (<Form ref={form}>
          <label>Nombre</label>
          <div>
            <Field
              type="text"
              name="name"
              values={values.name}
              id="name"
            />
            <ErrorMessage name='name' component={() => (<p className='errors'>{errors.name}</p>)} />
          </div>

          <label>Email</label>
          <div>
            <Field
              type="email"
              name="email"
              id="email"
              values={values.email}
            />

            <ErrorMessage name='email' component={() => (<p className='errors'>{errors.email}</p>)} />
          </div>

          <button type="submit">ENVIAR</button>
          {formEnv && <p className='send'>¡Enviado correctamente! ✔</p>}
        </Form>)}
      </Formik>

    </div>
  )
}

export default ConfirmationEmail





