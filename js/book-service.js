'use strict'

const KEY = 'books';
const PAGE_SIZE = 3;
var gIdx = 1;
var gBooks;
var gBook;
var gSortBy = 'NAME';
var gPageIdx = 0;

_createBooks()
function createBook(bookName, price, imgUrl = "img/book.png") {
    return {
        id: gIdx++,
        name: bookName,
        price: price,
        imgUrl: imgUrl,
        details: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [
            createBook('Frozen', 95, "img/frozen.png"),
            createBook('Aladdin', 65, "img/aladdin.png"),
            createBook('Lion-King', 78, "img/lion-king.png"),
        ]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBooks() {
    var books = gBooks

    const fromIdx = gPageIdx * PAGE_SIZE
    books = books.slice(fromIdx, fromIdx + PAGE_SIZE)

    return books
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function addBook(bookName, price) {
    var book = createBook(bookName, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks[bookIdx].price = newPrice
    _saveBooksToStorage();
}

function setRating(gBookId, rating) {
    var book = getBookById(gBookId)
    book.rate = rating
    _saveBooksToStorage();
}

function setSorting(sortingBy) {
    gSortBy = sortingBy
}

function getBooksBySorting(books) {

    if (gSortBy === 'PRICE') {
        books.sort(function (a, b) {
            return a.price - b.price
        })
    }

    if (gSortBy === 'NAME') {
        books.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            } if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    return books

}

function netxtPage() {
    gPageIdx++

    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }

}