import mongoose from 'mongoose';

const DictionarySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    word: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    definition: {
        type: String,
        required: true,
        trim: true
    },
    wordType: {
        type: String,
        required: true,
        enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'article', 'particle', 'numeral', 'other'],
    },
    example: {
        type: [String],
    },
    collaborators: [{
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        image: {
            type: String,
        }
    }],
    approved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.models.Dictionary || mongoose.model('Dictionary', DictionarySchema);