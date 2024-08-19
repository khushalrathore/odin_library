import * as theme from "./scripts/theme.js";
import * as util from "./scripts/utilities.js";
import {
  main, template, inputTitle,
  inputAuthor,
  inputGenre,
  inputStatus,
  addBookButton
} from "./scripts/elements.js";

const myLibrary = [];
document.addEventListener( 'DOMContentLoaded', () => {
  loadLibraryFromLocalStorage();  //local state preserve even after loading
} );

function saveLibraryToLocalStorage () {
  localStorage.setItem( 'myLibrary', JSON.stringify( myLibrary ) );
}

class Book {
  constructor ( title, author, genre, status ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
  }
}

function addBookToLibrary ( title, author, genre, status ) {
  const newBook = new Book( title, author, genre, status );
  myLibrary.push( newBook );
  displayBook( newBook, myLibrary.length - 1 );
  saveLibraryToLocalStorage();
}

const handleAddBook = () => {
  const title = [ util.shortenText( inputTitle.value, 20 ), inputTitle.value ];
  const author = [ util.shortenText( inputAuthor.value, 20 ), inputAuthor.value ];
  const genre = [ util.shortenText( inputGenre.value, 20 ), inputGenre.value ];
  const status = inputStatus.textContent || "Currently Reading";

  if ( title[ 1 ].length >= 2 && author[ 1 ].length >= 2 && genre[ 1 ].length >= 2 ) {
    addBookToLibrary( title, author, genre, status );
    inputTitle.value = '';
    inputAuthor.value = '';
    inputGenre.value = '';
  }
};

addBookButton.addEventListener( 'click', handleAddBook );

export function loadLibraryFromLocalStorage () {
  const savedLibrary = localStorage.getItem( 'myLibrary' );
  if ( savedLibrary ) {
    const books = JSON.parse( savedLibrary );
    books.forEach( ( book, index ) => {
      displayBook( book, index );
    } );
    myLibrary.splice( 0, myLibrary.length, ...books );
  }
}

function displayBook ( book, index ) {
  console.log( 'Displaying book:', book ); // Debug output

  const { light, dark } = theme.colors[ index % theme.colors.length ];

  const clone = template.content.cloneNode( true );

  const bookWrapper = clone.querySelector( ".bookCardWrapper" );
  bookWrapper.style.background = `linear-gradient(${ light }, ${ dark })`;

  const titleSpan = clone.querySelector( ".titleInfo" );
  titleSpan.textContent = book.title[ 0 ].trim();
  titleSpan.setAttribute( 'title', book.title[ 1 ] );

  const authorSpan = clone.querySelector( ".authorInfo" );
  authorSpan.textContent = book.author[ 0 ].trim();
  authorSpan.setAttribute( 'title', book.author[ 1 ] );

  const genreSpan = clone.querySelector( ".genreInfo" );
  genreSpan.textContent = book.genre[ 0 ].trim();
  genreSpan.setAttribute( 'title', book.genre[ 1 ] );

  const statusSpan = clone.querySelector( ".readInfo" );
  statusSpan.textContent = book.status;
  statusSpan.setAttribute( "class", "readInfo" );

  const deleteBtn = clone.querySelector( ".del" );
  const bookCard = clone.querySelector( "div.BOOK" );

  main.appendChild( clone );



  if ( statusSpan.textContent === "Finished Reading" ) {
    statusSpan.classList.add( "finishedReading" );
  } else if ( statusSpan.textContent === "Currently Reading" ) {
    statusSpan.classList.add( "currentlyReading" );
  } else if ( statusSpan.textContent === "Want to Read" ) {
    statusSpan.classList.add( "wantToRead" );
  }


  deleteBtn.addEventListener( 'click', () => {
    bookCard.remove();

    const index = myLibrary.indexOf( book );
    if ( index > -1 ) {
      myLibrary.splice( index, 1 );
      saveLibraryToLocalStorage();
    }
  } );
}

