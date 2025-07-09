const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        let user = await User.findOne( {email });
        if(user) {
            return res.status(400).json({message : 'User already exists'});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        user = new User ({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        //payload is essentially wt we want to serialis, thats just an user object 
        const payload = {
            user : {
                _id : user._id,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1h'});
        //these keys can be randomly generated and we could also use refresh tokens..
        res.status(201).json({token});

    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email});
        if(!user) return res.status(400).json({message : 'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

        const payload = {
            user : {
                _id: user._id,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : 'Server error'});
    }
};

