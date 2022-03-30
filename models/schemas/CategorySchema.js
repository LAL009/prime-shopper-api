const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['Main', 'SubCategory'],
        default: 'Main'
    },
    dean: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        default: null
    },
    slug: {
        type: String,
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

CategorySchema.virtual('hasForm', {
    ref: 'ProductForms', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'category', // is equal to `foreignField`
    count: true,
});

CategorySchema.set('toObject', { virtuals: true })
CategorySchema.set('toJSON', { virtuals: true })

const CategoryModel = mongoose.model('Categories', CategorySchema)

module.exports = CategoryModel