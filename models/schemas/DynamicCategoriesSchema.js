const Schema = mongoose.Schema

const CategorySchema = new Schema()

CategorySchema.add({
    key: {type: Schema.ObjectId, default: mongoose.Types.ObjectId},
    data: {
        name: {
            type: String,
            required: true
        },
        banner: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            unique: true
        },
    },
    children: [CategorySchema],
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
    },
})
CategorySchema.set('toObject', { virtuals: true })
CategorySchema.set('toJSON', { virtuals: true })

const CategoryModel = mongoose.model('AllCategories', CategorySchema)

module.exports = CategoryModel