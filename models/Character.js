import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    thumbnail: {String},
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
});

module.exports = mongoose.models.Character || mongoose.model('Character', CharacterSchema);



