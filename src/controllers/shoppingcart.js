const { user, shoppingcart, product, category } = require('../../models')


// Get Shopping Cart
exports.getShoppingCart = async (req, res) => {
    try {

        const data = await shoppingcart.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct', 'idCategory']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: category,
                    as: 'category',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'name']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
            ]
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Add Shopping Cart
exports.addShoppingCart = async (req, res) => {
    try {
        let data = req.body
        let buyer = req.user;

        const dataproduct = await product.findOne({
            atrributes: {
                exclude: ['name', 'desc', 'image', 'qty', 'createdAt', 'updatedAt']
            },
            where: {
                id: data.idProduct,
            },
        });

        const datacategory = await product.findOne({
            atrributes: {
                exclude: ['name', 'createdAt', 'updatedAt']
            },
            where: {
                id: dataproduct.idCategory,
            },
        });

        const dataseller = await user.findOne({
            atrributes: {
                exclude: ['name', 'desc', 'image', 'qty', 'createdAt', 'updatedAt']
            },
            where: {
                id: dataproduct.idUser,
            },
        });

        if (!data.price) {
            data = {
                ...data,
                price: dataproduct.price,
                status: 'success'
            };
        };


        await shoppingcart.create({
            idProduct: data.idProduct,
            idCategory: datacategory.id,
            idBuyer: buyer.id,
            idSeller: dataseller.id,
            price: data.price,
            name: data.name,
            qty: data.qty,
            total: data.total,
        });

        res.send({
            status: 'success',
            message: 'Add Shopping Cart finished',
            data: {
                shoppingcart: {
                    id: data.id,
                    idProduct: data.idProduct,
                    idCategory: data.idCategory,
                    idBuyer: buyer.id,
                    idSeller: dataseller.id,
                    price: data.price,
                    total: data.total
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}