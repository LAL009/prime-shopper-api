//Admin
CategoryController = module.exports = require('./CategoriesController')
ChatController = module.exports = require("./ChatsController");
BrandsController = module.exports = require("./BrandsController")

//Users
UserController = module.exports = require('./User/UsersController')
UserProductController = module.exports = require('./User/ProductsController')
UserPaymentController = module.exports = require('./User/PaymentsController')
UserOrderController = module.exports = require('./User/OrdersController')

//Sellers
SellerController = module.exports = require('./Seller/SellerController')
SellerProductController = module.exports = require('./Seller/ProductsController')
SellerPaymentController = module.exports = require('./Seller/PaymentsController')
SellerOrderController = module.exports = require('./Seller/OrdersController')

//Admin
AdminController = module.exports = require('./AdminController')