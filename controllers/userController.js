const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerLoad = async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'images/' + req.file.filename,
            password: passwordHash,
            is_online: false
        });

        await user.save();
        res.render('register', { message: 'Registration Completed Successfully!' });
    } catch (error) {
        console.log(error.message);
        res.render('register', { message: 'Registration Failed. Try Again.' });
    }
};

const loadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.render('login', { message: 'Email or Password is Incorrect!' });
        }

        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.render('login', { message: 'Email or Password is Incorrect!' });
        }

        req.session.user = userData;
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error.message);
        res.render('login', { message: 'An error occurred. Please try again.' });
    }

    exports.register = (req, res) => {
  const { nome, email, senha } = req.body;

  res.redirect('/login');
};

};

module.exports = {
    registerLoad,
    register,
    loadLogin,
    login
};
