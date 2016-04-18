var express =  require('express');

// library to log all user request
var morgan = require('morgan');

var mongoose =  require('mongoose');
var bodyParser    =  require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var User = require('./models/user');
var app = express();

//shoppingwithdocker
//dbuser
//Pass@123
//To connect using the mongo shell:
//mongo ds011291.mlab.com:11291/shoppingwithdocker -u <dbuser> -p <dbpassword>
//To connect using a driver via the standard MongoDB URI (what's this?):
//  mongodb://<dbuser>:<dbpassword>@ds011291.mlab.com:11291/shoppingwithdocker
                                                        
mongoose.connect('mongodb://root:abc123@ds011291.mlab.com:11291/shoppingwithdocker', function(err) {
  if(err) {
      console.log(err);
  } else {
      console.log("Connected to the database");
  }
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
//add ability to parser body and url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "anurag$@$@",

}));

app.use(flash());

app.engine('ejs',ejsmate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);


    app.listen(3000, function(err) {
    if(err) throw err;
    console.log("Server is running on port 3000");
});
