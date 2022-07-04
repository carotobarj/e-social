import getBookById from './getBookById.js'

export default async function getOrderAmount(products) {
    const bookDB = await getBookById(products[0].id)
    const finalAmount = bookDB.price

    // let amount = 0 // POR SI NECESITAMOS PASAR VARIOS PRODUCTOS
    // for (let index = 0; index < products.length; index++) {
    //     const book = products[index]
    //     const bookDB = await getBookById(book.id)
    //     let operation = bookDB.price * book.qty 
    //     amount += operation
    // }
    // const onlyTwoDecimals = amount.toFixed(2) // corta los decimales 3+
    // const finalAmount = parseInt(onlyTwoDecimals.replace('.', ''), 10) // elimina separación dedecimales por punto
    return finalAmount
} 
