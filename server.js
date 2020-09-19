const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const config = require('config');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/users/auth.route');
const orderRoutes = require('./routes/orders/order.route');

//Socket IO
const orderSchema = require('./models/order.schema');
const userSchema = require('./models/user.schema');
const {getNextStep} = require('./helpers/order.helper');

io.on('connection', (socket) => {
    console.log('We have a new connection!')

    socket.on('join_to_order', ({ id }) => {

        socket.join(id);

        socket.on('order_message', async ({login, message}) => {

            const newMessage = {author: login, message};
            await orderSchema.findOneAndUpdate(
                {_id: id},
                {$push: {messages: newMessage}}
            );

            io.to(id).emit('order_updating');
        });

        socket.on('order_step', async () => {
            const currentOrder = await orderSchema.findById(id);
            const nextStep = getNextStep(currentOrder.status)

            const messageStep = {
                message: `The deal changed to status: ${nextStep}`
            }

            if (nextStep === 'Paid up') {
                const buyer = await userSchema.findOne({login: currentOrder.buyer})

                if (buyer.amount < currentOrder.totalAmount) {
                    return io.sockets.sockets[socket.id].emit('error_pay');
                }
                const updateBuyerBalance = Math.floor(buyer.amount - currentOrder.totalAmount);
                await userSchema.findOneAndUpdate({_id: buyer._id}, {$set: {amount: updateBuyerBalance}});
                io.sockets.sockets[socket.id].emit('balance_update_buyer');
            }

            if (nextStep === 'Completed') {
                const seller = await userSchema.findOne({login: currentOrder.seller})
                const updateSellerBalance = Math.floor(seller.amount + currentOrder.totalAmount);
                await userSchema.findOneAndUpdate({login: currentOrder.seller}, {$set: { amount: updateSellerBalance }})
                io.sockets.sockets[socket.id].emit('balance_update_seller');
            }

            await orderSchema.update({_id: { $in: [id]}},
                {
                    $set: {status: nextStep},
                    $push: {messages: messageStep}
                },
                {
                    multi: true
                }
            )
            io.to(id).emit('order_updating');
        });

        socket.on('order_cancel', async () => {
            await orderSchema.findOneAndUpdate(
                {_id: id},
                {$set: {status: 'Canceled'}}
            )
            io.to(id).emit('order_updating');
        });

        socket.on('disconnect', () => {
            console.log('user has left')
        })
    });
});

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
app.use('/api/deal', orderRoutes);

const PORT = config.get('app.port') || 5000;
server.listen(5000, () => {
    console.log('Server has been started on port 5000...')
});
