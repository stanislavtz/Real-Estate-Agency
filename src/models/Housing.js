const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            min: [6, 'The name should be at least 6 characters']
        },
        type: {
            type: String,
            enum: ['Apartment', 'Villa', 'House'],
            required: [true, 'Type is required']
        },
        year: {
            type: Number,
            required: [true, 'Year is required'],
            min: [1850, 'The year should more or equal to 1850'],
            max: [2021, 'The year should be less or equal to 2021']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            min: [4, 'The city should be at least 4 characters long']
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            validate: [/^https?:\/\//i, 'Image should start with http:// or https://']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            max: [60, 'The description should be a maximum of 60 characters long']
        },
        pieces: {
            type: Number,
            required: [true, 'Pieces is required'],
            min: [0, 'The pieces should be more or qual to 0'],
            max: [10, 'The pieces should be more or qual to 10']
        },
        tenants: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

housingSchema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;