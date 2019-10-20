const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Field name is required']
        },
        email: {
            type: String,
            required: [true, 'Field email is required']
        }
    }, 
    {
        timestamps: true
    }
);

UserSchema.plugin(mongoosePaginate);

mongoose.model("User", UserSchema);