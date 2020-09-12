const router = require('express').Router();
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../../middlewares/auth.middleware');

const User = require('../../models/user.schema');

const JWT_SECRET = config.get('app.jwt_secret');

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Server 400: User is not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Server 400: Wrong login or password'})
        }

        const token = await jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "10h"});
        res.status(201).json({
            token,
            user: {
                id: user.id,
                login: user.login,
                status: user.status
            }
        })
    } catch (err) {
        throw err;
    }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
    try {
        const { login, email, password } = req.body;
        const userExist = await User.findOne({login});
        if (userExist) {
            return res.status(400).json({ message: 'User with this login is already registered' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            login,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'R\egistration completed successfully' })
    } catch (err) {
        throw err;
    }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const userData = await User.findById(user.id).select('-password');
        if (!userData) throw Error('User is not found');
        res.json(userData);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;
