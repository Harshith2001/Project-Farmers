import mongoose from 'mongoose';
import connection from '../util/connection.js';
connection;
let userSchema = new mongoose.Schema({
            userId: String,
            userType:String,
            name: String,
            email: String,
            mobile: String,
            city: String,
            location: Array,
        });
 
let userModel=mongoose.model('User',userSchema);
export default userModel;