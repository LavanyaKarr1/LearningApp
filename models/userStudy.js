const mongoose=require("mongoose");

const StudySchema= new mongoose.Schema({

    userId:{
            type:mongoose.Schema.Types.ObjectId,ref:'Register',required:true   //foriegn key reference from the register schema 
        },
    class:{
        type:String,required:true
    },
    school:{
        type:String,required:true
    },
    hallTicket:{
        type:String,required:true
    },
    yearOfpass:{
        type:Number,required:true
    },
    percentage:{
        type:Number,required:true
    }

})

module.exports=mongoose.model('userStudy',StudySchema)