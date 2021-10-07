import mongoose from 'mongoose'

const MemeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.MemeSchema || mongoose.model('Meme', MemeSchema)
