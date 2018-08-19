import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
// import Design
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
class Book extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    displayBook(){
        const { book } = this.props.data;
        console.log(book)
        if(book){
            return(
            <div>
                <Card>
                    <CardBody>
                    <CardTitle>{book.name}</CardTitle>
                    <CardSubtitle>{book.genre}</CardSubtitle>
                    <CardText>{book.author.name}</CardText>
                    </CardBody>
                </Card>
            </div>    
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                {this.displayBook() }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(Book);