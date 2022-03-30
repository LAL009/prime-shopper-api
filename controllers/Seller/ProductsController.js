let fs = require('fs')
let path = require('path')
const csv = require("fast-csv");
const Categories = require('../../models/schemas/DynamicCategoriesSchema');
const Product = require('../../models/schemas/ProductsSchema');
var slugify = require('slugify')

//ADD
exports.doAdd = async (req, res) => {
    try {
        req.body = _._form(req.body);
        var required = ["category", "title", "price", "sellingPrice"]
        var validate = _._checkFields(req.body, required)
        if (validate !== true) throw new Error(validate.message)


        res.status(200).json({
            message: "success"
        })

        // if (req.files && req.files.banner && req.files.banner.length !== 0) {
        //     req.body.banner = req.files.banner[0].filename;
        // }
        // if (req.files && req.files.images) {
        //     var productImages = []
        //     req.files.images.map(file => {
        //         productImages.push(file.filename)
        //     })
        // }

        // var discount = (req.body.price - req.body.sellingPrice) / req.body.price * 100;
        // if (discount <= 0) throw new Error('Selling price greater than price,Please enter valid price');

        // const data = {
        //     category: req.body.category,
        //     seller: req.SellerAuth._id,
        //     title: req.body.title,
        //     slug: _._convertToSlug(req.body.title),
        //     price: req.body.price,
        //     sellingPrice: req.body.sellingPrice,
        //     discount: discount.toFixed(2),
        //     SKU: req.body.SKU,
        //     quantity: req.body.quantity,
        //     description: req.body.description,
        //     features: req.body.features,
        //     images: productImages,
        //     banner: req.body.banner,
        //     status: req.body.status
        // }
        // if (req.body.productOtherDetails && req.body.productOtherDetails !== '') {
        //     data.productOtherDetails = JSON.parse(req.body.productOtherDetails)
        // }
        // const addProduct = await Model._create(_Products, data)
        // // const addProduct = ''
        // if (!addProduct) {
        //     throw new Error('Invalid Arguments')
        // }

        // _.res(res, addProduct, 200);

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//DOWNLOAD CSV
exports.downloadCSV = async (req, res) => {
    try {
        var data = [
            { title: 'Title', sku: 'SKU', banner: 'Banner', quantity: 'Quantity', price_in_india: 'Price In India', selling_price_in_india: 'Selling Price In India', price_in_unitedkingdom: 'Price In United Kingdom', selling_price_in_unitedkingdom: 'Selling Price In United Kingdom', price_in_france: 'Price In France', selling_price_in_france: 'Selling Price In France', price_in_germany: 'Price In Germany', selling_price_in_germany: 'Selling Price In Germany', price_in_netherland: 'Price In Netherland', selling_price_in_netherland: 'Selling Price In Netherland', price_in_switzerland: 'Price In Switzerland', selling_price_in_switzerland: 'Selling Price In Switzerland', price_in_italy: 'Price In Italy', selling_price_in_italy: 'Selling Price In Italy', price_in_canada: 'Price In Canada', selling_price_in_canada: 'Selling Price In Canada', price_in_unitedstate: 'Price In United State', selling_price_in_unitedstate: 'Selling Price In United State', description: 'Description', features: 'Features', image1: 'Other Image Url 1', image2: 'Other Image Url 2', image3: 'Other Image Url 3', image4: 'Other Image Url 4', image5: 'Other Image Url 5', image6: 'Other Image Url 6', image7: 'Other Image Url 7', image8: 'Other Image Url 8' },
        ]

        let csvPath = path.join(__dirname, '..', '..', 'public', 'csv', 'Add_Products.csv')
        const ws = fs.createWriteStream(csvPath)

        csv
            .write(data, { headers: true })
            .on('finish', function () {
                console.log("Finish");
            })
            .pipe(ws)

        res.status(200).json({
            statusMessage: "success",
            body: {
                csvPath
            }
        })

    } catch (err) {
        res.status(404).json({
            statusMessage: "fail",
            message: err.message
        })
    }
}

//ADD With CSV
exports.doAddCSV = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("please upload file")
        }
        let csvPath = path.join(__dirname, '..', '..', 'public', 'csv', req.file.filename);


        let csvData = [];
        await fs.createReadStream(csvPath)
            .pipe(csv.parse({ headers: true }))
            .on("data", (row) => {
                let rowData = {};
                rowData.images = []
                rowData.category = req.body.id
                rowData.parentId = req.body.parentId
                rowData.seller = req.SellerAuth._id
                rowData.status = "In stock"
                rowData.productStatus = "Active"
                Object.keys(row).map(el => {
                    if (el == "title") {
                        rowData[el] = row[el]
                        rowData.slug = slugify(row[el], {
                            replacement: '-',
                            remove: undefined,
                            lower: true,
                            strict: false,
                            locale: 'vi',
                            trim: true
                        })
                    } else if (el == "price_in_india" || el == "price_in_unitedkingdom" || el == "price_in_france" || el == "price_in_germany" || el == "price_in_netherland" || el == "price_in_switzerland" || el == "price_in_italy" || el == "price_in_canada" || el == "price_in_unitedstate") {
                        if (row[el]) {
                            rowData.price = { ...rowData.price, [el]: parseInt(row[el]) }
                        }
                    } else if (el == "selling_price_in_india" || el == "selling_price_in_unitedkingdom" || el == "selling_price_in_france" || el == "selling_price_in_germany" || el == "selling_price_in_netherland" || el == "selling_price_in_switzerland" || el == "selling_price_in_italy" || el == "selling_price_in_canada" || el == "selling_price_in_unitedstate") {
                        if (row[el]) {
                            rowData.sellingPrice = { ...rowData.sellingPrice, [el]: parseInt(row[el]) }
                        }
                    } else if (el == "image1" || el == "image2" || el == "image3" || el == "image4" || el == "image5" || el == "image6" || el == "image7" || el == "image8") {
                        rowData.images.push(row[el])
                    } else {
                        rowData[el] = row[el]
                    }
                })

                csvData.push(rowData);
            })
            .on("end", async () => {
                try {
                    csvData.splice(0, 1)
                    let error = false;
                    csvData.map(el => {
                        if (el.price && el.sellingPrice) {
                            Object.keys(el.price).map(item => {
                                if (el.price[item] < el.sellingPrice[`selling_${item}`]) {
                                    error = "Selling price must be less than price"
                                } else if (el.price[item] && el.sellingPrice[`selling_${item}`]) {
                                    el.discount = { ...el.discount, [`discount_${item}`]: 100 - Math.round((el.sellingPrice[`selling_${item}`] / el.price[item]) * 100) }
                                }
                            })
                        } else {
                            error = "Please enter valid prices"
                        }

                        if (el.quantity < 0) {
                            error = "Please enter valid quantity"
                        } else if (el.quantity == 0) {
                            el.status = "Out of stock"
                        }
                    })
                    if (error) {
                        res.status(404).send({
                            message: error,
                        });
                    } else {
                        let newProducts = await Product.insertMany(csvData)
                        res.status(200).send({
                            data: newProducts,
                            message: "Uploaded the file successfully: " + req.file.originalname,
                        });

                    }
                } catch (err) {
                    res.status(404).json({
                        statusMessage: "fail",
                        message: err.message
                    })
                }
            })
            .on("error", (err) => {
                throw err.message;
            })

        // res.status(200).json({
        //     statusMessage: "success",
        //     body: "data"
        // })

    } catch (err) {
        res.status(404).json({
            statusMessage: "fail",
            message: err.message
        })
    }
}

