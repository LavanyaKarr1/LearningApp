const mongoose=require('mongoose');

const AddressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Register',required:true   //foriegn key reference from the register schema 
    },
    distCode:{
        type:Number,required:true
    },
    mandalCode:{
        type:Number,required:true
    },
    villageCode:{
        type:Number,required:true
    },
    street:{
        type:String,required:true
    },
    doorNo:{
        type:String,required:true
    },
    pinCode:{
        type:Number,required:true
    },

},{timestamps:true});


module.exports=mongoose.model('UserAddress',AddressSchema);

