const Schema = mongoose.Schema

const SellerSchema = new Schema({
    name : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        default : ''
    },
    status : {
        type : String,
        enum : ['Active','Inactive'],
        default : 'Active'
    },  
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now 
    }
})

const UserModel = mongoose.model('Sellers',SellerSchema)

module.exports = UserModel