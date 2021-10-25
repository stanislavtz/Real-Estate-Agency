const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            validate:[/^[A-Z][A-Za-z0-9 ]+$/, 'Invalid name format']
        },
        type: {
            type: String,
            enum: ['Apartment', 'Villa', 'House'],
            required: [true, 'Type is required']
        },
        year: {
            type: Number,
            required: [true, 'Year is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            validate: [/^https?:\/\//i, 'Image should start with http:// or https://']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        pieces: {
            type: Number,
            required: [true, 'Pieces is required']
        },
        tenants:[
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

housingSchema.pre('findByIdAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });

  const Housing = mongoose.model('Housing', housingSchema);
  
  module.exports = Housing;