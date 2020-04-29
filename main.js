let myLibrary = [];

const titleInput    = document.querySelector("#title");
const authorInput   = document.querySelector("#author");
const pagesInput    = document.querySelector("#numOfPages");
const readInput     = document.querySelector("input[name='already-read']:checked");
const submitButton  = document.querySelector("#submit");
const form          = document.querySelector("#book-form");


// Book class
function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

Book.prototype.info = function() {
    let readMessage = "";

    if (this.read) {
        readMessage = "already read :)";
    } else {
        readMessage = "not read yet";
    }

    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${readMessage}.`;
}

// Helper functions
function handleForm(event) {
    event.preventDefault();
}

// Event listeners
submitButton.addEventListener("click", () => {
    let newBook = new Book( titleInput.value, 
                            authorInput.value, 
                            pagesInput.value, 
                            readInput.value);

    myLibrary.push(newBook);
    form.reset();
});

form.addEventListener("submit", handleForm);


