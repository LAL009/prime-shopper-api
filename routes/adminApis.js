const CategoriesController = require('../controllers/Admin/CategoriesController')
const CourierController = require('../controllers/Admin/Courier')

const router = new express.Router();

// router.post('/register', SellerController.register)
// router.post('/login', SellerController.doLogin)
// router.post('/profile', auth, SellerController.getProfile)
// router.post('/update/profile', auth, SellerController.updateProfile)
// router.post('/change/password', auth, SellerController.changePassword)
// router.post('/forgot/password', SellerController.sendOTP)
// router.post('/reset/password', SellerController.resetPassword)

// Categories
// router.post('/product/add', auth, IMAGE_STORAGE.fields([{ name: 'banner', maxCount: 1 }, { name: 'images', maxCount: 8 }]), SellerProductController.doAdd)
router.get('/categories', CategoriesController.getCategories)
router.get('/categories/:id', CategoriesController.getCategory)
router.post('/category/add', IMAGE_STORAGE.fields([{ name: 'banner', maxCount: 1 }]), CategoriesController.addCategory)
router.post('/category/update', CategoriesController.updateCategory)
router.post('/category/delete', CategoriesController.deleteCategory)

// Courier
router.get('/couriers', CourierController.getAllCouriors)
router.post('/courier/add', CourierController.addCourior)
router.post('/courier/delete', CourierController.deleteCourior)


// async function auth(req, res, next) {
//     try {
//         var token = req.header('X-Authentication-token');
//         if (!token) throw new Error('Invalid Request');

//         // DECRYPT
//         const getSellerFromToken = JWT.verify(token, CONFIG.JWT_KEY);

//         const seller = await _Seller.findById(getSellerFromToken.seller);
//         if (!seller) throw new Error('Invalid Token');

//         req.SellerAuth = await _.authResponse(seller)
//         req.role = 'Seller';

//         next();

//     } catch (error) {
//         _.res(res, error.message, 401);
//     }
// }

module.exports = router;