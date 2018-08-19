import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class AddBook extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:'',
            genre:'',
            authorId:''
        }
    }
    displayAuthor = () => {
        let data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors...</option>);
        }else{
            return data.authors.map(author=>{
                return(<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(!(this.state.authorId==="none" || this.state.authorId==="")){
            this.props.addBookMutation({
                variables:{
                    name:this.state.name,
                    genre:this.state.genre,
                    authorId:this.state.authorId
                },
                refetchQueries:[{
                    query:getBooksQuery
                }]
            });
        }else{
            console.log("저장불가!!");
        }
    }

    render = () => {
        return (
            <Form>
            <FormGroup>
            <Label for="bookName">Book Name</Label>
            <Input type="input" name="bookName" id="bookName" placeholder="Insert book name here!" />
            </FormGroup>
            <FormGroup>
            <Label for="bookGenre">Password</Label>
            <Input type="input" name="bookGenre" id="bookGenre" placeholder="Insert book genre here!" />
            </FormGroup>
            <FormGroup>
            <Label for="authors">Select</Label>
            <Input type="select" name="authors" id="authors">
                <option disabled>--select Author--</option>
                {this.displayAuthor()}
            </Input>
            </FormGroup>
            <Button color="primary" size="lg" block>Add</Button>
        </Form>                
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
