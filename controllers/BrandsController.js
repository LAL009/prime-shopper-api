exports.getBrand = async (req, res) => {
    try {
        const condition = {
            _id: req.body.brand
        }
        const brand = await Model._findOne(_Brands, condition, {}, false);
        if (!brand) throw new Error('Brand Not Found')

        _.res(res, brand, 200)
    } catch (error) {
        _.res(res, error.message)
    }
}

exports.getBrands = async (req, res) => {
    try {
        var condition = {}
        const options = [
            {
                populate: {
                    path: 'category',
                    select: 'name banner images type dean'
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
        var search = new RegExp(req.body.search, 'gi');
        if (req.body.search) {
            condition['$where'] = `function() { return this.name.match(${search}) != null || this.status.match(${search}) != null || 
            this.createdAt.toString().match(${search}) != null;}`
        }
        const brands = await Model._find(_Brands, condition, options, false)
        if (!brands) throw new Error('Brands Not Found')

        _.res(res, brands, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}