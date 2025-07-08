const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true}, //You don’t want two users to register with the same email. It acts as a unique identifier for the account, along with the _id.
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('User', userSchema);
//It creates a mongoose model called 'User' using the userSchema and exports it so you can require it in other files.