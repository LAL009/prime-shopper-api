//get chats
exports.getChats = async (req, res) => {
   try {

      // Validate Form
      const required = ['user'];
      const validate = _._checkFields(req.body, required);
      if (validate !== true) throw new Error(validate.message);

      const key1 = req.body.user + '_' + req.Auth._id
      const key2 = req.Auth._id + '_' + req.body.user

      condition = {
         $or: [
            {
               key: key1
            },
            {
               key: key2
            }
         ]
      }

      const options = [
         {
            populate: {
               path: 'fromUser',
               select: 'firstName lastName'
            }
         },
         {
            populate: {
               path : 'toUser',
               select: 'firstName lastName'
            }
         }
      ]
      

      const chats = await Model._find(_Chats, condition, options)
      if (!chats) throw new Error('Oops! Fail to load chats. Please try again')

      _.res(res, chats, 200)

   } catch (error) {
      _.res(res, error.message, 404)
   }
}

exports.conversion = async (req, res) => {
   try {

      condition = {
         user : req.Auth._id
      }

      const chats = await Model._chatInfo(_Chats, condition, req.Auth._id)
      if (!chats) throw new Error('Oops! Fail to load chats. Please try again')

      _.res(res, chats, 200)

   } catch (error) {
      _.res(res, error.message, 404)
   }
}
