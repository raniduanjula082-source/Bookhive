import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/books';

// Add auth header
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getAllBooks = () => {
    return axios.get(API_URL);
};

const getBookById = (id: string) => {
    return axios.get(API_URL + `/${id}`);
};

const createBook = (bookData: any) => {
    // headers need to accept any type for axios in ts if strict, lets cast or assume typical usage
    return axios.post(API_URL, bookData, { headers: authHeader() as any });
};

const updateBook = (id: string, bookData: any) => {
    return axios.put(API_URL + `/${id}`, bookData, { headers: authHeader() as any });
};

const deleteBook = (id: string) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() as any });
};

const BookService = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

export default BookService;
