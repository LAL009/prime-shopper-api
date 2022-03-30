const Schema = mongoose.Schema

const ChatsSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
    },
    from : {
        type : String,
        default : ''
    },
    to : {
        type : String,
        default : ''
    },
    message : String,
    isRead : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        enum : ['text','emoji','media'],
        default : 'text'
    },
    toType : {
        type : String,
        default : ''
    },
    formType : {
        type : String,
        default : ''
    },
    key : String,
    created_at : {
        type : Date,
        default : Date.now
    }
})

ChatsSchema.virtual('fromUser', {
    ref: 'Users', // The model to use
    localField: 'from', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false,
  });
  ChatsSchema.virtual('toUser', {
    ref: 'Users', // The model to use
    localField: 'to', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false,
  });


  ChatsSchema.set('toObject', { virtuals: true })
  ChatsSchema.set('toJSON', { virtuals: true })
const ChatsModel = mongoose.model('Chats', ChatsSchema)

module.exports = ChatsModel