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

var sget = require('sget');

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
			console.log((i+1)+") "+choices[i]);
		};

		return this.handleInput(choices.length);
	},

	handleInput: function(maxChoice){
		var choice = parseInt(sget("Please enter your choice: ").trim());
		if (isNaN(choice) || choice > maxChoice || choice < 1){
			console.log("Please enter the number corresponding to your choice.");
			return this.handleInput(maxChoice);
		} else
			return choice;
	},

	mainMenu: function(){
		var choice = this.menu("BOOKS ARE GOOD || READ BOOKS NOW OK\nWELCOME, LIBRARIAN || SELECT OPTION\n===============================",["Add a book to the inventory","Remove a book from the inventory","View inventory","View genres","Search inventory", "Quit"]);
		switch(choice){
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				console.log("GO READ A BOOK");
				process.exit(0);
				break;
			default:
				console.log("ERROR");
				process.exit(1);
		}
	}

	addBookMenu(){
		var title = sget("ENTER TITLE OF NEW BOOK: ");
		var author = sget("ENTER AUTHOR OF %s: ",title);
		var genre = sget("ENTER GENRE OF %s: ", title);
		var length= sget("ENTER LENGTH (in pages) OF %s: ", title);

		this.addBook(title, author, genre, length);
		
	}

}

Library.mainMenu();