import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [
        { id: 1, price: 100 },
        { id: 2, price: 111 },
        { id: 3, price: 112 },
        { id: 4, price: 111 },
      ],
    };
  }
  handleBook() {
      const newBook = {id:5,price:1330};
      const books = [...this.state.books]
      books.push(newBook);
      this.setState({books: books});
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        App
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.price}</li>
          ))}
          <button onClick={() => this.handleBook()}>按钮</button>
        </ul>
      </div>
    );
  }
}

export default App;
