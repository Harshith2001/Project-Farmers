import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Project_Farmers', {useNewUrlParser: true});
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
// let userData = new userModel({
//     "userId": "kitty123",
//     "userType": "farmer",
//     "name": "Chanakya",
//     "email": "ucs@gmail.com",
//     "mobile": "7894561230",
//     "city": "Mysore",
//     "location": ["12.2958", "76.6394"]
// });
// userData.save();

export default userModel;