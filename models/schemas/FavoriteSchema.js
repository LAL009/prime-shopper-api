const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Sellers',
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    product: {
        type : Schema.Types.ObjectId,
        ref : 'Products',
        default: null
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

const FavoritesModel = mongoose.model('Favorites',FavoriteSchema)

module.exports = FavoritesModel
