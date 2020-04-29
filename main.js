let myLibrary = [];

const titleInput        = document.querySelector("#title");
const authorInput       = document.querySelector("#author");
const descriptionInput  = document.querySelector("#description");
const cover             = document.querySelector("#cover");
const submitButton      = document.querySelector("#submit");
const form              = document.querySelector("#book-form");
const feedback          = document.querySelector("#feedback");
const mainContent       = document.querySelector("#main");
let deleteButtons       = document.querySelectorAll(".delete");     // Empty at the beginning

// Book class
function Book(title, author, description, read, url) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.read = read;
    this.cover = url;
}

Book.prototype.info = function() {
    let readMessage = "";

    if (this.read) {
        readMessage = "already read :)";
    } else {
        readMessage = "not read yet";
    }

    return `${this.title} by ${this.author}, ${this.description} pages, ${readMessage}.`;
}

// Create instances
let book1 = new Book("Mister Aufziehvogel", "Haruki Murakami", "Tralalala", true, "https://bit.ly/2YhgMAt");
let book2 = new Book("Kafka am Strand", "Haruki Murakami", "Guter Ebay, gerne wieder", true, "https://bit.ly/3bPpD0h");
let book3 = new Book("Der Idiot", "Fjodor Dostojewski", "Nice one!", true, "https://bit.ly/2xgJMNA");

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

// Helper functions
function addBookToLibrary(){
    let readInput = document.querySelector("input[name='already-read']:checked");
    let alreadyRead; 

    if (readInput === null) {
        alreadyRead = "not answered";
    } else {
        alreadyRead = readInput.value;
    }

    let newBook = new Book( titleInput.value, 
                            authorInput.value, 
                            descriptionInput.value, 
                            alreadyRead,
                            cover.value);
    myLibrary.push(newBook);
}

function addFeedback(lib){
    let lastBookTitle = lib[lib.length - 1].title;
    feedback.textContent = `Awesome! You added the book ${lastBookTitle} to the library.`;
}

function handleForm(event) {
    event.preventDefault();
}

function render(targetDom, obj, index){
    let card        = document.createElement("div");
    let cardTitle   = document.createElement("p");
    let cardAuthor  = document.createElement("p");
    let cardPages   = document.createElement("p");
    let cardRead    = document.createElement("button");
    let cardDelete  = document.createElement("button");
    let cardCover   = document.createElement("img");

    cardTitle.textContent   = obj.title;
    cardAuthor.textContent  = obj.author;
    cardPages.textContent   = obj.description;
    cardRead.textContent    = obj.read;
    cardDelete.textContent  = "Delete book";
    cardDelete.dataset.index = index;
    cardDelete.classList.add("delete");
    cardDelete.id           = `delete-${index}`;
    cardCover.src           = obj.cover;

    card.append(cardDelete, cardTitle, cardAuthor, cardPages, cardRead, cardCover);

    targetDom.appendChild(card);
}

function renderAll(targetDom, array){
    for (let i = array.length - 1; i >= 0; i--){
        render(targetDom, array[i], i);
    }
}

function removeAll(targetDom){
    while(targetDom.firstChild){
        targetDom.removeChild(targetDom.lastChild);
    }
}

// Event listeners
submitButton.addEventListener("click", () => {
    addBookToLibrary();
    addFeedback(myLibrary);
    removeAll(mainContent);
    renderAll(mainContent, myLibrary);
    form.reset();
});

form.addEventListener("submit", handleForm);

renderAll(mainContent, myLibrary);


// BUG HERE!
deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach( (button) => {
    button.addEventListener("click", (e) => {
        console.log(button.dataset.index);
        let indexOfBook = button.dataset.index;
        myLibrary.splice(indexOfBook, 1);
        removeAll(mainContent);
        renderAll(mainContent, myLibrary);
    });
});

deleteButtons = document.querySelectorAll(".delete");

deleteButtons = document.querySelectorAll(".delete");

/* TO DO
- Deleting of books does not work. When deleting and changing a book in the array
- The newly rendered deleteButtons are not query selected... :/.
*/