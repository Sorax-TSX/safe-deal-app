const router = require('express').Router();
const currency = require('currency.js');

const authMiddleware = require('../../middlewares/auth.middleware');

const modelUser = require('../../models/user.schema');
const modelOrder = require('../../models/order.schema');

/**
 * @route   GET api/order/:id
 * @desc    Get order by id
 * @access  Public
 */
router.get('/order/:id', authMiddleware, async (req, res) => {
    try {
        const { login } = req.body;
        const { id } = req.params;
        const order = await modelOrder.findById(id);

        if (!order) {
            return res.status(400).json({ message: 'Order not found' });
        }
        const access = order.seller === login || order.buyer === login;

        if (!access) {
            return res.status(400).json({message: 'Access denied!'})
        }

        res.json({ order })
    } catch (err) {
        throw err;
    }
});


/**
 * @route   GET api/deal/list/:login
 * @desc    Get all user orders
 * @access  Public
 */
router.get('/list/:login', authMiddleware, async (req, res) => {
    try {
        const { login } = req.params;

        const ordersAll = await modelOrder.find({})
            .select('-messages')
            .select('-tax')
            .select('-orderAmount')
            .select('-date');

        if (!ordersAll.length) {
            return res.json({ orderList: [] });
        }

        const userOrders = ordersAll
            .filter((order) => order.seller === login || order.buyer === login)
            .map(({ _id, description, seller, buyer, status, totalAmount: amount}) => ({
                _id,
                description,
                partner: login === seller ? buyer : seller,
                status,
                amount
            }));

        res.json({orderList: userOrders});
    } catch (err) {
        throw err;
    }
});

/**
 * @route   POST api/deal/new
 * @desc    Create new order
 * @access  Public
 */

router.post('/new', authMiddleware, async (req, res) => {
    try {
        let {description, initiator, role, partner, amount} = req.body;

        const orderPartner = await modelUser.findOne({login: partner});

        if (!orderPartner) {
            return res.status(400).json({message: 'No partner with this login was found'});
        }
        const partnerLogin = orderPartner.login;

        const initMessage = {
            author: 'Safe Deal',
            message: "Order has been successfully created. Order is in confirmation status, wait for confirmation from the second participant.",
            date: Date.now()
        }

        const orderAmount = Number(amount);
        const tax = Math.round(((orderAmount / 100) * 5));
        const totalAmount = Math.round(orderAmount + tax);

        const newOrder = new modelOrder({
            description,
            seller: role === 'seller' ? initiator : partnerLogin,
            buyer: role === 'buyer' ? initiator : partnerLogin,
            messages: [initMessage],
            status: "Confirmation",
            tax,
            orderAmount,
            totalAmount,
            date: Date.now()
        })

        await newOrder.save();

        res.status(201).json({message: 'Order create successfully'})
    } catch (err) {
        throw err;
    }
});

module.exports = router;
