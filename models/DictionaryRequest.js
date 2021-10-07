import mongoose from 'mongoose';

const DictionaryRequestSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dictionary',
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
    approved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.models.DictionaryRequest || mongoose.model('DictionaryRequest', DictionaryRequestSchema);