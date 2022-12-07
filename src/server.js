const express = require('express');
const app = express();
const route = require('./route');

//port setting
app.set('port', process.env.PORT || 3000);

//using middleware 'use'
app.use(express.json());

app.use('/api',route);

app.listen(app.get('port'),() =>{
    console.log('port is starting,'+app.get('port'));
})
