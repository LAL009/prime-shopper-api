exports.doAdd = async (req, res) => {
    try {
        req.body = _._form(req.body);
        var required = ["products", "seller", "subtotal", "discount"]
        var validate = _._checkFields(req.body, required)
        if (validate !== true) throw new Error(validate.message)
        req.body.total = req.body.subtotal - (req.body.subtotal * req.body.discount) / 100
        console.log("validate", req.body.products);
        // if (req.body.products) {
        //     req.body.products = JSON.parse(req.body.products)
        // }        

        req.body.user = req.Auth._id
        req.body.orderNumber = await _._generateToken(8, 'numeric')
        const order = await Model._create(_Order, req.body)
        console.log("order", order);
        _.res(res, order, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.Orders = async (req, res) => {
    try {
        const conditions = {
            user: req.Auth._id
        }
        const options = [
            {
                populate: {
                    path: 'products.product',
                    populate: {
                        path: 'category',
                        select: 'name banner type'
                    }
                }
            },
            {
                populate: {
                    path: 'seller',
                    select: 'name'
                }
            },
            {
                populate: {
                    path: 'user',
                    select: 'name username phoneNumber'
                }
            }
        ]
        var search = new RegExp(req.body.search, 'gi');
        if (req.body.search) {
            conditions['$where'] = `function() { return this.note.match(${search}) != null || this.subtotal.match(${search}) != null || this.discount.match(${search}) != null || this.total.toString().match(${search}) != null || this.status.match(${search}) != null || 
            this.createdAt.toString().match(${search}) != null;}`
        }
        const orders = await Model._find(_Order, conditions, options, {})
        if (!orders) throw new Error('Empty orders')

        _.res(res, orders, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.removeOrder = async (req, res) => {
    try {
        const conditions = {
            _id: req.body.order,
            user: req.Auth._id
        }
        const order = await Model._findOne(_Order, conditions, {}, false)
        if (!order) throw new Error('Oops! Something went wrong,Maybe already removed')

        order.remove()

        _.res(res, 'Successfully removed', 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const condition = {
            user: req.Auth._id,
            _id: req.body.order
        }

        const order = await Model._findOne(_Order, condition, {}, false)
        if (!order) throw new Error('Invalid Arguments')

        order.status = 'Cancelled'

        var updatedOrder = await order.save()

        _.res(res, updatedOrder, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}