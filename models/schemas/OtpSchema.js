const Schema = mongoose.Schema

const OtpSchema = new Schema({
    otp : String,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    status : {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
})
const OtpModel = mongoose.model('Otp', OtpSchema);

module.exports = OtpModel;