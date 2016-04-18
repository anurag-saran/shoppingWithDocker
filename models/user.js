var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

/* The user attributes */
var UserSchema = new schema({
    email: { type: String, unique: true, lowercase:true},
    password: String,
    
    profile: {
        name: { type: String, default: ''},
        picture: {type: String, default: ''}
    },
    
    
    address: String,
    // Store purchase history
    history: [{
        date: Date,
        paid: {type: Number, default: 0},
        // item { type: Schema.Types.ObjectId, ref:
    }]    
});

//var user = new User();
//user.email

/* Hash the password before saving */

UserSchema.pre('save', function(next){
    var user = this;
    //If user is not modified ?
    if(!user.isModified('password')) return next(); 
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
})


/* compare password in the database in the database that the user typed */

UserSchema.methods.comparePassword = function(password) {
        return bccrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User', UserSchema);