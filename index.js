const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const connectDB=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended: true}));
app.use(express.static('./assets'));
// app.use(expressLayouts);
// app.set('layout extractStyles',true);

// app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'empreviews',
    //todo : cahnge the secret before deploying
    secret: "blahblahblah",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:"mongodb+srv://10442rishika:jtAJfmDJnKhxSziG@cluster0.coclkau.mongodb.net/test",
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo-db-setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.use('/',require('./routes/index'));




 const start = async() =>{
    try {
        const url = 'mongodb+srv://10442rishika:jtAJfmDJnKhxSziG@cluster0.coclkau.mongodb.net/test';
        await connectDB(url);
        app.listen(port,function(){
            // console.log(__dirname+'/uploads');
            console.log("connected to DB")
            console.log(`Server running at port: ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}
start();
