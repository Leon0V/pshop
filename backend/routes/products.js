const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../uploads/multerHandler');

router.get('/', productController.list);
router.post('/', productController.save);
router.get('/:code', productController.getByCode);
router.put('/:code', productController.update);
router.delete('/:code', productController.delete);
router.patch('/img/:code', upload.single('avatar'), productController.uploadImg);

module.exports = router;
