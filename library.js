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
		return book;
	},

	addBook: function(title, author, genre, length){
		var book = new this.Book(title, author, genre, length, false);
		this.inventory.push(book);
		console.log("Book added!");
		this.mainMenu();
	},

	removeBook: function(choice){
		this.inventory.splice(choice, 1);
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
				this.addBookMenu();
				break;
			case 2:
				this.removeBookMenu();
				break;
			case 3:
				this.showInventory();
				break;
			case 4:
				this.sortByGenres();
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
	},

	addBookMenu: function(){
		var title = sget("ENTER TITLE OF NEW BOOK: ").trim();
		var author = sget("ENTER AUTHOR OF "+title+": ").trim();
		var genre = sget("ENTER GENRE OF "+title+": ").trim();
		var length= sget("ENTER LENGTH (in pages) OF "+title+": ").trim();

		this.addBook(title, author, genre, length);
		this.mainMenu();
	
	},

	removeBookMenu: function(){
		var inv = this.inventory;
		console.log("TYPE IN THE TITLE OF THE BOOK YOU WOULD LIKE TO REMOVE");
		this.showInventory(false);
		var choice = sget("> ").trim().toLowerCase();
		var validChoice = false;
		for(var i = 0; i < inv.length; i++){
			if (inv[i].title.toLowerCase() === choice){
				this.removeBook(i);
				validChoice = true;
			}
			else if (validChoice === false)
			{
				console.log("YOUR CHOICE WAS NOT VALID. TRY AGAIN.");
				this.removeBookMenu();
			}
		}
		this.mainMenu();
	},

	showInventory: function(){

		var inv = this.inventory;
		for(var i = 0; i < inv.length; i++){
			console.log("===================");
			console.log(inv[i].title+" BY "+inv[i].author+" || "+" GENRE: "+inv[i].genre+" || "+inv[i].length+" PAGES");
			console.log
		}
		console.log("===================");
		console.log("THAT IS ALL.");
		if (arguments.length === 0)
			this.mainMenu();
	},

	sortByGenres: function(){
		
		var inv = this.inventory;
		var fiction = [];
		var nonfiction = [];
		var other = [];

		for (var i = 0; i < inv.length; i++){
			
			if (inv[i].genre.toLowerCase() === 'fiction'){
				fiction.push(inv[i]);	
			} 
			else if(inv[i].genre.toLowerCase() === 'nonfiction' || inv[i].genre.toLowerCase() === 'non-fiction'){
			
				nonfiction.push(inv[i]);
			} 
			else
			{
				other.push(inv[i]);
			}
		}

		this.displayByGenres(fiction, nonfiction, other);

	},

	displayByGenres: function(fiction, nonfiction, other){
		
		console.log("|| FICTION: ");

		for (var i = 0; i <fiction.length; i++){
			console.log("===================");
			console.log(fiction[i].title+" BY "+fiction[i].author+" | "+fiction[i].length+" PAGES");
		}
		console.log("===================");
		console.log("|| NON-FICTION: ");

		for (var i = 0; i <nonfiction.length; i++){
			console.log("===================");
			console.log(nonfiction[i].title+" BY "+nonfiction[i].author+" | "+nonfiction[i].length+" PAGES");
		}

		console.log("===================");
		console.log("|| OTHER: ");
		for (var i = 0; i <other.length; i++){
			console.log("===================");
			console.log(other[i].title+" BY "+other[i].author+" | "+other[i].length+" PAGES");
			console.log("GENRE: "+other[i].genre);
		}
		console.log("===================");
		console.log("ARE YOU SATISFIED?");
		this.mainMenu();

	}
	
}

Library.mainMenu();