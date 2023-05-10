const { Schema, Types, model } = require('mongoose');


const reactionSchema = new Schema({
        reactionId : {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        responseBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;