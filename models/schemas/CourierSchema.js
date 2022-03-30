const Schema = mongoose.Schema

const CourierSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
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

const CourierModal = mongoose.model('Courier',CourierSchema)

module.exports = CourierModal
