const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//* Set up validation for schema

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const userSchema = new Schema({
	username: {
		type: String,
		trim: true,
		required: 'Name is required',
		unique: true
	},
    firstname: {
		type: String,
		trim: true,
		required: 'Name is required'
	},
    lastname: {
		type: String,
		trim: true,
		required: 'Name is required'
	},
    title: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: 'Email address is required',
		unique: true,
		validate: [ validateEmail, 'Please use a valid email address' ],
	},
    phones : 
    [
        {
            tags : [ String ],
            number : String ,
            notes : String
        }
    ],
	password: {
		type: String,
		minLength: [ 8, 'You need a longer password' ],
		required: 'You must provide a valid password',
		//trim: true
	},
    bio: {
		type: String
	},
	picture: {
		type: String
	},
	date_joined: {
        type: Date,
        default: Date.now,
		get: (timestamp) => dateFormat(timestamp)
	},

});

userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
	  const saltRounds = 10;
	  this.password = await bcrypt.hash(this.password, saltRounds);
	}
  
	next();
  });
  
  // custom method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;


// {
//     tags : [ "home" ] ,
//     number : "514994xxxx" ,
// } ,
// {
//   tags : [ "office" , "daytime" ] ,
//   number : "8199999xxx" ,
//   remark : "Do not leave message call cell"
// }
// {
//   tags : [ "cell" ] ,
//   number : "...." ,
//   remark : "If weekend and urgent try boat"
// }
// {
//   tags : [ "boat" ] ,
//   number : "...." ,
//   remark : "Urgent only"
// }