const productModel = require('../models/productModel');
const upload = require('../uploads/multerHandler');
const multer = require('multer');
const fs = require('fs');

class ProductController {
    async save(req, res) {
        try {
            let product = req.body;
            const max = await productModel.findOne({}).sort({ code: -1 });
            const newCode = max === null ? 1 : max.code + 1;
            product.code = newCode;
            product.active = true;
            product.isDeleted = false;
            product.avatar = "";
            const result = await productModel.create(product);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error saving product:', error);
            res.status(500).json({ error: 'Failed to save product.' });
        }
    }

    async list(req, res) {
        try {
            console.log(req.query);
            let result = await productModel.find({ isDeleted: false }, { isDeleted: 0 });
            // if (req.query.code) {
            //     result = result.filter(x => x.code.toString().includes(req.query.code));
            // }
            if (req.query.name) {
                result = result.filter(x => x.name.toUpperCase().includes(req.query.name.toUpperCase()));
            }
            if (req.query.category) {
                result = result.filter(x => x.category.toUpperCase().includes(req.query.surname.toUpperCase()));
            }
            if (req.query.animal) {
                result = result.filter(x => x.animal.toUpperCase().includes(req.query.city.toUpperCase()));
            }
            if (req.query.active !== undefined) {
                result = result.filter(x => x.active.toString() === req.query.active);
                console.log(req.query.active);
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error listing products:', error);
            res.status(500).json({ error: 'Failed to retrieve products.' });
        }
    }

    async getByCode(req, res) {
        try {
            const code = req.params.code;
            const result = await productModel.findOne({ code: code, isDeleted: false }, { isDeleted: 0, active: 0 });
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Product not found.' });
            }
        } catch (error) {
            console.error('Error retrieving product:', error);
            res.status(500).json({ error: 'Failed to retrieve product.' });
        }
    }

    async update(req, res) {
        try {
            const code = req.params.code;
            const user = await productModel.findOne({ code: code, isDeleted: false }, { isDeleted: 0, active: 0 });

            if (user) {
                await productModel.updateOne({ code: code }, req.body);
                const updatedProduct = await productModel.findOne({ code: code, isDeleted: false }, { isDeleted: 0, active: 0 });
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Product not found.' });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Failed to update product.' });
        }
    }


    async delete(req, res) {
        try {
            const code = req.params.code;
            const product = await productModel.findOne({ code: code, isDeleted: false });

            if (product) {
                product.isDeleted = true;
                await product.save();
                res.status(200).send(`Successfully deleted the user with ID ${product.code} and name ${product.name}`);
            } else {
                res.status(404).json({ error: 'Product not found.' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Failed to delete product.' });
        }
    }

    async uploadImg(req, res) {
        try {
            const code = req.params.code;
            const product = await productModel.findOne({ code: code, isDeleted: false });
            console.log(product);
            if (!product) {
                res.status(404).json({ error: 'Product not found.' });
                return
            };
            if (req.file) {
                const filePath = req.file.path;
                console.log('File path:', filePath);
                const binaryData = fs.readFileSync(filePath);
                const base64Data = binaryData.toString('base64');
                console.log('Base64 data:', base64Data);
                product.avatar = base64Data;
                await product.save();
                fs.unlinkSync(filePath);
                console.log('File deleted:', filePath);
            }
            res.status(200).json({ message: 'Image uploaded successfully.' });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image.' });
        }
    }

}

module.exports = new ProductController();