const { mongoose } = require("mongoose");
const userAddress = require("../models/userAddress");
const Register = require('../models/registration');

const DistWiseReport = async (req, res) => {

    try {
        const distCollection = await mongoose.connection.db.collection("districts_mst").aggregate([
            {
                $lookup: {
                    from: "useraddresses",
                    localField: "dist_code",
                    foreignField: "distCode",
                    as: "users"

                }
            },
            {
                $project: {
                    _id: 0,
                    dist_code: 1,
                    dist_name: 1,
                    appl_count: { $size: "$users" }
                }
            },
            {
                $sort: {
                    appl_count: -1
                }
            }
        ]).toArray();

        // console.log(distCollection);
        if (!distCollection) {
            return res.status(404).json({
                success: false,
                message: "no data found"
            });
        }
        return res.status(200).json({
            success: true,
            data: distCollection,
        });


    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred',
        });
    }
}

const DistDrillReport = async (req, res) => {
    try {
        // const distCode=req.params.distCode;
        const distCode = req.query.distCode;
        console.log("distCode", distCode);

        const distDrillData = await mongoose.connection.db.collection("registers").aggregate([

            {
                $lookup: {
                    from: "useraddresses",
                    localField: "_id",
                    foreignField: "userId",
                    as: "users"
                }

            },
            {
                $unwind: "$users"
            },
            {
                $lookup:{
                    from:"districts_mst",
                    localField:"users.distCode",
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
                    localField:"users.mandalCode",
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
                    localField:"users.villageCode",
                    foreignField:"village_code",
                    as:"village"
                }
            },
            {
                $unwind:"$village"
            },
            {
                $match: {
                    "users.distCode": Number(distCode)
                }

            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    uid: 1,
                    email: 1,
                    mobile: 1,
                    dist_name: "$district.dist_name",
                    mandal_name:"$mandal.mandal_name",
                    village_name:"$village.village_name",
                    street:"$users.street",
                    door_no:"$users.doorNo",
                    pin_code:"$users.pinCode"
                }
            }
        ]).toArray();

        // console.log("distDrillData", distDrillData);
        if (!distDrillData) {
            return res.status(404).json({
                success: false,
                message: "no data found"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                data: distDrillData
            })
        }
    } catch (e) {
        console.log(e);

        return res.status(500).json({
            success: false,
            message: "Internal Server Issue"
        })
    }


}

module.exports = {
    DistWiseReport,
    DistDrillReport,
}