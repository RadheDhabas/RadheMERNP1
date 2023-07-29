import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    role: {
        type: Number,
        default: 0,
      },
    password: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
});
const User = mongoose.model('User', UserSchema); 
export default User