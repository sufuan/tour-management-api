const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: [true, 'Name must be unique'],
        trim: true,
        maxlength: [120, 'A tour name must have less than or equal to 120 characters',
        ],
        minlength: [5, 'A tour name must have more then or equal to 5 characters',
        ],
    },
    route: {
        type: String,
        required: [true, 'A tour must have a route'],
    },

    image: {
        type: String,
        required: [true, 'A tour must have a image'],
    },

    createAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
        validate: {
            validator: (number) => number > 0,
            message: 'Price must be greater than 0',
        },
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
    },

    destination: {
        type: String,
        required: [true, 'Enter Tour Destination'],

    },
    duration: {
        type: String,
        required: [true, 'Enter Tour Duration'],
    }


})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour;