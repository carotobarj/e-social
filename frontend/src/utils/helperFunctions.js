// devuelve año actual
export function currentYear() {
  const current = new Date()
  const result = `${current.getFullYear()}`
  return result
}

// chequea extensión del (file)
function hasExtension(input) {
  // const fileName = document.getElementsByName(inputID).value
  const res = /\.(gif|jpe?g|png)$/i.test(input)
  return res
}

// pasa (value) de centavos de dólar a número con coma
export function formatToCurrency(value) {
  const centsToDollars = value / 100
  const finalPrice = `U$D ${centsToDollars}`
  return finalPrice
}

// validaciones del Form
export function formValidators(values, uploadImg) {
  let errors = {}

  // nombre
  !values.nombre
    ? errors.nombre = 'Campo requerido'
    : !/^(\d|[a-z]|[\u00f1\u00d1]|[,\.:¡!¿?()'\-]|[À-ÿ]|\s){0,60}$/i.test(values.nombre)
      ? errors.nombre = 'Ingrese un nombre válido de hasta 60 caracteres'
      : null

  // autor
  !values.autor
    ? errors.autor = 'Campo requerido'
    : !/^([a-z]|[()']|[À-ÿ]|[\u00f1\u00d1]|[,\.:¡!¿?()'\-]|\s){0,40}$/i.test(values.autor)
      ? errors.autor = 'Ingrese un nombre válido de hasta 40 caracteres'
      : null

  // idioma
  !values.idioma
    ? errors.idioma = 'Campo requerido'
    : !/^([a-z]|[À-ÿ]|[\u00f1\u00d1]|\s){0,20}$/i.test(values.idioma)
      ? errors.idioma = 'Ingrese un idioma válido de hasta 40 caracteres'
      : null

  // editorial
  !/^(\d|[a-z]|[\u00f1\u00d1]|[,.:¡!¿?()']|[À-ÿ]|\s){0,40}$/i.test(values.editorial)
    ? errors.editorial = 'Ingrese un nombre válido de hasta 40 caracteres'
    : null

  // edición
  !/^[1-9][0-9]?$/.test(values.edicion) && (/^./.test(values.edicion))
    ? errors.edicion = 'Ingrese un Nº de edición válido'
    : null

  // año de pub.
  !/^[0-9]{0,4}$/.test(values.publicado) || values.publicado > currentYear()
    ? errors.publicado = 'Ingrese un año válido'
    : null

  // págians
  !/^[1-9][0-9]{0,4}$/.test(values.cant_pags) && (/^./.test(values.cant_pags))
    ? errors.cant_pags = 'Ingrese un número de págs. válido'
    : null

  // descripción
  !values.descripcion || values.descripcion?.length < 6
    ? errors.descripcion = 'La descripción debe contar con al menos 6 caracteres'
    : values.descripcion?.length > 1500
      ? errors.descripcion = 'La descripción debe contar con un máximo de 1500 caracteres'
      : null

  // precio
  !values.price
    ? errors.price = 'Campo requerido'
    : values.price && values.price < 50
      ? errors.price = 'Ingrese un precio mayor a 50 centavos'
      : /([.,])/.test(values.price)
        ? errors.price = 'Ingrese el precio sin puntos ni comas'
        : null

  // saga o serie
  !/^(\d|[a-z]|[\u00f1\u00d1]|[,\.:¡!¿?()'\-]|[À-ÿ]|\s){0,60}$/i.test(values.colection)
    ? errors.colection = 'Ingrese un idioma válido de hasta 30 caracteres'
    : null

  // categorías
  values.category?.length < 1
    ? errors.category = 'Elija al menos 1 categoría'
    : null

  // image por file
  if (uploadImg) {
    !values.file?.name
      ? errors.file = 'Elija una imagen con extensión .jpg, .jpeg, .gif o .png'
      : values.file?.name && !hasExtension(values.file.name)
        ? errors.file = 'Elija una imagen con extensión .jpg, .jpeg, .gif o .png'
        : null
  }
  // image por URL
  if (!uploadImg) {
  !values.image
    ? errors.image = 'Elija una imagen con extensión .jpg, .jpeg, .gif o .png'
    : values.image && !hasExtension(values.image)
      ? errors.image = 'Elija una imagen con extensión .jpg, .jpeg, .gif o .png'
      : null
  }

  return errors
}

export function mayúsculaInicial(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// export function sortArray(array, value, reverse) { // NO está funcionando por las particularidades de los sorts!
//   let res
//   Array.isArray(array) // si array es array...
//     ? array.sort( // ... ordena...
//       isNaN(array[0])
//         ? (a, b) => a.localeCompare(b) // ... alfabéticamente si es string...
//         : (a, b) => a - b) // ... o de menor a mayor si es número
//     : res = "NOT AN ARRAY!" // aclara en caso de que array no sea array
//   return res ? res : reverse ? array.reverse() : array // reverse == TRUE ? orderna invertido
// }
