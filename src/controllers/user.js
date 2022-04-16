// import model here
const { user, profile, product } = require('../../models');

// Add User
exports.addUsers = async (req, res) => {
    try {
        await user.create(req.body);

        res.send({
            message: 'Insert data user with ORM finished',
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

// Get Users
exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            include: {
                model: profile,
                as: 'profile',
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        res.send({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Get User Product
exports.getUserProducts = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                status: 'seller',
            },
            include: {
                model: product,
                as: 'products',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idUser'],
                },
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        res.send({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Get Profiles
exports.getProfile = async (req, res) => {
    try {
        const profiles = await profile.findAll({
            include: {
                as: 'user',
                model: user,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
            },

            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        res.send({
            status: 'success',
            data: {
                profiles,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Get User by Id
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await user.findOne({
            where: {
                id,
            },

            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        if (!data) {
            return res.send({
                error: {
                    message: `Account with ID: ${id} not found`,
                },
            });
        }

        res.send({
            status: 'success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        await user.update(newData, {
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Update user data with ID: ${id} finished`,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;


        await user.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Delete user data with ID: ${id} finished`,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    };
}