exports.createPayment = async (req, res) => {
    try {
        req.body = _._form(req.body);
        var required = ["order", "seller", "paymentType", "invoiceNumber", "amount"]
        var validate = _._checkFields(req.body, required)
        if (validate !== true) throw new Error(validate.message)

        req.body.user = req.Auth._id
        const payment = await Model._create(_Payment, req.body)
        if (!payment) throw new Error('Invalid payment')

        _.res(res, payment, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getPayment = async (req, res) => {
    try {
        if (!req.body.payment) throw new Error('Payment is required')
        const conditions = {
            _id: req.body.payment,
            user: req.Auth._id
        }

        const options = {
            populate: {
                path: 'order',
                select: 'products subtotal discount total'
            }
        }
        const payment = await Model._findOne(_Payment, conditions, options, false)
        if (!payment) throw new Error('No Payment found')

        _.res(res, payment, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getPayments = async (req, res) => {
    try {
        const conditions = {
            user: req.Auth._id
        }

        const options = [
            {
                populate: {
                    path: 'order',
                    select: 'products subtotal discount total'
                },
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
        const payments = await Model._find(_Payment, conditions, options)
        if (!payments) throw new Error('No Payments')

        _.res(res, payments, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}