const express = require('express')
const router = express.Router()

const {createAdmin, login,updateAdmin , deleteAdmin,getAdminById,getAdmin} = require('../controller/admin.controller');
const {createProduct,upload , updateProduct,getProducts,getProductById,deleteProduct} = require('../controller/product.controller');
const {authentication , authorization} = require('../middleware/middleware')
const {createUser,getUser,updateUser,deleteUser} = require('../controller/user.control')

router.get('/', (req, res) => {
    res.send('Router Method !');
  });

//ADMIN
router.post('/admin', createAdmin);    //middleware
router.post('/admin/login', login);
router.get('/admin', getAdmin);
router.put('/admin/:id', authentication,updateAdmin);
router.delete('/admin/:id',authentication, deleteAdmin);

//USER
router.post('/user' ,authentication, createUser );   //middleware
router.get('/user' ,authentication, getUser );
router.put('/user/:id' , authentication,updateUser );
router.delete('/user/:id' ,authentication, deleteUser );

//STORAGE
router.post('/storage',authentication, upload.single('image'), createProduct);    //middleware
router.get('/storage' , getProducts );
router.get('/storage/:id' , getProductById );
router.put('/storage/:id' , authentication, authorization,updateProduct );
router.delete('/storage/:id' ,authentication,authorization, deleteProduct );


module.exports = router;