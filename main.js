class Book {
  constructor(title, author, series, info, read) {
    this.title = title;
    this.author = author;
    this.series = series;
    this.info = info;
    this.read = read;
  }
}

let myLibrary = [];

const container = document.querySelector('.container');
const form = document.querySelector('.form__popup');
const showFormButton = document.querySelector('.show__form');

const showForm = () => {
  form.style.display = 'block';
  showFormButton.style.display = 'none';
};

const hideForm = () => {
  form.style.display = 'none';
  showFormButton.style.display = 'inline-block';
};

const clearBooksFromDOM = () => {
  container.innerHTML = '';
};

function addBookToLibrary() {
  const bookTitle = document.querySelector('input[name=book__title]').value;
  const author = document.querySelector('input[name=book__author]').value;
  const series = document.querySelector('input[name=book__series]').value;
  const info = document.querySelector('textarea[name=book__info]').value;
  const readStatus = document.querySelector(
    'input[name=book__read-status]'
  ).checked;
  let newBook = new Book(bookTitle, author, series, info, readStatus);
  myLibrary.push(newBook);
  clearBooksFromDOM();
  populateDOM(myLibrary);
  form.style.display = 'none';
  showFormButton.style.display = 'inline-block';
}

const populateDOM = (array) => {
  array.forEach((book) => {
    //book wrapper
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book__container');
    container.appendChild(bookContainer);
    //individual book
    const bookHeading = document.createElement('h2');
    bookHeading.classList.add('book__title');
    bookHeading.textContent = book.title;
    bookContainer.appendChild(bookHeading);
    const bookAuthor = document.createElement('h3');
    bookAuthor.classList.add('book__author');
    bookAuthor.textContent = `By ${book.author}`;
    bookContainer.appendChild(bookAuthor);
    const bookSeries = document.createElement('h4');
    bookSeries.classList.add('book__series');
    bookSeries.innerHTML = `<em>${book.series}</em>`;
    bookContainer.appendChild(bookSeries);
    const bookDescription = document.createElement('p');
    bookDescription.classList.add('book__description');
    bookDescription.textContent = book.info;
    bookContainer.appendChild(bookDescription);
    const readStatus = document.createElement('div');
    if (book.read) {
      readStatus.textContent = 'Read: ✔';
    } else {
      readStatus.textContent = 'Read: ❌';
    }
    bookContainer.appendChild(readStatus);
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('remove__btn--container');
    bookContainer.appendChild(optionsContainer);
    // remove button
    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove';
    removeBook.addEventListener('click', () => {
      removeBookFromLibrary(book);
      bookContainer.remove();
    });
    removeBook.classList.add('btn');
    optionsContainer.appendChild(removeBook);
    // change read status
    const readButton = document.createElement('button');
    readButton.classList.add('btn');
    readButton.textContent = 'Read?';
    readButton.addEventListener('click', () => {
      book.read = !book.read;
      readStatus.textContent = `${book.read ? 'Read: ✔' : 'Read: ❌'}`;
      console.log(book);
    });
    optionsContainer.appendChild(readButton);
  });
};

const removeBookFromLibrary = (book) => {
  const bookIndex = myLibrary.findIndex((item) => item === book);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
};

//form

const bookReview = document.getElementById('book__info');

bookReview.addEventListener('input', (event) => {
  if (bookReview.validity.tooShort) {
    bookReview.setCustomValidity(
      `This information container is expecting a minimum of 20 characters! You have typed ${event.target.value.length} characters.`
    );
  } else if (bookReview.validity.tooLong) {
    bookReview.setCustomValidity(
      `This information container is expecting a maximum of 200 characters. You have typed ${
        event.target.value.length
      } characters. You are over by ${event.target.value.length - 200}`
    );
  } else {
    bookReview.setCustomValidity('');
  }
});
