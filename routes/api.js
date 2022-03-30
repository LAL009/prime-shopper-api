const UserController = require('../controllers/User/UsersController')
const CategoryController = require('../controllers/CategoriesController')
const UserProductController = require('../controllers/User/ProductsController')
const UserPaymentController = require('../controllers/User/PaymentsController')
const UserOrderController = require('../controllers/User/OrdersController')

const router = new express.Router();

// User Authentication and profile
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.doLogin)
router.post('/user/profile', auth, UserController.getProfile)
router.post('/user/profile/update', auth, UserController.updateProfile)
router.post('/user/change/password', auth, UserController.changePassword)
router.post('/user/forgot/password', UserController.sendOTP)
router.post('/user/reset/password', UserController.resetPassword)
router.post('/user/statistics', auth, UserController.UserStatistics)

//Category 
router.post('/category', CategoryController.getCategory)
router.post('/categories', CategoryController.getCategories)
router.post('/getSubCategories', CategoryController.getSubcategoriesByCategories)
router.post('/getSubCategory', CategoryController.getSubcategoriesByCategory)


//Product
router.post('/product', UserProductController.getProduct)
router.post('/products', UserProductController.getProducts)

//ProductForms
router.post('/get/forms', UserProductController.productFormsFiled)

// Cart
router.post('/add/cart', auth, UserProductController.addToCart)
router.post('/cart', auth, UserProductController.cart)
router.post('/remove/cart', auth, UserProductController.removeFromCart)
router.post('/category/product', UserProductController.getProductByCategory)
router.post('/empty/cart', auth, UserProductController.allProductsRemoveFromCart)

//Favorite
router.post('/add/favorite', auth, UserProductController.addToFavorite)
router.post('/favorites', auth, UserProductController.Favorites)

//Orders
router.post('/add/order', auth, UserOrderController.doAdd)
router.post('/orders', auth, UserOrderController.Orders)
router.post('/remove/order', auth, UserOrderController.removeOrder)

//Payments
router.post('/create-payment', auth, UserPaymentController.createPayment)
router.post('/payment', auth, UserPaymentController.getPayment)
router.post('/payments', auth, UserPaymentController.getPayments)

//Chats
router.post('/chats', auth, ChatController.getChats)
router.post('/conversion', auth, ChatController.conversion)

//Brands
router.post('/get/brands', BrandsController.getBrands)
router.post('/get/brand', BrandsController.getBrand)


router.post('/uploadImage', IMAGE_STORAGE.single('document'), (req, res) => {
    _.res(res, req.file.filename, 200)
})

router.post('/create', AdminController.doAddItem)
router.post('/lists', AdminController.getItems)
router.post('/update', AdminController.updateItem)
router.post('/details', AdminController.getItem)
router.post('/remove', AdminController.removeItem)

async function auth(req, res, next) {

    try {
        var token = req.header('X-Authentication-token');
        if (!token) throw new Error('Invalid Request');

        // DECRYPT
        const getUserFromToken = JWT.verify(token, CONFIG.JWT_KEY);

        const user = await _Users.findById(getUserFromToken.user);
        if (!user) throw new Error('Invalid Token');

        req.Auth = await _.authResponse(user);

        next();

    } catch (error) {
        _.res(res, error.message, 401);
    }
}


module.exports = router;