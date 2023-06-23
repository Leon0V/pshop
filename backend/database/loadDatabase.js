require("./databaseConnection");
const mongoose = require("mongoose");
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const users = require('./users.json');
const products = require('./products.json');

async function loadUsers() {
    try {
        await userModel.deleteMany({});
        for (const user of users) {
            await userModel.create(user);
        }
        console.log('Users data loaded!');
    } catch (err) {
        console.log(err);
    }
}

async function loadProducts() {
    try {
        await productModel.deleteMany({});
        for (const product of products) {
            await productModel.create(product);
        }
        console.log('Products data loaded!');
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

async function loadData() {
    await loadUsers();
    await loadProducts();
}

loadData();
