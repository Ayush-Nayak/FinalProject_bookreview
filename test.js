const bookService = require('./bookService');

async function runTests() {
  console.log('All books:', await bookService.getAllBooks());
  console.log('Book with ISBN 4:', await bookService.getBookByISBN('4'));
  console.log('Books by Unknown author:', await bookService.getBooksByAuthor('Unknown'));
  console.log('Book titled "The Divine Comedy":', await bookService.getBookByTitle('The Divine Comedy'));
}

runTests();