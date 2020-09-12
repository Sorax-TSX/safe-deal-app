const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

//Routes
const authRoutes = require('./routes/users/auth.route');

//Middleware
app.use(express.json());
app.use(cors());


const MONGO_URI = config.get('database.mongo_uri');

(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log('Mongoose has been connected...'));
    } catch (error) {
        console.log('Server Error: ', error.message)
        process.exit(1)
    }
})();

//Use Routes
app.use('/api/user', authRoutes);

const PORT = config.get('app.port') || 5000;
app.listen(5000, () => {
    console.log('Server has been started on port 5000...')
});
