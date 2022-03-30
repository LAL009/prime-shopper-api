const ADMIN_CONFIG = require('../config/admin-config');

exports.doAddItem = async (req, res) => {
    try {

        const tableOptions = ADMIN_CONFIG[req.body.base];

        const table = tableOptions.base;
        delete req.body.base

        req.body = _._form(req.body);

        if (req.body.document && req.body.document !== '') {

            JSON.parse(req.body.document).map((filename) => {

                var oldPath = `${APP_PATH}/public/temp/${filename}`;

                var newPath = `${APP_PATH}/public/images/${filename}`

                _._moveFile(oldPath, newPath)

            })

        }

        const addItem = await Model._create(table, req.body)

        _.res(res, addItem, 200)


    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.updateItem = async (req, res) => {
    try {
        const tableOptions = ADMIN_CONFIG[req.body.base]

        const table = tableOptions.base;
        delete req.body.base


        if (!req.body.condition) throw new Error('Please Enter Detail For Update')

        const condition = req.body.condition
        delete req.body.condition
        const updateFields = Object.keys(req.body);

        const updateItem = await Model._findOne(table, condition, {}, false)

        if (!updateItem) throw new Error('Invalid Arguments')

        if (req.body.document && req.body.document !== '') {

            JSON.parse(req.body.document).map((filename) => {

                var oldPath = `${APP_PATH}/public/temp/${filename}`;

                var newPath = `${APP_PATH}/public/images/${filename}`

                _._moveFile(oldPath, newPath)

            })

        }

        updateFields.map(key => {
            updateItem[key] = req.body[key]
        })

        var upadatedItems = await updateItem.save()

        _.res(res, upadatedItems, 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getItems = async (req, res) => {

    try {

        const tableOptions = ADMIN_CONFIG[req.body.base];

        var condition = req.body.condition ? JSON.parse(req.body.condition) : {};

        var options = req.body.options ? req.body.options : {};

        const convertToNumber = ['limit', 'skip']

        Object.keys(req.body).map(key => {
            if (convertToNumber.indexOf(key) !== -1) {
                options[key] = +req.body[key]
            }
        })

        if (req.body.sort && req.body.sort !== '') {

            options.sort = JSON.parse(req.body.sort)

        }

        //populate

        if (req.body.populate) {
            const populate = JSON.parse(req.body.populate);

            if (populate.length !== 0) {
                var opt = []
                Object.keys(options).map(key => {
                    obj = {}
                    obj[key] = options[key];
                    opt.push(obj)
                })
                options = opt;

                populate.map(p => {

                    if (Object.keys(tableOptions.populate).indexOf(p) !== -1) {


                        options.push({
                            populate: tableOptions.populate[p]
                        })

                    }
                })
            }
        }


        if (req.body.search) {
            var search = req.body.search
            Object.keys(search).map(s => {
                condition[s] = new RegExp(req.body.search[s], 'gi')
            })
        }

        const getDetails = await Model._find(tableOptions.base, condition, options);

        _.res(res, getDetails, 200)

    } catch (error) {

        _.res(res, error.message, 404)
    }

}

exports.getItem = async (req, res) => {
    try {

        const tableOptions = ADMIN_CONFIG[req.body.base];

        const condition = req.body.condition ? JSON.parse(req.body.condition) : {};

        var options = req.body.options ? req.body.options : {}

        if (!req.body.condition) throw new Error('Conditions must be specified')

        if (req.body.populate) {
            const populate = JSON.parse(req.body.populate);

            if (populate.length !== 0) {
                var opt = []
                Object.keys(options).map(key => {
                    obj = {}
                    obj[key] = options[key];
                    opt.push(obj)
                })
                options = opt;

                populate.map(p => {

                    if (Object.keys(tableOptions.populate).indexOf(p) !== -1) {


                        options.push({
                            populate: tableOptions.populate[p]
                        })

                    }
                })
            }
        }

        const getDetail = await Model._findOne(tableOptions.base, condition, options, false)

        if (!getDetail) throw new Error('No Data found')

        _.res(res, getDetail, 200)

        // return getDetail
    } catch (error) {

        _.res(res, error.message, 404)

    }
}

exports.removeItem = async (req, res) => {
    try {

        if (!req.body.base || req.body.base == '') throw new Error('base is required.')

        const tableOptions = ADMIN_CONFIG[req.body.base]

        if (!req.body.condition) throw new Error('Please Enter Any Detail For Delete')

        const condition = JSON.parse(req.body.condition)

        const removeItem = await Model._findOne(tableOptions.base, condition, {}, false)
        if (!removeItem) throw new Error('This Arguments Already Deleted')

        if (req.body.cascading && req.body.cascading !== '') {

            if (Array.isArray(JSON.parse(req.body.cascading))) {

                JSON.parse(req.body.cascading).map((key) => {

                    tableOptions.cascading.map((k, i) => {

                        if (Object.keys(k).indexOf(key) !== -1) {

                            k[key].deleteMany({ [req.body.base]: removeItem._id }, function (err, doc) {

                                if (err) console.log(err)

                                console.log(doc)

                            })

                        }

                    })

                })

            }else{

                throw new Error('Invalid Arguments')

            }

        }
        else {

            for (let i = 0; i < tableOptions.cascading.length; i++) {

                var keys = Object.keys(tableOptions.cascading[i])

                tableOptions.cascading[i][keys[0]].deleteMany({ [req.body.base]: removeItem._id }, function (err, doc) {

                    if (err) console.log(err)

                    console.log(doc)

                })

            }
        }


        removeItem.remove();

        _.res(res, 'Item Successfully Deleted', 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}