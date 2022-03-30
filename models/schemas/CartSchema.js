const Schema = mongoose.Schema

const CartSchema = new Schema({
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Products',
        required : true
    }, 
    quantity : {
        type : Number,
        default : 1
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    status : {
        type : String,
        enum : ['Active','Inactive'],
        default : 'Active'
    },
    createdAt: {    
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

const CartModel = mongoose.model('Cart',CartSchema)

module.exports = CartModel