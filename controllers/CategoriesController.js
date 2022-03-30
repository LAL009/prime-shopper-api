exports.getCategory = async (req, res) => {
    try {
        const condition = {
            _id: req.body.category
        }

        const options = [
            {
                populate: {
                    path: 'dean',
                    select: 'name image banner'
                }
            },
            {
                populate: {
                    path: 'hasForm',
                }
            }
        ]
        const category = await Model._findOne(_Category, condition, options, {})
        if (!category) throw new Error('Category Not Found')

        _.res(res, category, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getCategories = async (req, res) => {
    try {
        const condition = {
            type: 'Main',
        }
        const options = {
            populate: {
                path: 'hasForm',
            },
            limit: 12,
            skip: req.body.skip ? req.body.skip : 0
        }

        //Without Search
        var categories = await Model._find(_Category, condition, options, {})

        // With Search   
        if (req.body.search && req.body.search !== '') {
            const _condition = {}
            var search = new RegExp(req.body.search, 'gi');

            _condition['$where'] = `function() { return this.name.match(${search}) != null || this.type.match(${search}) != null || this.status.match(${search}) != null || 
            this.createdAt.toString().match(${search}) != null;}`

            categories = await Model._find(_Category, _condition, options)
        }

        _.res(res, categories, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getSubcategoriesByCategories = async (req, res) => {
    try {
        const condition = {
            dean: req.body.category,
            type: 'SubCategory'
        }
        const options = [
            {
                populate: {
                    path: 'dean',
                    select: 'name image banner'
                }
            },
            {
                populate: {
                    path: 'hasForm',
                }
            }
        ]
        const getSubcategoryByCategories = await Model._find(_Category, condition, options)
        if (!getSubcategoryByCategories) throw new Error('SubCategories Not Found')

        _.res(res, getSubcategoryByCategories, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const condition = {
            _id: req.body.subcategory,
            dean: req.body.category
        }
        const options = [
            {
                populate: {
                    path: 'dean',
                    select: 'name image banner'
                }
            },
            {
                populate: {
                    path: 'hasForm',
                }
            }
        ]
        const category = await Model._findOne(_Category, condition, options)
        if (!category) throw new Error('subCategory Not Found')

        _.res(res, category, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}