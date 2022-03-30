const SellerController = require('../controllers/Seller/SellerController')
const SellerProductController = require('../controllers/Seller/ProductsController')
const SellerPaymentController = require('../controllers/Seller/PaymentsController')
const SellerOrderController = require('../controllers/Seller/OrdersController')

const router = new express.Router();

router.post('/register', SellerController.register)
router.post('/login', SellerController.doLogin)
router.post('/profile', auth, SellerController.getProfile)
router.post('/update/profile', auth, SellerController.updateProfile)
router.post('/change/password', auth, SellerController.changePassword)
router.post('/forgot/password', SellerController.sendOTP)
router.post('/reset/password', SellerController.resetPassword)

//Products
router.post('/product/add', auth, IMAGE_STORAGE.fields([{ name: 'banner', maxCount: 1 }, { name: 'images', maxCount: 8 }]), SellerProductController.doAdd)
router.post('/product/update', auth, IMAGE_STORAGE.fields([{ name: 'banner', maxCount: 1 }, { name: 'images', maxCount: 8 }]), SellerProductController.doUpdate)
router.post('/product', auth, SellerProductController.getProduct)
router.post('/products', auth, SellerProductController.getProducts)
router.post('/product/remove', auth, SellerProductController.removeProduct)

//Add Products from CSV
router.get('/product/getcsv', auth, SellerProductController.downloadCSV)
router.post('/products/csv', auth, CSV_STORAGE.single('csv'), SellerProductController.doAddCSV)

//Category
router.get('/category', auth, SellerProductController.getSubCategory)

//Orders
router.post('/orders', auth, SellerOrderController.getOrders)
router.post('/order', auth, SellerOrderController.getOrder)
router.post('/order/update', auth, SellerOrderController.updateOrder)

//Payments
router.post('/payments', auth, SellerPaymentController.payments)
router.post('/payment', auth, SellerPaymentController.payment)

//Statistics
router.post('/statistics', auth, SellerController.Statistics)

async function auth(req, res, next) {
    try {
        var token = req.header('X-Authentication-token');
        if (!token) throw new Error('Invalid Request');

        // DECRYPT
        const getSellerFromToken = JWT.verify(token, CONFIG.JWT_KEY);

        const seller = await _Seller.findById(getSellerFromToken.seller);
        if (!seller) throw new Error('Invalid Token');

        req.SellerAuth = await _.authResponse(seller)
        req.role = 'Seller';

        next();

    } catch (error) {
        _.res(res, error.message, 401);
    }
}

module.exports = router;