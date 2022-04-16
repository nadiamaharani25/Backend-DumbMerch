
const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });


    // If Email the same
    const dataInDB = await user.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (dataInDB) {
        return res.send({
            error: {
                message: `Email ${req.body.email} is Already!`,
            },
        });
    }


    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            status: 'Customer',
        });


        const SECRET_KEY = 'batch32bebasapasaja';
        const token = jwt.sign(
            { id: newUser.id, name: newUser.name, email: newUser.email },
            SECRET_KEY
        );

        res.status(200).send({
            status: "success...",
            data: {
                name: newUser.name,
                email: newUser.email,
                token
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    // If Email the same
    const userExist = await user.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (!userExist) {
        return res.send({
            error: {
                message: `Email ${req.body.email} not found!`,
            },
        });
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        // compare password between entered from client and from database
        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }


        const SECRET_KEY = 'batch32bebasapasaja';
        const token = jwt.sign(
            { id: userExist.id, name: userExist.name, email: userExist.email },
            SECRET_KEY
        );

        res.status(200).send({
            status: "success...",
            data: {
                name: userExist.name,
                email: userExist.email,
                status: 'Customer',
                token
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};