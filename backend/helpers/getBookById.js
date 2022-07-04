import Book from '../models/Book.js';
import {projection} from '../controllers/booksControllers.js';

export default async function getBookById(id){
    const bookFromDB = await Book.findById(id, projection) 
    return bookFromDB

}
