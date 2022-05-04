import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/Project_Farmers', {useNewUrlParser: true});
let connection=mongoose.connection;

connection.on('connected', function() {
    console.log('database is connected successfully');
});
connection.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
connection.on('error', console.error.bind(console, 'connection error:'));

export default connection;