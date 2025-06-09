const Register = require("../models/registration");
const userAddress = require("../models/userAddress");
const userStudy=require("../models/userStudy");
const mongoose=require("mongoose");
const { ObjectId } = require('mongodb');


const UserAddressDetails = async(req,res) =>{

    try{

        const {district,mandal,village,street,doorNo,pinCode}=req.body;
        const userId=req.userInfo.userId;
        console.log("userId",userId);
        const user= await Register.find({userId});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User Not Found',
            });
        }

        const userAddressDetails=new userAddress({
            userId:userId,
            distCode:district,
            mandalCode:mandal,
            villageCode:village,
            street:street,
            doorNo:doorNo,
            pinCode:pinCode
        })
        await userAddressDetails.save();
        return res.status(200).json({
            success:true,
            message:'User Address Details Saved Successfully',
        });

    }catch(e){
        console.log(e.message);
        return res.status(500).json({
            success:false,
            message:'Some Error Occurred',
        });
    }
}


const userStudyDetails = async(req,res) =>{

    try{

        const studyDetails=req.body.studyDetails;
        const userId=req.userInfo.userId;
        if(!userId){
            res.status(404).json({
                success:false,
                message:'User Not Found'
            })
        }

        const userStudydetails= studyDetails.map(study =>({
            userId:userId,
            class:study.classNo,
            school:study.school,
            hallTicket:study.hallTicket,
            yearOfpass:study.yearOfPass,
            percentage:study.percentage
        }))
        await userStudy.insertMany(userStudydetails);
        return res.status(200).json({
            success:true,
            message:'Study Details Saved Successfully'
        })
        

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }

}

const getAddressDetails=async(req,res)=>{
    try{

        const userId=req.userInfo.userId;
// console.log(userId);

        const addressDetails=await mongoose.connection.db.collection("useraddresses").aggregate([

            {
                $match: {
                    "userId": new ObjectId(userId)
                }

            },
             {
                $lookup:{
                    from:"districts_mst",
                    localField:"distCode",
                    foreignField:"dist_code",
                    as:"district"
                }
            },
            {
                $unwind:"$district"
            },
            {
                $lookup:{
                    from:"mandals_mst",
                    localField:"mandalCode",
                    foreignField:"mandal_code",
                    as:"mandal"
                }
            },
            {
                $unwind:"$mandal"
            },
             {
                $lookup:{
                    from:"villages_mst",
                    localField:"villageCode",
                    foreignField:"village_code",
                    as:"village"
                }
            },
            {
                $unwind:"$village"
            },
            
            {
                $project: {
                    _id: 0,
                    dist_code: "$district.dist_code",
                    mandal_code:"$mandal.mandal_code",
                    village_code:"$village.village_code",
                    dist_name: "$district.dist_name",
                    mandal_name:"$mandal.mandal_name",
                    village_name:"$village.village_name",
                    street:1,
                    doorNo:1,
                    pinCode:1
                }
            }

        ]).toArray();
        

        if(!addressDetails){
            return res.status(404).json({
            success:false,
            message:'No data Found'
        })
        }
        else{
            return res.status(200).json({
            success:true,
            message:addressDetails
        })
        }

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const getStudyDetails=async(req,res)=>{
    try{
        const userId=req.userInfo.userId;
        const studyData= await userStudy.find({userId});
        if(!studyData){
            return res.status(404).json({
            success:false,
            message:'No data Found'
        })
        }
        else{
             return res.status(200).json({
            success:true,
            message:studyData
             })
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports={
    UserAddressDetails,
    userStudyDetails,
    getAddressDetails,
    getStudyDetails
}