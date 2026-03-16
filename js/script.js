/* -------------- DOM ---------------- */

const shelf = document.querySelector(".shelf");

const modal = document.querySelector(".modal");
const newBookBtn = document.querySelector(".header__add-book");

const form = document.querySelector(".modal__form");
const titleInput = form.querySelectorAll(".modal__input")[0];
const authorInput = form.querySelectorAll(".modal__input")[1];
const pagesInput = form.querySelectorAll(".modal__input")[2];
const readInput = form.querySelector(".modal__checkbox input");

/* ------------------- Program ---------------- */

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

let library = [];

newBookBtn.addEventListener("click", (e) => {
  modal.showModal();
});

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book");
  card.dataset.id = book.id;

  const details = document.createElement("div");
  details.classList.add("book__details");

  const title = document.createElement("span");
  title.classList.add("book__title");
  title.textContent = book.title;

  const author = document.createElement("span");
  author.classList.add("book__author");
  author.textContent = book.author;

  const pages = document.createElement("span");
  author.classList.add("book__pages");
  pages.textContent = `${book.pages} pages`;

  details.append(title, author, pages);

  const controls = document.createElement("div");
  controls.classList.add("book__controls");

  const statusLabel = document.createElement("label");
  statusLabel.classList.add("book__status");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("book__checkbox");
  checkbox.checked = book.read;

  statusLabel.append(checkbox, " Read");

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("book__remove");
  removeBtn.textContent = "Remove";

  controls.append(statusLabel, removeBtn);

  card.append(details, controls);

  return card;
}

function renderLibrary() {
  shelf.textContent = "";

  library.forEach((book) => {
    const card = createBookCard(book);
    shelf.appendChild(card);
  });

  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library));
}

function loadLibrary() {
  const data = localStorage.getItem("library");

  if (data) library = JSON.parse(data);

  renderLibrary();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked,
  );

  library.push(newBook);

  renderLibrary();

  form.reset();
  modal.close();
});

shelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("book__remove")) {
    const card = e.target.closest(".book");
    const id = card.dataset.id;

    library = library.filter((book) => book.id !== id);

    renderLibrary();
  }
});

loadLibrary();
