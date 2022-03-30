const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    seller : {
        type : Schema.Types.ObjectId,
        ref : 'Sellers'
    },
    order : {
        type : Schema.Types.ObjectId,
        ref : 'Orders',
        required : true,
    },
    paymentID : {
        type : String,
        default : ''
    },
    paymentStatus : {
        type : String,
        enum : ['Pending','Paid','Unpaid','Failed'],
        default : 'Pending'
    },
    paymentType : {
        type : String,
        enum : ['COD','Stripe'],
        required : true,
    },
    paymentToken : {
        type : String,
        default : ''
    },
    paymentReceipt : {
        type : String,
        default : ''
    },
    paymentDetails : {},
    invoiceNumber : {
        type : Number,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    discount : {
        type : Number,
        default : 0
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

const PaymentModel = mongoose.model('Payments',PaymentSchema)

module.exports = PaymentModel