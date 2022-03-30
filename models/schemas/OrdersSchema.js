const Schema = mongoose.Schema

const OrdersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    seller : {
        type: Schema.Types.ObjectId,
        ref : 'Sellers'
    },
    orderNumber : {
        type: String,
    },
    note: {
        type: String,
        default: ''
    },
    subtotal: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        default: ''
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Unshipped', 'Sent', 'Cancelled'],
        default: 'Pending'
    },
    courier: {
        id: {
            type: Schema.Types.ObjectId,
            ref : 'Courier'
        },
        trackingId: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const OrdersModel = mongoose.model('Orders', OrdersSchema)

module.exports = OrdersModel