//Gets
exports.payments = async (req, res) => {
    try {
        const conditions = {
            seller: req.SellerAuth._id
        }
        const options = [
            {
                populate: {
                    path: 'user',
                    select: 'name'
                }
            },
            {
                populate: {
                    path: 'order',
                    select: 'products total discount'
                }
            },
            {
                limit: 12
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
        if (!payments) throw new Error('No Payments found')

        _.res(res, payments, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//Get
exports.payment = async (req, res) => {
    try {
        const conditions = {
            _id: req.body.payment,
            seller: req.SellerAuth._id
        }

        const options = [
            {
                populate: {
                    path: 'user',
                    select: 'name'
                }
            },
            {
                populate: {
                    path: 'order',
                    select: 'products total discount'
                }
            }
        ]

        const payment = await Model._findOne(_Payment, conditions, options)
        if (!payment) throw new Error('No Payments found')

        _.res(res, payment, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}