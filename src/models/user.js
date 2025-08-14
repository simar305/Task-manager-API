const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email is not valid']
    },
    age: {
        type: Number,
        default: 0,
        min: [0, 'Age must be positive']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [7, 'Password must be at least 7 characters'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please strengthen the password!');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject;
}

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');

    return user;
};


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next()
});

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

module.exports = mongoose.model('User', userSchema);
