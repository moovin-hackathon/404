const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

UserSchema.plugin(mongoosePaginate);

mongoose.model("User", UserSchema);