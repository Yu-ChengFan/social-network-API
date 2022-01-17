const { Schema, model } = require('mongoose')

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match:[/^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid input']
    },
    thoughts: [{
        type: Schema.Types.ObjectId, ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId, ref: 'user'
    }]
},
{
        toJSON: {
            virtuals: true
        },
        id: false
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);
module.export = User;