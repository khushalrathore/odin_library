const inputTitle = document.querySelector("input#bookTitle");
const inputAuthor = document.querySelector("input#bookAuthor");
const inputGenre = document.querySelector("input#bookGenre");
const inputStatus = document.querySelector("span#bookStatus");
const addBookButton = document.querySelector("button#addBook");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const finishedReadingButton = document.querySelector("button#readOption1.readOption");
const wantToReadButton = document.querySelector("button#readOption2.readOption");
const currentlyReadingButton = document.querySelector("button#readOption3.readOption");
const optionUl = document.querySelector("ul.options");
const dropIcon = document.querySelector(".dropIcon");

const myLibrary = [];

addBookButton.addEventListener('click', () => {
  const shortenText = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const title = [shortenText(inputTitle.value, 16), inputTitle.value];
  const author = [shortenText(inputAuthor.value, 16), inputAuthor.value];
  const genre = [shortenText(inputGenre.value, 14), inputGenre.value];
  const status = inputStatus.textContent || "Currently Reading";

  if (title[1].length >= 2 && author[1].length >= 2 && genre[1].length >= 2) {
    addBookToLibrary(title, author, genre, status);
    inputTitle.value = '';
    inputAuthor.value = '';
    inputGenre.value = '';
  }
});

function saveLibraryToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

class Book {
  constructor(title, author, genre, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
  }
}

function loadLibraryFromLocalStorage() {
  const savedLibrary = localStorage.getItem('myLibrary');
  if (savedLibrary) {
    const books = JSON.parse(savedLibrary);
    books.forEach((book, index) => {
      displayBook(book, index);
    });
    myLibrary.splice(0, myLibrary.length, ...books);
  }
}

function addBookToLibrary(title, author, genre, status) {
  const newBook = new Book(title, author, genre, status);
  myLibrary.push(newBook);
  displayBook(newBook, myLibrary.length - 1);
  saveLibraryToLocalStorage();
}

function displayBook(book, index) {
  const colors = [
    { light: `rgb(106, 160, 26)`, dark: `rgb(0, 60, 0)` },
    { light: `rgb(255, 87, 34)`, dark: `rgb(139, 0, 0)` },
    { light: `rgb(33, 150, 243)`, dark: `rgb(0, 0, 139)` },
    { light: `rgb(255, 193, 7)`, dark: `rgb(139, 69, 19)` },
    { light: `rgb(156, 39, 176)`, dark: `rgb(75, 0, 130)` },
    { light: `rgb(0, 188, 212)`, dark: `rgb(0, 100, 100)` },
    { light: `rgb(76, 175, 80)`, dark: `rgb(34, 139, 34)` },
    { light: `rgb(255, 235, 59)`, dark: `rgb(128, 128, 0)` },
    { light: `rgb(233, 30, 99)`, dark: `rgb(139, 0, 139)` },
    { light: `rgb(121, 85, 72)`, dark: `rgb(80, 50, 30)` }
  ];

  const color = colors[index % colors.length];
  if (!color) {
    console.error('Color is undefined for index:', index);
    return;
  }

  const template = document.querySelector("#bookTemplate");
  const main = document.querySelector("main");

  const clone = template.content.cloneNode(true);
  const bookWrapper = clone.querySelector(".bookCardWrapper");
  const titleSpan = clone.querySelector(".titleInfo");
  const authorSpan = clone.querySelector(".authorInfo");
  const genreSpan = clone.querySelector(".genreInfo");
  const statusSpan = clone.querySelector(".readInfo");
  const deleteBtn = clone.querySelector(".del");
  const bookCard = clone.querySelector("div.BOOK");

  bookWrapper.style.background = `linear-gradient(${color.light}, ${color.dark})`;
  titleSpan.textContent = book.title[0].trim();
  authorSpan.textContent = book.author[0].trim();
  genreSpan.textContent = book.genre[0].trim();
  statusSpan.textContent = book.status;

  statusSpan.className = "readInfo";
  titleSpan.setAttribute('title', book.title[1]);
  authorSpan.setAttribute('title', book.author[1]);
  genreSpan.setAttribute('title', book.genre[1]);

  if (statusSpan.textContent === "Finished Reading") {
    statusSpan.classList.add("finishedReading");
  } else if (statusSpan.textContent === "Currently Reading") {
    statusSpan.classList.add("currentlyReading");
  } else if (statusSpan.textContent === "Want to Read") {
    statusSpan.classList.add("wantToRead");
  }

  main.appendChild(clone);

  deleteBtn.addEventListener('click', () => {
    bookCard.remove();

    const index = myLibrary.indexOf(book);
    if (index > -1) {
      myLibrary.splice(index, 1);
      saveLibraryToLocalStorage();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  header.classList.add('header-background');
  loadLibraryFromLocalStorage();
});

document.addEventListener('click', (event) => {
  if (nav.contains(event.target)) {
    if (optionUl.style.display === "none" || optionUl.style.display === "") {
      dropIcon.style.transform = "scaleY(-1)";
      optionUl.style.display = "flex";
    } else {
      dropIcon.style.transform = "scaleY(1)";
      optionUl.style.display = "none";
    }
  } else {
    dropIcon.style.transform = "scaleY(1)";
    optionUl.style.display = "none";
  }
});

finishedReadingButton.addEventListener('click', () => {
  inputStatus.textContent = finishedReadingButton.textContent;
});

wantToReadButton.addEventListener('click', () => {
  inputStatus.textContent = wantToReadButton.textContent;
});

currentlyReadingButton.addEventListener('click', () => {
  inputStatus.textContent = currentlyReadingButton.textContent;
});