//UPDATE
exports.doUpdate = async (req, res) => {
    try {
        const condition = {
            _id: req.body.product,
        }
        if (req.role = 'Seller') {
            condition.seller = req.SellerAuth._id
        }
        delete req.body.product

        const updateFields = Object.keys(req.body);
        const allowFields = ["category", "title", "price", "productStatus", "sellingPrice", "description", "features", "quantity", "banner", "images", "status"];
        const validations = updateFields.every((update) => allowFields.includes(update));
        if (!validations) throw new Error('Invalid Arguments')

        const product = await Model._findOne(_Products, condition, {}, false);
        if (!product) throw new Error('Product not found');

        if (req.body.sellingPrice && req.body.sellingPrice !== '') {
            req.body.discount = (product.price - req.body.sellingPrice) / product.price * 100;
        }
        if (req.body.price && req.body.price !== '') {
            req.body.discount = (req.body.price - product.sellingPrice) / req.body.price * 100;
        }
        if (req.body.sellingPrice && req.body.sellingPrice !== '' && req.body.price && req.body.price !== '') {
            req.body.discount = (req.body.price - req.body.sellingPrice) / req.body.price * 100;
        }

        if (req.body.discount && req.body.discount <= 0) throw new Error('Discount must be greater than zero')
        // if (req.body.quantity == 0) {
        //     product.status = 'Out of stock'
        // }
        if (req.body.quantity && req.body.quantity !== 0) {
            req.body.status = 'In stock'
        }

        // if (product.status == 'Out of stock' || req.body.status == 'Out of stock') {
        //     product.quantity = 0
        // }

        Object.keys(req.body).map(field => {
            product[field] = req.body[field]
        });
        // Banner
        if (req.files && req.files.banner && req.files.banner.length !== 0) {
            product.banner = req.files.banner[0].filename;
        }

        if (req.files && req.files.images) {
            var productImages = []
            req.files.images.map(file => {
                productImages.push(file.filename)
            })
            product.images = productImages;
        }

        var updatedProducts = await product.save();
        _.res(res, updatedProducts, 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//GET
exports.getProduct = async (req, res) => {
    try {
        var condition = {
            _id: req.body.product,
            seller: req.SellerAuth._id
        }
        const options = [
            {
                populate: {
                    path: 'category',
                }
            },
            {
                populate: {
                    path: 'isFavorite',
                    select: 'title banner images'
                }
            },
            {
                populate: {
                    path: 'seller'
                }
            }
        ]
        const product = await Model._findOne(_Products, condition, options, false)
        if (!product) throw new Error('Unable to find product')

        _.res(res, product, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//GETS
exports.getProducts = async (req, res) => {
    try {
        const condition = {
            seller: req.SellerAuth._id
        }
        if (req.body.productStatus && req.body.productStatus !== '') {
            condition.productStatus = req.body.productStatus
        }

        const options = [
            {
                populate: {
                    path: 'parentId'
                }
            },
            {
                populate: {
                    path: 'isFavorite',
                    select: 'product',
                    populate: {
                        path: 'product',
                        select: 'title banner images'
                    }
                }
            },
            {
                populate: {
                    path: 'seller'
                }
            },
            { limit: 12 },
            { skip: req.body.skip ? req.body.skip : 0 }
        ]

        if (req.body.sort && req.body.sort !== '') {
            Object.keys(req.body.sort).map(k => {
                if (req.body.sort[k] !== '') {
                    options.push(
                        {
                            sort: {
                                [k]: +req.body.sort[k],
                                _id: +req.body.sort[k]
                            }
                        }
                    )
                }
            })
        }

        var search = new RegExp(req.body.search, 'gi');
        if (req.body.search && req.body.search !== '') {
            condition['$where'] = `function() { return this.title.match(${search}) != null || this.price.toString().match(${search}) != null || 
            this.sellingPrice.toString().match(${search}) != null || 
            this.discount.toString().match(${search}) != null || this.quantity.toString().match(${search}) != null || 
            this.description.match(${search}) != null || 
            this.features.match(${search}) != null || this.status.match(${search}) != null || 
            this.createdAt.toString().match(${search}) != null;}`
        }

        const product = await Model._find(_Products, condition, options, false)
        if (!product) throw new Error('Product not found')

        _.res(res, product, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

//REMOVE
exports.removeProduct = async (req, res) => {
    try {
        const condition = {
            _id: req.body.product,
            seller: req.SellerAuth._id
        }

        const product = await Model._findOne(_Products, condition, {}, false)
        if (!product) throw new Error('Oops ! Something went wrong,Maybe be Already Removed')

        product.remove()

        _.res(res, 'Product removed successfully', 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getSubCategory = async (req, res) => {
    try {

        let category = await Categories.find();

        res.status(200).json({
            status: 'success',
            data: category
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}