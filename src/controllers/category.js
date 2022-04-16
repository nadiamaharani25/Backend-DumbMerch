const { category, productCategory } = require('../../models');

// Get All Categories
exports.getCategories = async (req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        res.send({
            status: 'success...',
            categories: {
                data,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Get Category by Id
exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await category.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        res.send({
            status: 'success...',
            category: {
                data,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Add Category
exports.addCategory = async (req, res) => {
    try {
        const newCategory = await category.create(req.body);

        res.send({
            status: 'success...',
            data: {
                "category": {
                    id: newCategory.id,
                    name: newCategory.name,
                },
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

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const newCategory = await category.update(req.body, {
            name: req.body.name,
            where: {
                id,
            },
        });

        res.send({
            status: 'success...',
            message: `Update category id: ${id} finished`,
            data: {
                "category": {
                    id,
                    name: req.body.name,
                },
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

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await category.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Delete category id: ${id} finished`,
            data: {
                id,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};
