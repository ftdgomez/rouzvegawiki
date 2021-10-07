import mongoose from 'mongoose';

const MomentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    clip: {
        type: String,
    },
    picture: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    user: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    approved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.models.Moment || mongoose.model('Moment', MomentSchema);