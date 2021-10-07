import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    quote: {
        type: String,
    },
    clip: {
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

module.exports = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);