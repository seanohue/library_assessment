/*
The Library

You've been contracted to write a piece of software for the local library. The software needs to meet the following requirements:

- The software should track the library's inventory of books
- Each book listing should include the title, author, genre (Fiction, Non-Fiction, etc.), length, and checked-in/checked-out status
- Librarians should be able to:
a.) add books to the inventory
b.) remove books from the inventory 
c.) view a list of all the books in the library
d.) view a list of all the books in a given genre
e.) search for a book by title or author

BONUS: This is a library, so books can be checked in and checked out. Librarians should also be able to:

1.) Change the checked-in/checked-out status of a copy of a book
2.) Track the name of the person who has checked out a given book and the date when it is due
3.) Mark a book as overdue
4.) View a list of checked-in books only
*/

var Library = {

	inventory: [],

	Book: function(title, author, genre, length, checkedOut){
		var book = {};
		book.title = title;
		book.author = author;
		book.genre = genre;
		book.length = length;
		book.checkedOut = checkedOut;
	},

	

	addBook: function(title, author, genre, length){
		var book = new this.Book(title, author, genre, length, false);
		this.inventory.push(book);
		console.log("Book added!");
		this.mainMenu();
	},

	removeBook: function(choice){
		this.inventory.splice(choice,0);
		console.log ("Book removed!");
		this.mainMenu();
	},

	menu: function(message, choices) {
		console.log(message);
		for(var i = 0; i<choices.length; i++){
			
		}



	}

}