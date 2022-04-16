const { product, user, category, productCategory } = require('../../models');

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },

        });

        res.send({
            status: 'success...',
            data: {
                products,
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Get Product by Id
exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await product.findOne({
            where: {
                id,
            },

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });

        if (!data) {
            return res.send({
                error: {
                    message: `Product with ID: ${id} not found`,
                },
            });
        }

        res.send({
            status: 'success...',
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Get Add Product
exports.addProduct = async (req, res) => {
    try {
        let data = req.body;


        data = {
            ...data,
            idUser: req.user.id,
        };

        const newProduct = await product.create(data);

        const productData = await product.findOne({
            where: {
                id: newProduct.id,
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });
        res.send({
            status: 'success...',
            data: {
                ...productData,
                image: process.env.PATH_FILE + productData.image,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
        }

        const data = await product.update(newData, {
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Update product data with ID: ${id} finished`,
            data: {
                id,
                name: newData.name,
                desc: newData.desc,
                price: newData.price,
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await product.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: "success",
            message: `Delete product id: ${id} finished`,
            data: {
                id,
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};