const Order = require('./../../models/schemas/OrdersSchema');

//Gets
exports.getOrders = async (req, res) => {
    try {
        const conditions = {
            seller: req.SellerAuth._id
        }

        if (req.body.status && req.body.status !== '') {
            conditions.status = req.body.status
        }

        const options = [
            {
                populate: {
                    path: 'products',
                    select: 'title images banner'
                }
            },
            {
                populate: {
                    path: 'seller',
                    select: 'name email phoneNumber'
                }
            },
            {
                limit: 12,
            },
            {
                skip: req.body.skip ? req.body.skip : 0
            }
        ]

        if (req.body.sort && req.body.sort !== '') {
            Object.keys(req.body.sort).map(k => {
                if (req.body.sort[k] !== '') {
                    options.push(
                        {
                            sort: {
                                [k]: +req.body.sort[k]
                            }
                        }
                    )
                }
            })
        }

        const sellerByOrder = await Model._find(_Order, conditions, options)
        if (!sellerByOrder) throw new Error('No Orders')

        _.res(res, sellerByOrder, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//Get
exports.getOrder = async (req, res) => {
    try {
        const conditions = {
            _id: req.body.order,
            seller: req.SellerAuth._id
        }
        const options = [
            {
                populate: {
                    path: 'products',
                    select: 'title images banner'
                }
            },
            {
                populate: {
                    path: 'seller',
                    select: 'name email phoneNumber'
                }
            }
        ]

        const order = await Model._findOne(_Order, conditions, options)
        if (!order) throw new Error('No Orders')

        _.res(res, order, 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//Update Order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.body.order, req.body)

        res.status(200).json({
            status: 'success',
            data: order
        });

    } catch (error) {
        _.res(res, error.message, 404)
    }
}