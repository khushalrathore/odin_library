export const header = document.querySelector( "header" );
export const nav = document.querySelector( "nav" );
export const main = document.querySelector( "main" );
export const template = document.querySelector( "#bookTemplate" );

export const inputTitle = document.querySelector( "input#bookTitle" );
export const inputAuthor = document.querySelector( "input#bookAuthor" );
export const inputGenre = document.querySelector( "input#bookGenre" );
export const inputStatus = document.querySelector( "span#bookStatus" );

export const addBookButton = document.querySelector( "button#addBook" );

export const finishedReadingButton = document.querySelector( "button#readOption1.readOption" );
export const wantToReadButton = document.querySelector( "button#readOption2.readOption" );
export const currentlyReadingButton = document.querySelector( "button#readOption3.readOption" );

export const optionUl = document.querySelector( "ul.options" );
export const dropIcon = document.querySelector( ".dropIcon" );


document.addEventListener( 'click', ( event ) => {
    if ( nav.contains( event.target ) ) {
        if ( optionUl.style.display === "none" || optionUl.style.display === "" ) {
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
} );


finishedReadingButton.addEventListener( 'click', () => {
    inputStatus.textContent = finishedReadingButton.textContent;
} );

wantToReadButton.addEventListener( 'click', () => {
    inputStatus.textContent = wantToReadButton.textContent;
} );

currentlyReadingButton.addEventListener( 'click', () => {
    inputStatus.textContent = currentlyReadingButton.textContent;
} );
