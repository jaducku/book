const express = require('express');
const graphqlServer = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const db_config  = require('./config/db-config.json');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect(db_config.uri);
mongoose.connection.once('open',()=>{
    console.log('connected to database');
});

app.use('/graphql',graphqlServer({
    schema,
    graphiql:true
}));

app.listen(4000,() => {
    console.log('Sever Started on port 4000!!')
});
