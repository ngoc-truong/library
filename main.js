let myLibrary = [];

const titleInput        = document.querySelector("#title");
const authorInput       = document.querySelector("#author");
const descriptionInput  = document.querySelector("#description");
const cover             = document.querySelector("#cover");
const submitButton      = document.querySelector("#submit");
const form              = document.querySelector("#book-form");
const radioRead         = document.querySelector("#read");
const radioUnread       = document.querySelector("#unread");
const feedback          = document.querySelector("#feedback");
const mainContent       = document.querySelector("#main");
let deleteButtons       = document.querySelectorAll(".delete");     // Empty at the beginning
let readButtons         = document.querySelectorAll(".read");       // Empty at the beginning

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
let text1 = "I'm baby viral blue bottle neutra, kombucha yuccie celiac vaporware tote bag hoodie. Blue bottle before they sold out lyft church-key, single-origin coffee readymade yuccie man braid fam adaptogen affogato scenester. Chillwave cloud bread mumblecore affogato selvage williamsburg la croix. Umami austin occupy helvetica, four dollar toast disrupt adaptogen sustainable migas tacos authentic. Chicharrones letterpress banjo man bun vaporware";
let text2 = "Master cleanse leggings viral aesthetic actually humblebrag literally PBR&B. Street art blog palo santo meh. Trust fund 8-bit glossier offal semiotics hot chicken tacos cliche, vice master cleanse asymmetrical. Snackwave hashtag lomo meh deep v VHS vaporware ennui food truck you probably haven't heard of them.";
let text3 = "Taiyaki vice slow-carb flexitarian offal crucifix dreamcatcher cray. Butcher disrupt humblebrag everyday carry, letterpress godard dreamcatcher shabby chic la croix poutine schlitz umami taiyaki tacos franzen. Ennui kitsch post-ironic fam, offal migas salvia 8-bit put a bird on it roof party XOXO. Banh mi cray roof party shabby chic, try-hard chia waistcoat +1 health goth. Adaptogen marfa portland, poutine slow-carb bespoke listicle gentrify.";
let book1 = new Book("Mister Aufziehvogel", "Haruki Murakami", text1, true, "https://bit.ly/2YhgMAt");
let book2 = new Book("Kafka am Strand", "Haruki Murakami", text2, true, "https://bit.ly/3bPpD0h");
let book3 = new Book("Der Idiot", "Fjodor Dostojewski", text3, true, "https://bit.ly/2xgJMNA");

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
    // Create DOM elements
    let card            = document.createElement("div");
    let cardDelete      = document.createElement("button");
    let cardCover       = document.createElement("img");
    let cardRead        = document.createElement("button");
    let cardTitle       = document.createElement("h1");
    let cardAuthor      = document.createElement("h2");
    let cardDescription = document.createElement("p");

    // Fill DOM with content
    cardDelete.textContent      = "x";
    cardDelete.dataset.index    = index;
    cardDelete.id               = `delete-${index}`;
    cardRead.textContent        = obj.read ? "Already read :)" : "Unread yet :(";
    cardRead.dataset.index      = index;
    cardRead.id                 = `read-${index}`;
    cardTitle.textContent       = obj.title;
    cardCover.src               = obj.cover;
    cardAuthor.textContent      = `by ${obj.author}`;
    cardDescription.textContent = obj.description;

    card.classList.add("card");
    cardDelete.classList.add("delete");
    cardRead.classList.add("read");
    cardTitle.classList.add("book-title");
    cardCover.classList.add("book-cover");
    cardAuthor.classList.add("book-author");
    cardDescription.classList.add("book-description");

    // Create and set wrappers
    let wrapperOptions  = document.createElement("div");
    let wrapperText     = document.createElement("div");
    wrapperOptions.classList.add("wrapper-options");
    wrapperText.classList.add("wrapper-text");

    // Append DOMs
    wrapperOptions.append(cardRead, cardDelete);
    wrapperText.append(cardTitle, cardAuthor, cardDescription);
    card.append(wrapperOptions, cardCover, wrapperText);
    targetDom.appendChild(card);
}

function renderAll(targetDom, array){
    for (let i = array.length - 1; i >= 0; i--){
        render(targetDom, array[i], i);
    }
    deleteButtons   = document.querySelectorAll(".delete");
    readButtons     = document.querySelectorAll(".read");
    refreshDeleteButtons();
    refreshReadButtons();
}

function removeAll(targetDom){
    while(targetDom.firstChild){
        targetDom.removeChild(targetDom.lastChild);
    }
}

// Event listeners
submitButton.addEventListener("click", () => {
    if (contentPresent()){
        addBookToLibrary();
        addFeedback(myLibrary);
        removeAll(mainContent);
        renderAll(mainContent, myLibrary);
        form.reset();
    } else {
        alert("I know, I can be a bit annoying. Sorry :(. But you need to fill out the form completely.");
    }

});

form.addEventListener("submit", handleForm);

renderAll(mainContent, myLibrary);

function refreshDeleteButtons(){
    deleteButtons.forEach( (button) => {
        button.addEventListener("click", (e) => {
            if (confirm("Man, I need to bother you again :(. But are you sure, you want to delete this book? Like for real?")){
                let indexOfBook = button.dataset.index;
                myLibrary.splice(indexOfBook, 1);
                removeAll(mainContent);
                renderAll(mainContent, myLibrary);
            }
        });
    });
}

function refreshReadButtons(){
    readButtons.forEach( (button) => {
        button.addEventListener("click", (e) => {
            let indexOfBook = button.dataset.index;

            if (myLibrary[indexOfBook].read){
                button.textContent = "Unread yet :(";
                myLibrary[indexOfBook].read = false;
                button.classList.add("unread");
            } else {
                button.textContent = "Already read :)";
                myLibrary[indexOfBook].read = true;
                button.classList.remove("unread");
            }
        })
    })
}

function contentPresent(){
    if (titleInput.value === "" || 
        authorInput.value === "" || 
        descriptionInput.value === "" ||
        cover.value === "" ||
        (radioRead.checked === false && radioUnread.checked === false))
    {
        return false;
    } else {
        return true;
    }
}
/* TO DO
- Read/Unread button
- Validations for form
*/