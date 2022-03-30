const Schema = mongoose.Schema

const UsersSchema = new Schema({
    name : {
        type : String,
        default : ''
    },
    username : {
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
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

const UserModel = mongoose.model('Users',UsersSchema)

module.exports = UserModel