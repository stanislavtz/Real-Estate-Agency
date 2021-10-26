const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../utils/constants');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            validate:[/^([A-Z][a-z]+ [A-Z][a-z]+)$/, 'Invalid name format']
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, `User with ${this.username} is already registered`],
            min: [5, 'Username should be at least 5 characters long']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [4, 'Password should be at least 4 characters long']
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
        next();
    } catch (err) {
        throw { message: 'Unsuccessful user register' }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;