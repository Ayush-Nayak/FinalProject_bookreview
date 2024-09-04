const axios = require('axios');

const BASE_URL = 'http://localhost:5000';


async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
}


function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching book by ISBN:', error.message));
}


async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
  }
}


async function getBookByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by title:', error.message);
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBookByTitle
};