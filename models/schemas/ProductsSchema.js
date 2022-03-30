const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'AllCategories'
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'AllCategories'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Sellers',
        default: null,
        required: [true, "Seller is require"]
    },
    title: {
        type: String,
        required: [true, "Title is require"]
    },
    banner: {
        type: String,
        default: ''
    },
    images: [],
    price: {
        price_in_india: Number,
        price_in_unitedkingdom: Number,
        price_in_france: Number,
        price_in_germany: Number,
        price_in_netherland: Number,
        price_in_switzerland: Number,
        price_in_italy: Number,
        price_in_canada: Number,
        price_in_unitedstate: Number,
    },
    sellingPrice: {
        selling_price_in_india: Number,
        selling_price_in_unitedkingdom: Number,
        selling_price_in_france: Number,
        selling_price_in_germany: Number,
        selling_price_in_netherland: Number,
        selling_price_in_switzerland: Number,
        selling_price_in_italy: Number,
        selling_price_in_canada: Number,
        selling_price_in_unitedstate: Number,
    },
    discount: {
        discount_price_in_india: {
            type: Number
        },
        discount_price_in_unitedkingdom: {
            type: Number
        },
        discount_price_in_france: {
            type: Number
        },
        discount_price_in_germany: {
            type: Number
        },
        discount_price_in_netherland: {
            type: Number
        },
        discount_price_in_switzerland: {
            type: Number
        },
        discount_price_in_italy: {
            type: Number
        },
        discount_price_in_canada: {
            type: Number
        },
        discount_price_in_unitedstate: {
            type: Number
        },
    },
    sku: {
        type: String,
        required: [true, "SKU is require"],
        unique: [true, "SKU must be unique"]
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, "Quantity should be more than or equal to 0"]
    },
    description: {
        type: String,
        default: ''
    },
    features: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['In stock', 'Out of stock'],
        default: 'In stock'
    },
    productStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Draft'],
        default: 'Active'
    },
    slug: {
        type: String,
        unique: [true, "slug must be unique"]
    },
    productOtherDetails: [],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    UpdatedAt: {
        type: Date,
        default: Date.now()
    },
})

ProductsSchema.virtual('isFavorite', {
    ref: 'Favorites', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'product', // is equal to `foreignField`
    justOne: true,
});

ProductsSchema.set('toObject', { virtuals: true })
ProductsSchema.set('toJSON', { virtuals: true })

const ProductsModel = mongoose.model('Products', ProductsSchema)

module.exports = ProductsModel