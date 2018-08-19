import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
// components
import Book from './Book';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null,
            colapse: false
        }
    }
      
    displayBooks(){
        var data = this.props.data;
        
        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            return data.books.map(book => {
                return (
                    <Book key={book.id} bookId={book.id}></Book>
                );
            })
        }
    }
    render(){
        return(
            <ul id="book-list">
                { this.displayBooks() }
            </ul>
        );
    }
}

export default graphql(getBooksQuery)(BookList);