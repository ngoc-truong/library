# Library

In this project, I built a simple book review page with HTML, CSS, and Javascript. 
It uses the local storage to save data on a user's computer (so no backend is implemented).
I built this project in order to review Javascript objects and HTML forms. This project
was part of the Javascript track on [The Odin Project](https://www.theodinproject.com/lessons/library), an open source online curriculum to learn full stack web development.

## Functionalities
- The user can upload his/her favorite books with his/her thoughts
- Basic validation is present
- The user can delete books
- The user can toogle a button, when he/she read a book

## Challenges
- The most difficult part was to figure out how to associate the book cards view with the data. I used the data-type html attribute to give each book card the associated index in the 
stored array.
- When submitting or deleting a card, the array should be updated and the cards data-type attribute accordingly. My solution was to remove all cards and re-render them with the new index and data-type.
