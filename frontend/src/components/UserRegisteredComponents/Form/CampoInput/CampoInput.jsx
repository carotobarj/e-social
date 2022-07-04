import { ErrorMessage, Field } from "formik"
import { mayúsculaInicial } from "../../../../utils/helperFunctions"

const CampoInput = ({ name, text, type, input, isCreate, errors, req, placeholder, as }) => {

  const nombre = text ? text : name

  return (
    <>
      <label className="label" >{mayúsculaInicial(nombre) + (req ? req : '')}</label>

      {/* valor anterior solo en modo Update */}
        {!isCreate && name !== 'descripcion' && name !== 'price' && input
          ? <p className="oldData">({input})</p>
          : null}

      <div>
        <Field
          name={name}
          className="campoInput"
          type={type}
          id={name}
          placeholder={placeholder}
          as={as ? as : ''}
        />
      </div>

      <ErrorMessage name={name} component={() => (<p className="error">{errors[name]}</p>)} />

    </>
  )
}

export default CampoInput
