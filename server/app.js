const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const orders = require('./routes/api/orders');
const vendors = require('./routes/api/vendors');
const profiles = require('./routes/api/profile');
const app = express();

// connect to MongoDB Atlas Cloud Database
connectDB();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting header information
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api', orders);
app.use('/api/users', users);
app.use('/api/vendors/', vendors);
app.use('/api/profiles/', profiles);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));