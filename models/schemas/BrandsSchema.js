const Schema = mongoose.Schema

const BrandsSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive']
    },
    createdAt: {
        type : Date,
        default: Date.now
    },
    updatedAt: {
        type : Date,
        default: Date.now
    }

})

const BrandsModel = mongoose.model('Brands',BrandsSchema)

module.exports = BrandsModel