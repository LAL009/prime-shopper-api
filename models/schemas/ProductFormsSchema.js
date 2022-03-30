const Schema = mongoose.Schema

const ProductFormsSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    forms: [
        {
            label: String,
            filedType: {
                type: String,
                enum: ['numeric', 'text', 'textarea', 'other']
            },
            isRequired: Boolean
        }
    ],
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

const ProductModel = mongoose.model('ProductForms', ProductFormsSchema)

module.exports = ProductModel