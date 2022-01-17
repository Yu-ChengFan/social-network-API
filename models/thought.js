const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Text must be over 1 character'],
        maxlength: [280, 'Text over 280 charatcer limit.']
    },
    created: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reaction: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;