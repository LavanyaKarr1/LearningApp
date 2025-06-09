const mongoose = require('mongoose');

const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.Mongo_URL)
        console.log('MongoDB connected successfully');
        

    }catch(e){
        console.log(e);
        process.exit(1); 
    }
};

module.exports = connectToDB;