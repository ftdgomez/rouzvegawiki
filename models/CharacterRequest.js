import mongoose from 'mongoose'

const CharacterRequest = new mongoose.Schema({
    characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
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
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.models.CharacterRequest || mongoose.model('CharacterRequest', CharacterRequest);

