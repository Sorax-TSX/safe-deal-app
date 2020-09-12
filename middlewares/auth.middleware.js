const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('app.jwt_secret');

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({message: 'Not a valid token, log in again'});
    }
}

module.exports = authMiddleware;
