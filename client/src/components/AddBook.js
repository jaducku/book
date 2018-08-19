import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries';

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
        <div>
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text"onChange={(e)=>this.setState({genre:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                        <option disabled>--select Author--</option>
                        {this.displayAuthor()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
